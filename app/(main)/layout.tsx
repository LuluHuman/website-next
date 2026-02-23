import { Sour_Gummy } from 'next/font/google'

const sourGummy = Sour_Gummy({
    subsets: ['latin'],
})

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={`flex flex-col h-screen w-screen ${sourGummy.className}`}>
            <nav className="px-8 pt-4 text-lg flex justify-between">
                <a href="/">Luluhoy</a>
                <div className='flex gap-2'><a href="/demo">Demos</a><a href="/projects">Projects</a></div>
            </nav >
            <div className="sm:px-4 px-2 py-4 m-0 flex-1">
                <div className="p-2 bg-background-2 w-full h-full rounded-2xl">{children}</div>
            </div>
        </div >
    )
}