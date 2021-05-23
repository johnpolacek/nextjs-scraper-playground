import Link from "next/link"
import Head from "../components/head"
import Playground from "../components/playground.js"

const Index = () => (
  <div>
    <Head
      url="https://nextjs-scraper-playground.vercel.app/"
      title="Next.js Scraper Playground"
      description="Build and test your own web scraper APIs with Next.js API Routes and cheerio."
      ogImage="https://nextjs-scraper-playground.vercel.app/screenshot.png"
    />

    <div className="wrapper">
      <h1 className="title">Next.js Scraper Playground</h1>
      <h2>
        Build and test your own web scraper APIs with{" "}
        <a href="https://nextjs.org/docs/api-routes/introduction">
          Next.js API Routes
        </a>{" "}
        and <a href="https://cheerio.js.org/">cheerio</a>. <br />
        Created by <a href="https://johnpolacek.com">John Polacek</a>
        <br />
        <small>
          ~ follow <a href="https://twitter.com/johnpolacek">@johnpolacek</a> ~
        </small>
      </h2>
      <Playground />
    </div>

    <footer>
      <p>
        Based on articles like: <br />
        <a href="https://dev.to/mtliendo/create-a-public-api-by-web-scraping-in-nextjs-2f5n">
          Create a public API by web scraping in NextJS
        </a>{" "}
        by <a href="https://twitter.com/mtliendo">Michael Liendo</a> <br />
        <a href="https://pusher.com/tutorials/web-scraper-node/">
          Build a web scraper with Node
        </a>{" "}
        by <a href="https://twitter.com/ayisaiah">Ayooluwa Isaiah</a>
        <a href="https://www.contentful.com/blog/2021/03/17/puppeteer-node-open-graph-screenshot-for-socials/">
          {" "}
          <br />
          Use Puppeteer, Node.js to generate Open Graph screenshots
        </a>{" "}
        by <a href="https://whitep4nth3r.com/">Salma Alam-Naylor</a> <br />
        <a href="https://www.contentful.com/blog/2021/03/17/puppeteer-node-open-graph-screenshot-for-socials/">
          {" "}
          <br />
          Scraping the content of single-page application (SPA) with headless
          Chrome and puppeteer
        </a>{" "}
        by <a href="https://twitter.com/andrejsabrickis">
          Andrejs Abrickis
        </a>{" "}
        <br />
      </p>
      <p>
        View source at: <br />
        <a href="https://github.com/johnpolacek/nextjs-scraper-playground">
          github.com/johnpolacek/nextjs-scraper-playground
        </a>
      </p>
    </footer>

    <style jsx>{`
      .wrapper {
        width: 100%;
        color: #333;
        text-align: center;
        line-height: 1.8;
        padding-bottom: 32px;
      }
      footer {
        color: #333;
        padding-bottom: 64px;
        font-size: 16px;
        font-weight: 500;
      }
      footer p {
        text-align: center;
        max-width: 640px;
        margin: auto;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 48px;
        line-height: 1.15;
        font-size: 48px;
      }
      h2 {
        font-weight: normal;
        font-size: 18px;
        padding-bottom: 16px;
      }
      p {
        padding-bottom: 16px;
      }
    `}</style>
  </div>
)

export default Index
