import React, { useState } from "react"
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
  const [isCopied, setIsCopied] = useState(false)

  const apiName = url.split("/")[2].split(".").slice(0, -1).pop()
  const apiNameCap = apiName.charAt(0).toUpperCase() + apiName.slice(1)

  const codeSnippet = `import puppeteer from "puppeteer"
import cheerio from "cheerio"
import find from "cheerio-eq"

const get${apiNameCap} = async (req, res) => {
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

export default get${apiNameCap}

export const config = {
  api: {
    externalResolver: true,
  },
}`

  return (
    <>
      <h3 className="heading">pages/api/get{apiNameCap}.js</h3>
      <div id="codeOutput" className="output">
        <button
          id="copy"
          onClick={() => {
            setIsCopied(true)
            navigator.clipboard.writeText(codeSnippet)
          }}
        >
          {isCopied ? "✓ copied" : "copy"}
        </button>
        <SyntaxHighlighter language="javascript" style={stackoverflowLight}>
          {codeSnippet}
        </SyntaxHighlighter>
      </div>
      <style jsx>{`
        .output {
          text-align: left;
          width: 100%;
          max-width: 800px;
          margin: 16px auto;
          position: relative;
        }
        #copy {
          position: absolute;
          top: 8px;
          right: 16px;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}

export default API
