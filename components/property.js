import React, { useState, useEffect } from "react"

const Property = ({
  index,
  onChange,
  onRemove,
  canDelete,
  name,
  selector,
  type,
}) => {
  useEffect(() => {
    setPropertyName(name)
  }, [name])

  useEffect(() => {
    setPropertySelector(selector)
  }, [selector])

  useEffect(() => {
    setPropertyType(type)
  }, [type])

  const [propertyName, setPropertyName] = useState("")
  const [propertySelector, setPropertySelector] = useState("")
  const [propertyType, setPropertyType] = useState("text")

  return (
    <>
      <div className="property">
        <div className="property-name">
          <div>
            <label htmlFor="propertyName">Name</label>
          </div>
          <input
            className="propertyName"
            name="propertyName"
            value={propertyName}
            required={true}
            onChange={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "")
              onChange(
                index,
                e.currentTarget.value,
                propertySelector,
                propertyType
              )
            }}
          />
        </div>
        <div className="property-selector">
          <div>
            <label htmlFor="propertySelector">Selector</label>
          </div>
          <input
            className="propertySelector"
            name="propertySelector"
            value={propertySelector}
            required={true}
            onChange={(e) => {
              setPropertySelector(e.target.value)
              onChange(index, propertyName, e.target.value, propertyType)
            }}
          />
        </div>
        <div className="property-type">
          <div>
            <label htmlFor="propertyType">Type</label>
          </div>
          <select
            className="propertyType"
            name="propertyType"
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value)
              onChange(index, propertyName, propertySelector, e.target.value)
            }}
          >
            <option value="text">text</option>
            <option value="href">href</option>
          </select>
        </div>
        <div className="property-delete">
          {canDelete && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onRemove(index)
              }}
            >
              &times;
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .property {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin: 0 0 8px;
          text-align: left;
          position: relative;
        }
        label {
          font-size: 14px;
          display: block;
          margin-bottom: 8px;
        }
        input {
          padding: 8px 16px;
          margin-bottom: 8px;
          width: 100%;
        }
        .property-name {
          width: 25%;
          padding-right: 4px;
        }
        .property-selector {
          width: 55%;
          padding-left: 4px;
        }
        .property-type {
          width: 15%;
          padding-left: 8px;
        }
        .property-delete {
          width: 5%;
          position: relative;
        }
        button {
          color: #444;
          font-weight: 200;
          background: transparent;
          padding: 8px;
          position: absolute;
          top: 20px;
          right: 0;
          font-size: 24px;
        }
        @media only screen and (max-width: 480px) {
          .property-selector {
            width: 50%;
            padding-left: 4px;
          }
          .property-delete {
            width: 10%;
          }
        }
      `}</style>
    </>
  )
}

export default Property
