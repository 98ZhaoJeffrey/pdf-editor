'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import ContextMenu from '../Elements/ContextMenu';
import NameModal from '../Elements/NameModal';
import { useRouter } from 'next/navigation';
import { deleteFolder, changeFolderName } from '../../utils/dashboard-action'
import { handleDragEnd, handleDragEnter, handleDragLeave, handleDragOver, handleDragStart, handleDrop } from '@/app/utils/drag-actions';

const FolderListCard: React.FC<{ folderID: string, lastAccessed: Date, name: string }> = ({ folderID, lastAccessed, name }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [folderName, setFolderName] = useState(name);
    const router = useRouter();
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);


        await changeFolderName(folderName, folderID)
        router.refresh();

        closeModal();
        setFolderName("");
        setIsLoading(false);
    };

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        })
        setShowContextMenu(true);
    };

    const handleContextMenuOption = async (option: string) => {
        if (option === 'rename') {
            // Handle rename logic
            console.log('Rename option clicked');
            openModal();
        } else if (option === 'delete') {
            // Handle delete logic
            console.log('Delete option clicked');
            await deleteFolder(folderID)
            router.refresh();
        }
        setShowContextMenu(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setShowContextMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={cardRef}
                onContextMenu={handleContextMenu}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={async (e) => {
                    await handleDrop(e, folderID);
                    router.refresh();
                }}
                onDragStart={(e) => handleDragStart(e, folderID, false)}
                onDragEnd={handleDragEnd}
                className='relative'
                id={folderID}>
                <Link className='hover:drop-shadow-md' href={`/dashboard/folders/${folderID}`} draggable>
                    <div className="flex w-full h-20 bg-white p-6 justify-between border-b-slate-200 border-b hover:bg-blue-50">
                        <div className='flex h-full gap-5 items-center'>
                            <AiFillFolder size={30} />
                            <h1 className='text-l font-medium truncate'>{name}</h1>
                        </div>
                        <div className='flex h-full items-center w-1/4 justify-between'>
                            <h2 className='text-sm font-medium w-30'>{lastAccessed ? lastAccessed.toLocaleDateString() : ''}</h2>
                            <div className='text-sm font-medium w-20'>―</div>
                        </div>
                    </div>
                </Link>
                {showContextMenu &&
                    <ContextMenu
                        isFile={false}
                        x={mousePosition.x}
                        y={mousePosition.y}
                        onClose={() => setShowContextMenu(false)}
                        onOptionSelect={handleContextMenuOption}
                    />}
            </div>
            {open && (
                <NameModal
                    name={folderName}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    closeModal={closeModal}
                    title='Rename'
                />
            )}
        </>

    );
}

export default FolderListCard;