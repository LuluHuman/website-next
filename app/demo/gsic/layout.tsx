import { Metadata } from 'next';
import { Sour_Gummy } from 'next/font/google'
import "@/app/globals.css";


export const metadata: Metadata = {
    title: "SusSearcher - A GSIC project",
    description: "SusSearcher, A project for the 2nd Global Sustainability Innovation Competition (GSIC) to help consumers idenitify ways to sustainably use the item. This project solves the problem of consumers not knowing how to dispose of recycle named/unnamed items but want to make an impact. This product is ment to reduce waste by properly recycling and encourage reusing products by giving tips. This will reduce trash to the landfills and reuse limited recourced which will lower carbon footprint from manufacturing and burning. Input an image as well as a question to the image SusSearcher will respond with ways to enourage sustainability. Powered by Google's Gemini Flash 3 Preview fro idea generation and image recognition. Authentication required due to the rate limits",
};

const sourGummy = Sour_Gummy({ subsets: ['latin'] })

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={`flex flex-col h-screen w-screen ${sourGummy.className}`}>
            <nav className="px-8 pt-4 text-lg flex justify-between">
                <a href="/demo/gsic">SusSearcher</a>
                <div className='flex gap-2'>
                    <a href="/demo/gsic/info">About this App</a>
                    <a href="/" >Home</a>
                </div>
            </nav >
            <div className="sm:px-4 px-2 py-4 m-0 flex-1">
                <div className="p-2 bg-background-2 w-full h-full rounded-2xl">{children}</div>
            </div>
        </div >
    )
}