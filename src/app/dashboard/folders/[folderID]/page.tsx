import FolderDisplay from '@/app/components/FolderDisplay'
import { prisma } from '@/app/lib/prisma';
import React from "react";
import { auth } from '@clerk/nextjs';

export default async function Page({ params }: { params: { folderID: string } }) {
    const folderID = params.folderID
    const { userId } = auth();
    let currFolder;
    try {
        currFolder = await prisma.folder.findUnique({
            where: {
                id: folderID
            }
        })
    } catch (e) {
        return (
            <>
                <h1>Invalid folder link</h1>
            </>)
    }

    if (currFolder === null) {
        return (
            <>
                <h1>This folder does not exist</h1>
            </>)
    }
    if (currFolder.ownerId !== userId) {
        return (
            <>
                <h1>Permission denied</h1>
            </>)
    }

    const folderName = currFolder.name;

    const folders = await prisma.folder.findMany({
        where: {
            folderParentFolderId: {
                equals: folderID,
            },
            AND: {
                ownerId: {
                    equals: String(userId)
                }
            }
        }
    })

    console.log(folders);

    return (<FolderDisplay category={folderName} folders={folders}/>)
}
