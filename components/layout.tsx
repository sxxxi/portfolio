import Link from "next/link";
import { IconButton } from "./ui";

export default function Layout({children}: any) {
  return (
    <div className="h-screen w-screen flex flex-col">
      <MainNavbar />
      <div className="h-screen px-40">{children}</div>
    </div>
  );
}

function MainNavbar() {
  return (
    <nav className="grid grid-cols-5 border-b border-gray-200 drop-shadow-2xl">
      <div className=" p-4">
        
        
      </div>
      {/* <div className=" pt-6 pb-2 px-4 col-span-3 bg-red-100 flex flex-row justify-around"> */}
      <div className="px-4 pt-4 col-span-3 flex flex-row justify-center space-x-4">
        <NavButton href={"/"}>Home</NavButton>
        <NavButton href={"/projects"}>Projects</NavButton>
        <NavButton href={"/"}>About Me</NavButton>
      </div>
      <div className="py-4 pl-4 pr-6 flex flex-row justify-end space-x-6">
        <IconButton src="/res/icons/github-mark.svg" href="https://github.com/sxxxi" />
        <IconButton src="/res/icons/linkedin-icon.png" href="https://github.com/sxxxi" width={35} height={35} />
      </div>
    </nav>
  );

}

function NavButton({href, children}: any) {
  return (
    <Link
      href={href}
      className="px-4 py-2 bg-emerald-500 bg-opacity-0 hover:underline"
    >
      {children}
    </Link>
  );
}