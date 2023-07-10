'use client'
import React, { useState } from 'react';
import { Folder, File } from '@prisma/client';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchbarContainer = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    return (
        <div className='min-w-[40%]'>
            <SearchBar setFolders={setFolders} setFiles={setFiles} />
            {(files.length > 0 || folders.length > 0) && <SearchResults folders={folders} files={files} />}
        </div>
    );
}

export default SearchbarContainer;