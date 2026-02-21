"use client"

import axios from "axios"
import { compiler } from "markdown-to-jsx"
import { redirect } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

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


        <p>{(response !== undefined && qn) || "Add an image to ask about"}</p>
        <div className="bg-background px-2 p-4 rounded-4xl size-64">
            <input id="myImage" type="file" accept="image/*, image/jpeg" disabled={!auth || typeof response == "string"}
                className="absolute size-64 text-center opacity-0"
                onChange={(e) => {
                    if (!e.target.files || !e.target.files[0]) return
                    var reader = new FileReader();
                    reader.onload = (e) => setImgSrc((e.target?.result || "") as string)
                    reader.readAsDataURL(e.target.files[0]);
                }}
            />
            {imgSrc ? <img width={256} className="object-contain w-full h-full" src={imgSrc} alt="" /> : <Img />}
        </div>

        <div className="flex gap-2 w-full max-w-160">
            <input type="text" className="bg-background px-2 p-4 rounded-4xl flex-1" placeholder="Use the suggested questions or ask your own" disabled={!auth || typeof response == "string"}
                onChange={(e) => setQn(e.target.value)} value={typeof response == "string" ? "Reload to retry" : qn}
            />
            <div>
                <button className="bg-primary text-background px-2 p-4 rounded-4xl size-14" disabled={!auth || typeof response == "string"}
                    onClick={async () => {
                        if (!imgSrc && !qn) return setError("You asked for nothing your gonna get nothing")
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
        <SuggestionList
            suggestions={[
                {
                    icon: "🗑️",
                    text: "How do i dispose this",
                },
                {
                    icon: "♻️",
                    text: "How do i recycle this this",
                },
                {
                    icon: "🪛",
                    text: "How can i fix this",
                },
            ]}
            setQn={setQn} />

        {
            response !== undefined &&
            <div className={`bg-[#755085] rounded-2xl p-2 transition min-w-64 duration-500`}>
                {response && compiler(response)}
                {response === null && <div className="flex justify-center gap-2">
                    <p className="h-4 size-4 my-1 bg-primary rounded-full pulse" />
                    <p className="h-4 size-4  my-1 bg-primary rounded-full pulse" />
                    <p className="h-4 size-4  my-1 bg-primary rounded-full pulse" />
                </div>}
            </div>
        }
    </div >
}


function SuggestionList({ suggestions, setQn }: { suggestions: { icon: string, text: string }[], setQn: Dispatch<SetStateAction<string>> }) {
    return <div className="flex gap-2 flex-wrap justify-center">
        {suggestions.map(sug => <Suggestion key={sug.text} icon={sug.icon} text={sug.text} setQn={setQn} />)}
    </div>
}

function Suggestion({ text, icon, setQn }: { text: string, icon: string, setQn: Dispatch<SetStateAction<string>> }) {
    return <button
        className="bg-background p-2 rounded-4xl"
        onClick={() => setQn(text)}
    >{icon + " " + text}</button>
}

function Loader() {
    return <svg fill="white" className="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" type="rotate" dur="3s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
}
function Img() {
    return <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" height="256px" viewBox="0 -960 960 960" width="256px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" /></svg>
}