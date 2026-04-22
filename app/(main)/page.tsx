import Image from "next/image";
export default function Home() {
  const blur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAADXUAAA11AFeZeUIAAAAR0lEQVR4nGP4f+r/fzA+DcEM/x///38heef/Iz6z/5d69f9n6Ive8H+pX+X/Vlfn/wb8Pv8ZZmfs/i/MoPff3CL0/4rCw/8BoX8sFRLbChYAAAAASUVORK5CYII="
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center ">
      <div className="w-fit h-fit flex gap-4 flex-col items-center sm:flex-row">
        <div className="rounded-full overflow-hidden items-center w-fit h-fit size-28.5">
          <Image
            loading="lazy"
            placeholder="blur"
            blurDataURL={blur}
            src={"/prof_img.png"}
            width={114}
            height={114}
            alt="profile image"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl">Hewo!~ I'm</p>
          <p className="text-4xl">lulu</p>
          <p className="text-xl">The developer that develops stuff... </p>
          <div className="*:bg-background gap-2 *:rounded-full *:px-2 *:py-1 my-1 flex flex-wrap">
            <span>📌Singapore</span>
            <span>🎓IT Application Development</span>
          </div>
        </div>
      </div>
      <div className="*:size-16 *:bg-background *:flex *:items-center *:justify-center *:rounded-full flex gap-4">
        <a href="https://github.com/LuluHuman" target="_blank"><Github /></a>
        <a href="https://x.com/LuluHuman_" target="_blank"><Twitter /></a>
      </div>
    </div>
  )
}

function Github() {
  return <svg fill="#e3b7f4" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="32" height="32"><path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path></svg>
}
function Twitter() {
  return <svg fill="#e3b7f4" viewBox="0 0 24 24" aria-hidden="true" width="32" height="32"><g><path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg>
}