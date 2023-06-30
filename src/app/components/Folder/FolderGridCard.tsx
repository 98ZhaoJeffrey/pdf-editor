'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import ContextMenu from './FolderContextMenu';
import FolderNameModal from './FolderNameModal';
import { useRouter } from 'next/navigation';
import { deleteFolder, changeName } from '../../utils/folder-action'

const FolderGridCard: React.FC<{ folderID: string, lastAccessed: Date, name: string }> = ({ folderID, lastAccessed, name }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [folderName, setFolderName] = useState('');
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


        await changeName(folderName, folderID)
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
            <div ref={cardRef} onContextMenu={handleContextMenu} className='relative'>
                <Link className='hover:drop-shadow-md' href={`/dashboard/folders/${folderID}`}>
                    <div
                        className="flex flex-col w-52 h-56 bg-white rounded-3xl mb-8 p-6  justify-between">
                        <AiFillFolder size={50} />

                        <div>
                            <h1 className='text-l font-bold truncate'>{name}</h1>
                            <h2 className='mt-1 mb-8 text-sm font-medium text-slate-400'>
                                {lastAccessed ? lastAccessed.toLocaleDateString() : ''}
                            </h2>
                        </div>

                    </div>
                    <div className='w-52 bg-slate-200 -mt-16 p-4 pl-6 rounded-b-3xl text-sm font-medium'>―</div>
                </Link>
                {showContextMenu &&
                    <ContextMenu
                        x={mousePosition.x}
                        y={mousePosition.y}
                        onClose={() => setShowContextMenu(false)}
                        onOptionSelect={handleContextMenuOption}
                    />}
            </div>

            {open && (
                <FolderNameModal
                    folderName={folderName}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    closeModal={closeModal}
                    isCreate={false}
                />
            )}
        </>

    );
};

export default FolderGridCard;