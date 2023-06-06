"use client"
import React from 'react'

const Searchbar = () => {
    return (
        <form onSubmit={() => alert("searching")} className="relative flex r w-1/3 m-2 rounded-3xl focus-within:shadow-lg bg-white">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <button type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                placeholder="Search files" />
        </form>
    )
}

export default Searchbar
