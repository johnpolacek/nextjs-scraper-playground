import React, { useState } from "react"
import Property from "./property"

const SelectExample = ({ onSelect }) => {
  const examples = [
    {
      name: "Reddit Front Page",
      url: "https://reddit.com",
      properties: [
        { name: "url", selector: "a[data-click-id=body]", type: "href" },
        {
          name: "headline",
          selector: "a[data-click-id=body] h3",
          type: "text",
        },
      ],
    },
    // {
    //   name: "Certified Fresh TV",
    //   url: "https://www.rottentomatoes.com/browse/tv-list-3",
    //   properties: [
    //     { name: "title", selector: ".mb-movies .movieTitle", type: "text" },
    //     {
    //       name: "score",
    //       selector: ".mb-movies .tMeterScore",
    //       type: "text",
    //     },
    //   ],
    // },
    {
      name: "Trending on Github",
      url: "https://github.com/trending",
      properties: [
        {
          name: "repository",
          selector: "article h1",
          type: "text",
        },
        {
          name: "description",
          selector: "article p",
          type: "text",
        },
        {
          name: "language",
          selector: "article span[itemprop=programmingLanguage]",
          type: "text",
        },
        {
          name: "stars",
          selector: "article .f6 > a",
          type: "text",
        },
      ],
    },
    {
      name: "Trending on Twitter (US)",
      url: "https://getdaytrends.com/united-states/",
      properties: [
        {
          name: "trend",
          selector: "#trends td > a",
          type: "text",
        },
        {
          name: "numTweets",
          selector: "#trends td .desc > span",
          type: "text",
        },
      ],
    },
    {
      name: "Online Tech Conferences",
      url: "https://www.techevents.online/",
      properties: [
        { name: "name", selector: ".b-conference h4", type: "text" },
        { name: "link", selector: ".b-conference a", type: "href" },
        { name: "date", selector: ".b-conference .date", type: "text" },
      ],
    },
  ]

  const onSelectExample = (e) => {
    onSelect(examples[e.target.value])
  }

  return (
    <>
      <div className="examples">
        <label>Try an example</label>
        <select id="selectExample" onChange={onSelectExample}>
          <option value="">Please select...</option>
          {examples.map((example, index) => (
            <option key={"example" + index} value={index}>
              {example.name}
            </option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .examples {
          padding-bottom: 32px;
        }
        label {
          display: inline-block;
          padding-right: 8px;
        }
      `}</style>
    </>
  )
}

export default SelectExample
