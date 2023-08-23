'use client'
import React, { useEffect, useState } from 'react'

export default function Page({ params }: { params: { fileID: string } }) {
    const [fileData, setFileData] = useState<Blob | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/editor/${params.fileID}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const blob = await response.blob();
                    setFileData(blob);
                } else {
                    console.error('Error downloading file:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching file data:', error);
            }
        }

        fetchData();
    }, [params.fileID]);

    return (
        <div>
            {fileData && (
                <div>
                    Editing {params.fileID}
                </div>
            )}

            {!fileData && (
                <div className='w-screen h-screen flex justify-center items-center gap-10 flex-col'>
                    <div className='w-[90%] h-[10%] animate-pulse bg-slate-400 opacity-50'></div>
                    <div className='w-[90%] h-[80%] animate-pulse bg-slate-400 opacity-50'></div>
                </div>
            )}
        </div>
    )
}