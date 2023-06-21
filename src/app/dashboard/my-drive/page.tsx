import FolderDisplay from '@/app/components/FolderDisplay';
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

    return (
        <FolderDisplay category='My Drive' folders={folders} />
    );
};

export default Page;
