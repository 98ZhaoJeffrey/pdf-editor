'use client'
import React from 'react'
import SearchItem from './SearchItem'
import { Folder, File } from '@prisma/client';

interface SearchResultProps {
    folders: Array<Folder>;
    files: Array<File>;
}


function SearchResults({ folders, files }: SearchResultProps) {
    return (
        <div className='bg-white mx-2 -mt-8 pt-6'>
            <hr></hr>
            {folders && folders.map(folder => (
                <SearchItem isFolder={true} name={folder.name} key={folder.id} id={folder.id} />
            ))}
            {files && files.map(file => (
                <SearchItem isFolder={false} name={file.name} key={file.id} id={file.id} />
            ))}
        </div>
    )
}

export default SearchResults
