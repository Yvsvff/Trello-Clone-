'use client'
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";



export default function Header() {
  return (
    <header>
        <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        {/*Logo */}
        <Image
        src="/img/trello-logo.png"
        alt="Trello"
        width={300}
        height={100}
        className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
            {/*SearchBox*/}
            <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md
            flex-1 md:flex-initial">
                <MagnifyingGlassIcon 
                className="w-6 h-6 text-gray-400"/>
            <input type="text" 
            placeholder="Seacrch"
             className="flex-1 outline-none p-2"/>
            <button type="submit" hidden>Search</button>
            </form>

            {/*Avatar */}
            <Avatar name="Yusuff Atanda" round size="50" color="blue"/>
        </div>
        </div>

        <div className="flex items-center justify-center px-5 md:py-5">
            <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl
            rounded-xl w-fit bg-white italic max-w-3xl text-blue-800">
                <UserCircleIcon className="inline-block h-10 w-10 text-blue-800 mr-1"/>
                ChatGPT is summarising your task for the day...
            </p>
        </div>

    </header>
  )
}
