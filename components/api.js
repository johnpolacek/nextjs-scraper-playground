import SyntaxHighlighter from "react-syntax-highlighter"
import { stackoverflowLight } from "react-syntax-highlighter/dist/cjs/styles/hljs"

const getSelectors = (properties) => {
  return properties.map(
    (property) => `const ${property.name}Selector = "${property.selector}"`
  ).join(`
  `)
}

const getResultSets = (properties, url) => {
  return properties.map(
    (property) => `        find($, ${property.name}Selector).each((i, elem) => {
    ${getResultPropertyAssignment(property, url)}
          })`
  ).join(`
  `)
}

const getResultPropertyAssignment = (property, url) => {
  if (property.type === "href") {
    return `        let href = $(elem).attr("href")
            if (href.charAt(0) === "/") href = "${url}" + href
            result[i].${property.name} = href`
  } else {
    return `        result[i].${property.name} = $(elem).text()`
  }
}

const API = ({ url, properties }) => {
  const apiName = url.split("/")[2].split(".").slice(0, -1).pop()
  const apiNameCap = apiName.charAt(0).toUpperCase() + apiName.slice(1)

  return (
    <>
      <h3 className="heading">pages/api/{apiName}.js</h3>
      <div className="output">
        <SyntaxHighlighter language="javascript" style={stackoverflowLight}>
          {`import puppeteer from "puppeteer"
import cheerio from "cheerio"
import find from "cheerio-eq"

const scrape${apiNameCap} = async (req, res) => {
  ${getSelectors(properties)}
  const properties = req.body.properties

  try {
    puppeteer
      .launch()
      .then((browser) => browser.newPage())
      .then((page) => {
        return page.goto("${url}").then(function () {
          return page.content()
        })
      })
      .then((html) => {
        const $ = cheerio.load(html)

        // create empty result set, assume selectors will return same number of results
        let result = []
        for (let i = 0; i < find($, ${
          properties[0].name
        }Selector).length; i++) {
          result.push({})
        }
        // parse the html for each selector
${getResultSets(properties, url)}
        res.status(200).json({ statusCode: 200, result })
      })
  } catch(error) {
    return res.status(500).send(error.message)
  }
}

export default scrape${apiNameCap}

export const config = {
  api: {
    externalResolver: true,
  },
}`}
        </SyntaxHighlighter>
      </div>
      <style jsx>{`
        .output {
          text-align: left;
          width: 100%;
          max-width: 800px;
          margin: 16px auto;
        }
      `}</style>
    </>
  )
}

export default API
