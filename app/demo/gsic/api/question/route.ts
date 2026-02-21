import { GoogleGenAI, MediaResolution } from "@google/genai";
import { readFileSync } from "fs";

import { cookies } from 'next/headers'
import { setTimeout } from "timers/promises";
const { createHash } = require('crypto');


export async function POST(request: Request) {
    const cookieStore = cookies()
    const token = (await cookieStore).get("access_token")
    if (!token) return new Response("No token", { status: 403 })

    try {
        const [time, hash] = Buffer.from(token.value, "base64").toString("utf-8").split(".")
        if (createHash('sha256').update(`${time}.${process.env.code}`).digest('hex') !== hash) return new Response("No token", { status: 403 })
    }
    catch (err) {
        if ((err as TypeError).message == "The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received an instance of Object") {
            return new Response("Token is not in correct format. stop istg. get out of here no free api for you >:(", { status: 400 })
        }
    }

    const { qn, image } = await request.json()
    if (!qn || !image) return new Response("No image or question. Get out of here no free api for you >:(", { status: 400 })

    const regex = /data:(.+);base64,(.+)/gm;
    const [_, mime, data] = regex.exec(image) || []

    if (!mime || !data) return new Response("The image is not imageing. Get out of here no free api for you >:(", { status: 400 })

    const ai = new GoogleGenAI({});
    const contents = [
        { inlineData: { mimeType: mime, data } },
        { text: qn },
    ];
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
            systemInstruction: "You are an AI used to help with sustainability. The user will input an image and ask a question about sustainability of the image. Be short but clear not more then 1 paragraph", //Respond with a question that can be searched online in the first line. this will be used internally. The rest can be the ansewrs for example: \"How do i dispose SSDs\n\nTo dispose ssds...\".
            mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM
        },
    });

    return new Response(response.text)
    // const f = readFileSync("/home/lulu/Documents/luluhoy-next/app/demo/gsic/api/question/example.md", "utf-8")
    // await setTimeout(3000)
    // return new Response(f)
}