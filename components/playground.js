import React, { useState } from "react"
import Property from "./property"
import Examples from "./examples"
import API from "./api"
import Response from "./response"

const Playground = () => {
  const [isScraping, setIsScraping] = useState(false)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState("")
  const [properties, setProperties] = useState([{ name: "", selector: "" }])
  const [result, setResult] = useState(null)

  const onPropertyChange = (index, name, selector) => {
    let newProperties = [...properties]
    newProperties[index] = { name, selector } // replace e.target.value with whatever you want to change it to
    setProperties(newProperties)
    setResult(null)
  }

  const onAddProperty = (e) => {
    e.preventDefault()
    setProperties([...properties, { name: "", selector: "" }])
    setResult(null)
  }

  const onRemoveProperty = (index) => {
    const newProperties = properties.filter((p, i) => index !== i)
    setProperties(newProperties)
    setResult(null)
  }

  const onSelectExample = (example) => {
    if (typeof example === "object") {
      setUrl(example.url)
      setProperties(example.properties)
      setResult(null)
      setTimeout(() => {
        document
          .getElementById("playground")
          .scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      setUrl("")
      setProperties([{ name: "", selector: "" }])
      setResult(null)
    }
  }

  const scrape = (e) => {
    e.preventDefault()
    setIsScraping(true)
    setError(false)
    if (url.indexOf("http") !== 0) {
      setUrl("https://" + url)
    }
    return fetch("/api/scrape", {
      method: "POST",
      // eslint-disable-next-line no-undef
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({
        url: url.indexOf("http") !== 0 ? "https://" + url : url,
        properties,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          if (data.result.length === 0) {
            setResult(
              "Property selector found no html element matches for html (note: some websites put measures in place to block scraping):\n" +
                data.html
            )
          } else {
            setResult(JSON.stringify(data.result, null, 2))
          }
          setIsScraping(false)
          document
            .getElementById("scrapeButton")
            .scrollIntoView({ behavior: "smooth" })
        } else {
          setError("Error: " + data.error)
          setIsScraping(false)
        }
      })
  }

  return (
    <>
      <form id="playground" onSubmit={scrape}>
        <Examples onSelect={onSelectExample} />
        <div>
          <label className="heading" htmlFor="url">
            URL to Scrape
          </label>
        </div>
        <input
          id="url"
          name="url"
          value={url}
          required={true}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        />
        <h3 className="heading">Data</h3>
        <div className="properties">
          {properties.map((property, index) => (
            <Property
              key={"property" + index}
              index={index}
              canDelete={properties.length > 1}
              onChange={onPropertyChange}
              onRemove={onRemoveProperty}
              name={property.name}
              selector={property.selector}
              type={property.type}
            />
          ))}
          <button onClick={onAddProperty}>+ Add Property</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button id="scrapeButton" disabled={isScraping}>
            Scrape
          </button>
        </div>
      </form>

      {properties[0].name !== "" && result && (
        <>
          <Response>{result}</Response>
          <API url={url} properties={properties} />
        </>
      )}

      <style jsx>{`
        .heading {
          font-weight: 500;
          font-size: 18px;
        }
        form {
          padding: 16px;
        }
        label {
          display: block;
          margin-bottom: 8px;
        }
        input {
          padding: 8px 16px;
          margin-bottom: 16px;
          width: 100%;
          max-width: 480px;
        }
        button {
          font-size: 24px;
          padding: 24px 64px;
        }
        .properties {
          max-width: 480px;
          margin: auto;
          text-align: left;
        }
        .properties button {
          font-size: 16px;
          margin-bottom: 32px;
          padding: 0 1px 8px;
          background: white;
          color: #067df7;
        }
        .output {
          text-align: left;
          width: 100%;
          max-width: 800px;
          padding: 16px;
          background: #eee;
          color: #444;
          margin: 16px auto;
          overflow-x: scroll;
        }
        .error {
          color: red;
        }
      `}</style>
    </>
  )
}

export default Playground
