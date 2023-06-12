import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page () {
    return (
        <div className='flex flex-row w-full h-screen items-center justify-center'>
            <div className='lg:w-1/2 flex flex-row justify-center'>
                <SignIn/>
            </div>
            <div className='hidden lg:flex bg-gradient-to-b from-primary-200 to-primary-400 h-full flex-1 flex-col items-center justify-center gap-8'>
                <h2 className='text-5xl font-bold text-white'>
                    Untitled PDF
                </h2>
                <Image
                    src='/pdf.png'
                    width={700}
                    height={700}
                    loading='lazy'
                    alt='Picture of a PDF (will change in the future)'
                    
                />
                <div className='flex flex-col gap-5'>
                    <h2 className='text-4xl font-bold text-white'>
                        Welcome back to Untitled PDF
                    </h2>
                    <h3 className='text-2xl text-white'>
                        The simple, free and robust PDF editor
                    </h3> 
                </div>
            </div>
        </div>
    );
}