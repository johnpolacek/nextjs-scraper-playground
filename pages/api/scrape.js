import puppeteer from "puppeteer"
import cheerio from "cheerio"
import find from "cheerio-eq"
import chrome from "chrome-aws-lambda"

const scrape = async (req, res) => {
  const url = req.body.url
  const properties = req.body.properties
  const delay = req.body.delay || 1

  if (req.method === "POST") {
    puppeteer
      .launch(
        process.env.NODE_ENV === "production"
          ? {
              args: chrome.args,
              executablePath: await chrome.executablePath,
              headless: chrome.headless,
            }
          : {}
      )
      .then((browser) => browser.newPage())
      .then((page) => {
        return page.goto(url).then(() => {
          return new Promise((resolve) => setTimeout(resolve, delay)).then(
            () => {
              return page.content()
            }
          )
        })
      })
      .then((html) => {
        try {
          const $ = cheerio.load(html)

          // create empty result set, assume all selectors will be of the same length
          let result = []
          for (let i = 0; i < find($, properties[0].selector).length; i++) {
            result.push({})
          }

          // fill result set by parsing the html for each property selector
          properties.forEach((property) => {
            // {"name":"url","selector":"a[data-click-id='body']","type":"href"}
            find($, property.selector)
              .slice(0, result.length)
              .each((i, elem) => {
                // i is the element index in the cheerio selection
                result[i][property.name] = ""
                if (property.type === "href") {
                  let href = $(elem).attr("href")
                  if (typeof href !== "undefined") {
                    if (href.charAt(0) === "/") {
                      href = url.split("/").slice(0, 3).join("/") + href
                    }
                    result[i][property.name] = href
                  }
                } else {
                  result[i][property.name] = $(elem)
                    .text()
                    .replace(/\r?\n|\r/g, "")
                    .trim()
                }
              })
          })

          res.status(200).json({ statusCode: 200, result, html })
        } catch (error) {
          res.status(500).json({ statusCode: 500, error: error.message })
        }
      })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default scrape

export const config = {
  api: {
    externalResolver: true,
  },
}
