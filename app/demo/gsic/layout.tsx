import { Metadata } from 'next';
import { Sour_Gummy } from 'next/font/google'
import "@/app/globals.css";


export const metadata: Metadata = {
    title: "SUSSIE - A GSIC project",
    description: "SUSSIE, A project for the 2nd Global Sustainability Innovation Competition (GSIC) to help consumers idenitify ways to sustainably use the item. This project solves the problem of consumers not knowing how to dispose of recycle named/unnamed items but want to make an impact. This product is ment to reduce waste by properly recycling and encourage reusing products by giving tips. This will reduce trash to the landfills and reuse limited recourced which will lower carbon footprint from manufacturing and burning. Input an image as well as a question to the image SUSSIE will respond with ways to enourage sustainability. Powered by Google's Gemini Flash 3 Preview fro idea generation and image recognition",
};

const sourGummy = Sour_Gummy({ subsets: ['latin'] })

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (<>
        <link rel="icon" type="image/png" href="/sussie/favicon.png" />
        <div className={`flex flex-col min-h-screen w-screen ${sourGummy.className}`}>
            <nav className="px-4 pt-4 text-lg flex justify-between">
                <a href="/demo/gsic"><img src="/sussie/logo_full.png" alt="" className='h-8' /></a>
                <div className='flex gap-2'>
                    <a href="/demo/gsic/info">{"\"About-SUSSIE\""}</a>
                </div>
            </nav >
            <div className="sm:px-4 px-2 py-4 m-0 flex-1 flex">
                <div className="p-2 bg-background-2 w-full rounded-2xl flex-1">{children}</div>
            </div>
        </div >
        <footer className='text-center pb-2'>
            Made with 🧡💜 (without AI) by <a href="/" className='font-bold'>Lulu</a> and her group
        </footer>
    </>
    )
}