import { Metadata } from "next"
import { readdirSync } from "node:fs"
import path from "node:path"

export default function Home() {
  const demos = readdirSync(path.join(process.cwd(), "app", "demo"))
  const pages = demos.map((demoName, i) => {
    const demoFile = require("@/app/demo/" + demoName + "/layout.tsx")
    const metadata = demoFile.metadata as Metadata
    return <a key={i} href={`/demo/${demoName}`} >
      <div className="bg-background p-2 rounded-2xl">
        <h1 className="underline">{typeof metadata.title == "string" ? metadata.title : "Unknown Title"}</h1>
        <p>{typeof metadata.description == "string" ? metadata.description : "Unknown Description"}</p>
      </div>
    </a>
  })
  return (
    <div>
      <h1>Demos</h1>
      <p>List of live project for demonstration:</p>
      <div className="my-2">{pages}</div>
    </div>
  )
}