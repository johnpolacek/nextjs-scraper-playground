import SyntaxHighlighter from "react-syntax-highlighter"
import { stackoverflowLight } from "react-syntax-highlighter/dist/cjs/styles/hljs"

const Response = ({ children }) => (
  <>
    <h3 className="heading">Response</h3>
    <div id="responseOutput" className="output">
      <SyntaxHighlighter
        language="json"
        style={stackoverflowLight}
        customStyle={{ maxHeight: "300px" }}
      >
        {children}
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

export default Response
