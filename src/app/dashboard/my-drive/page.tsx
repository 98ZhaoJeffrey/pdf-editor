import FolderDisplay from '@/app/components/Folder/FolderDisplay';
import React from 'react'
import { prisma } from '@/app/lib/prisma';
import { auth } from '@clerk/nextjs';


const Page: React.FC = async () => {
    const { userId } = auth();
    const folders = await prisma.folder.findMany({
        where: {
            folderParentFolderId: {
                equals: null,
            },
            AND: {
                ownerId: {
                    equals: String(userId)
                }
            }
        }
    })

    const files = await prisma.file.findMany({
        where: {
            fileParentFolderId: {
                equals: null,
            },
            AND: {
                ownerId: {
                    equals: String(userId)
                }
            }
        },
        select: {
            name: true,
            lastUpdated: true,
            size: true
        }
    })

    return (
        <FolderDisplay category='My Drive' folders={folders} files={files} />
    );
};

export default Page;
