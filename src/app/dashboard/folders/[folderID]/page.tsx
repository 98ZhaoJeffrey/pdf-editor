import FolderDisplay from '@/app/components/FolderDisplay'
import React from 'react'

export default function Page({ params }: { params: { folderID: string } }) {
    const folderName = "Folder Name"
    const folderID = params.folderID
    return (<FolderDisplay category={folderName} />)
}
