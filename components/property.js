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
            <label htmlFor="propertyName">Property Name</label>
          </div>
          <input
            id="propertyName"
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
            <label htmlFor="propertySelector">Property Selector</label>
          </div>
          <input
            id="propertSelector"
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
            id="propertType"
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

      <style jsx>{`
        .property {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          margin: 8px 0 0;
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
          width: 60%;
          padding-left: 4px;
        }
        .property-type {
          width: 15%;
          padding-left: 8px;
        }
        button {
          color: #444;
          font-weight: 200;
          background: transparent;
          padding: 8px;
          position: absolute;
          top: 16px;
          right: -24px;
          font-size: 24px;
        }
      `}</style>
    </>
  )
}

export default Property
