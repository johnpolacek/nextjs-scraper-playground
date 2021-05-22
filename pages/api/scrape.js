import puppeteer from "puppeteer"
import cheerio from "cheerio"
import find from "cheerio-eq"
import chrome from "chrome-aws-lambda"

/** The code below determines the executable location for Chrome to
 * start up and take the screenshot when running a local development environment.
 *
 * If the code is running on Windows, find chrome.exe in the default location.
 * If the code is running on Linux, find the Chrome installation in the default location.
 * If the code is running on MacOS, find the Chrome installation in the default location.
 * You may need to update this code when running it locally depending on the location of
 * your Chrome installation on your operating system.

 via https://www.contentful.com/blog/2021/03/17/puppeteer-node-open-graph-screenshot-for-socials/
*/

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

const getOptions = async () => {
  let options
  if (process.env.NODE_ENV !== "production") {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    }
  }
  return options
}

const scrape = async (req, res) => {
  const url = req.body.url
  const properties = req.body.properties
  const delay = req.body.delay || 1000

  if (req.method === "POST") {
    console.log("configuring chrome...")

    const options = await getOptions()

    console.log("scraping...")

    puppeteer
      .launch(options)
      .then((browser) => {
        console.log("launched browser")
        return browser.newPage()
      })
      .then((page) => {
        console.lo
        console.log("navigating to " + url + "...")
        return page.goto(url).then(() => {
          console.log(
            "allow " + delay + "ms delay for javascript to render updates..."
          )
          return new Promise((resolve) => setTimeout(resolve, delay)).then(
            () => {
              console.log("content loaded...")
              return page.content()
            }
          )
        })
      })
      .then((html) => {
        try {
          const $ = cheerio.load(html)

          console.log("parsing html...")

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

          console.log("done.")

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
