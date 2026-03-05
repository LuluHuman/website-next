"use client"

import axios from "axios"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function Gsic() {
    const [code, setCode] = useState<string>("")
    const [error, setError] = useState<string>()


    return <div className="flex flex-col w-full h-full justify-center items-center gap-2">
        <p className="text-center">This demo uses an external API that has limits or costs money.<br />To be only used by teammates. if you are one i probably gave you a code:</p>
        <div className="flex gap-2">
            <input type="text" className="bg-background p-2 rounded-4xl flex-1" placeholder="Code"
                onChange={(e) => setCode(e.target.value)} value={code}
            />
            <div>
                <button className="bg-primary text-background p-2 rounded-4xl"
                    onClick={async () => {
                        if (!code) return setError("<blank> is not a code dummy~")
                        setError(undefined)
                        const response = await axios.post("/demo/gsic/api/auth", JSON.stringify({ type: "submit", code: code }))
                        if (response.data.success == false) return setError("Thats probably not the code")
                        redirect("/demo/gsic")
                    }}>
                    Enter
                </button>
            </div>
        </div>
        <span className="text-red-500">{error}</span>
    </div>
}