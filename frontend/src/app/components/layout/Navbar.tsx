"use client"

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const token = localStorage.getItem('accessToken');

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('username');
            localStorage.removeItem('playlists');
            localStorage.removeItem('likedSongs');
            localStorage.removeItem('userId');
        }
    }
    return (
        <nav className=' bg-[#101010] items-center py-8 px-2'>
            <div className='w-[95%] mx-auto items-center flex justify-between'>
                <div className=' '>
                    <Link className="text-white text-2xl" href="/">Spotify</Link>
                </div>
                <div>
                    {token != null ? (
                        <div className='flex space-x-5 items-center'>
                            <Link href={`/favorites/`} className='cursor-pointer hover:scale-105 p-2 text-black bg-[#1fdf64] rounded-3xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </Link>
                            <Link className="bg-white text-black rounded-lg px-4 py-2 text-lg font-mono transition duration-300 ease-in-out hover:scale-110" href="/" onClick={handleLogout}>Log out</Link>
                        </div>
                    ) : (
                        <Link className="bg-white text-black rounded-lg px-4 py-2 text-lg font-mono transition duration-300 ease-in-out hover:scale-110" href="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar