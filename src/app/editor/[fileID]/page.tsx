import React from 'react'

export default async function page({ params }: { params: { fileID: string } }) {
    return (
        <div>
            This is file {params.fileID}
        </div>
    )
}

