import FolderDisplay from '@/app/components/Folder/FolderDisplay';
import React from 'react'
import { prisma } from '@/app/lib/prisma';
import { auth } from '@clerk/nextjs';


const Page: React.FC = async () => {
    const { userId } = auth();

    const files = await prisma.file.findMany({
        where: {
            ownerId: {
                equals: String(userId)
            }
        },
        select: {
            name: true,
            lastUpdated: true,
            size: true,
            id: true
        },
        orderBy: {
            lastUpdated: 'desc'
        }
    })

    return (
        <FolderDisplay category='Recent' folders={[]} files={files} />
    );
};

export default Page;
