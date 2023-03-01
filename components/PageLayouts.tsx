import { ReactNode } from "react";
import Image from "next/image";
import { IconButton } from "./ui";

export type StickyHeaderLayoutProps = {
  title: string,
  children: ReactNode,
}

export const StickyHeaderLayout = ({title, children}: StickyHeaderLayoutProps) => {
  return (
    <div className=" flex flex-col h-screen overflow-scroll relative bg-slate-400 bg-gradient-to-r from-blue-500 to-blue-700">
      <header className="w-screen sticky top-0">
        <div className="text-center p-16">
          <h1 className=" text-5xl font-bold text-white">{title}</h1>
        </div>
        <div className="flex flex-row justify-end space-x-4 p-4">
          <IconButton
            src="/res/icons/github-mark.svg"
            href="https://github.com/sxxxi"
          />
          <IconButton
            src="/res/icons/linkedin-icon.png"
            href="https://www.linkedin.com/in/seiji-akakabe/"
            width={35}
            height={35}
          />
        </div>
      </header>
      <main className="grow bg-white z-0 rounded-md py-12 px-3.5 lg:px-60 space-y-8">
        {children}
      </main>
    </div>
  );
}