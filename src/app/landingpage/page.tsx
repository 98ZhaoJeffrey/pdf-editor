'use client'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function Landing() {
    return (
        <>
            <header className='absolute right-5 top-5'>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <Link href="/dashboard">Go to dashboard</Link>
                </SignedIn>
                <SignedOut>
                    {/* <SignInButton mode='modal'>
                        <button>hi</button>
                    </SignInButton> */}
                    
                </SignedOut>
            </header>
            <div className='flex w-full h-screen justify-between' >
                <div className='m-5 sm:mt-12 sm:ml-12 md:ml-20  xl:mt-20 xl:ml-32 max-w-lg'>
                    <h2 className='text-2xl sm:text-4xl lg:text-title font-bold text-secondary'>Untitled</h2>
                    <h1 className='text-5xl sm:text-6xl lg:text-heading mt-28 lg:mt-32 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-secondary'>The fastest and easiest way to edit PDFs </h1>
                    <h3 className='lg:text-description max-w-xs mt-5 mb-10'>A simple and robust PDF editor all in your browser</h3>
                    <Link
                        className='text-white rounded bg-blue-500 hover:bg-blue-600 py-3 px-4 font-bold cursor-pointer'
                        href="/sign-up"
                    >Get Started</Link>
                    <SignInButton>
                        <button className='ml-5 rounded bg-gray-200 hover:bg-gray-300 py-3 px-8 font-bold cursor-pointer'>Login</button>
                    </SignInButton>

                </div>
                <div className='w-0 max-w-2xl md:w-1/2 lg:w-1/3 m-5 bg-gradient-to-b from-primary-300 via-primary-100 to-secondary'>
                </div>
            </div>

        </>
    )
}

export default Landing