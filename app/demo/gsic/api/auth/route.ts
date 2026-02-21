
import { cookies } from 'next/headers'
const { createHash } = require('crypto');

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const { code, type } = await request.json()
    if (type == "check") {
        const token = cookieStore.get("access_token")
        if (!token) return new Response("false", { status: 403 })

        try {
            const [time, hash] = Buffer.from(token.value, "base64").toString("utf-8").split(".")
            if (createHash('sha256').update(`${time}.${process.env.code}`).digest('hex') !== hash) return new Response("false", { status: 403 })
        }
        catch (err) {
            if ((err as TypeError).message == "The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received an instance of Object") {
                return new Response("false", { status: 400 })
            }
        }

        return new Response("true", { status: 200 })

    }
    if (type == "submit") {
        const success = process.env.code == code
        if (success) {
            const time = new Date().getTime()
            cookieStore.set({
                name: "access_token",
                value: Buffer.from(`${time}.${createHash('sha256').update(`${time}.${code}`).digest('hex')}`).toString("base64"),
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30,
            });
        }

        return new Response(JSON.stringify({ success }))
    }


    return new Response(code)
}