import { prisma } from "../../lib/prisma"
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

export async function POST(request: Request) {
    const res = await request.json()
    const { userId } = auth();
    await prisma.folder.create({
        data: {
            ...res,
            ownerId: userId,
        }
    })

    return NextResponse.json({ res })
}