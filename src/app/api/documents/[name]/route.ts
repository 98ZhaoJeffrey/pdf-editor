import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';

export async function GET(request: Request, { params }: { params: { name: string } }) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json('Permission denied');
    }
    try {
        const [folders, files] = await Promise.all([
            prisma.folder.findMany({
                where: {
                    name: {
                        contains: params.name,
                        mode: 'insensitive',
                    },
                    ownerId: userId
                },
                take: 5
            }),
            prisma.file.findMany({
                where: {
                    name: {
                        contains: params.name,
                        mode: 'insensitive',
                    },
                    ownerId: userId
                },
                take: 5
            }),
        ]);

        return NextResponse.json({ folders, files });
    } catch (error) {
        return NextResponse.json('Unable to obtain data');
    }
}