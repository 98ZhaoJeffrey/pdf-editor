import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { auth } from '@clerk/nextjs';

export async function POST(request: NextRequest, { params }: { params: { parentFolderID: string } }) {
    console.log("Uploading file")
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const { userId } = auth();

    if (!file || !userId) {
        return NextResponse.json({ success: false })
    }

    const maxSizeInBytes = 16 * 1024 * 1024;

    if (file.size >= maxSizeInBytes) {
        console.log("file exceeds max size")
        return NextResponse.json({ success: false })
    }


    let parentFolderID = null;
    if (params.parentFolderID !== 'null') {
        parentFolderID = params.parentFolderID;
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    try {
        await prisma.file.create({
            data: {
                name: file.name,
                ownerId: userId,
                size: file.size,
                fileParentFolderId: parentFolderID,
                fileContent: buffer
            }
        })
        console.log(file.name)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

    return NextResponse.json({ success: true })
}