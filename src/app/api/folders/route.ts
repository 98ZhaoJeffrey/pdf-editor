import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

export async function POST(request: Request) {
    const res = await request.json()
    const { userId } = auth();
    try {
        await prisma.folder.create({
            data: {
                ...res,
                ownerId: userId,
            }
        })
    } catch (error) {
        return NextResponse.json(error)
    }

    return NextResponse.json({ res })
}


export async function PUT(request: Request) {
    interface ResponseData {
        name: string;
        folderId: string;
    }
    const res = await request.json()
    const { name: new_name, folderId }: ResponseData = res;

    try {
        await prisma.folder.update({
            where: {
                id: folderId,
            },
            data: {
                name: new_name,
            },
        });
    } catch (error) {
        return NextResponse.json(error)
    }

    return NextResponse.json(res);
}