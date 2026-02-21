"use client"

import axios from "axios"
import { compiler } from "markdown-to-jsx"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Gsic() {
    const [imgSrc, setImgSrc] = useState<string>()
    const [qn, setQn] = useState<string>("")

    const [response, setResponse] = useState<string | null | undefined>()
    const [error, setError] = useState<string>()

    const [auth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        axios.post("/demo/gsic/api/auth", { type: "check" }, { validateStatus: (s) => [200, 400, 403].includes(s) })
            .then((res) => {
                if (res.data == false) return redirect("/demo/gsic/code")
                setAuth(true)
            })
    }, [])


    return <div className="flex flex-col w-full h-full justify-center items-center gap-2">
        {!auth && <p>Checking access...</p>}
        <img width={256} src={imgSrc} alt="" />
        {
            typeof response !== "string" &&
            <input id="myImage" type="file" accept="image/*, image/jpeg" disabled={!auth}
                className="bg-background p-2 rounded-4xl"
                onChange={(e) => {
                    if (!e.target.files || !e.target.files[0]) return
                    var reader = new FileReader();
                    reader.onload = (e) => setImgSrc((e.target?.result || "") as string)
                    reader.readAsDataURL(e.target.files[0]);
                }}
            />

        }
        <p>{response !== undefined && qn}</p>
        {
            response !== undefined && <div className="bg-[#755085] rounded-2xl p-2 w-full">
                {response && compiler(response)}
                {response === null && <>
                    <p className="h-6 w-32 my-2 bg-primary rounded-full" />
                    <p className="h-4 w-full my-1 bg-primary rounded-full" />
                    <p className="h-4 w-1/3 my-1 bg-primary rounded-full" />
                    <p className="h-4 w-1/2 my-1 bg-primary rounded-full" />
                    <p className="h-4 w-full my-1 bg-primary rounded-full" />
                </>}
            </div>
        }

        <div className="flex gap-2 w-full">
            <input type="text" className="bg-background p-2 rounded-4xl flex-1" placeholder="How do i recycle this item?" disabled={!auth || typeof response == "string"}
                onChange={(e) => setQn(e.target.value)} value={typeof response == "string" ? "Reload to retry" : qn}
            />
            <div>
                <button className="bg-primary text-background p-2 rounded-4xl size-10" disabled={!auth || typeof response == "string"}
                    onClick={async () => {
                        if (!imgSrc) return setError("Upload an image")
                        if (!qn) return setError("Ask a question")
                        setResponse(null)
                        const response = await axios.post("/demo/gsic/api/question", JSON.stringify({ qn, image: imgSrc }))
                        setResponse(response.data)
                    }}>
                    {response === null ? <Loader /> : "Ask"}
                </button>
            </div>
        </div>
        <span className="text-red-500">{error}</span>
    </div>
}


function Loader() {
    return <svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" type="rotate" dur="3s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
}