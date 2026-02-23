import { Metadata } from 'next';
import "./style.css"

export const metadata: Metadata = {
    title: "MobileScanner* - An Innovate challence project",
    description: "A Self checkout shoppings carts helps to reduce wait times compared to paying at the cashiers which is safer and contactless since the payment is done directly on the cart using card or mobile pay.",
};

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return <div className='bg-white text-black w-screen h-screen'>{children}</div>
}