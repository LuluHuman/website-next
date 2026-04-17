import { permanentRedirect, RedirectType } from "next/navigation";

export default function Home() {
    permanentRedirect("https://sussie.luluhoy.tech/", RedirectType.replace);
}