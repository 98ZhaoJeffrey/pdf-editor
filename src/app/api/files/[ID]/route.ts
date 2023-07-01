import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { auth } from '@clerk/nextjs';
import { fstat } from 'fs';

export async function POST(request: NextRequest, { params }: { params: { ID: string } }) {
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
    if (params.ID !== 'null') {
        parentFolderID = params.ID;
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


export async function PATCH(request: Request, { params }: { params: { ID: string } }) {
    const res = await request.json()
    try {

        await prisma.file.update({
            where: {
                id: params.ID,
            },
            data: res,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

    return NextResponse.json(res);
}

export async function DELETE(request: Request, { params }: { params: { ID: string } }) {
    try {
        await prisma.file.delete({
            where: {
                id: params.ID,
            },
        });
    } catch (error) {
        return NextResponse.json(error)
    }
}


export async function GET(request: Request, { params }: { params: { ID: string } }) {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: params.ID,
            },
            select: {
                fileContent: true,
                name: true
            }
        })

        if (file) {
            const blob = new Blob([file.fileContent]);

            // Set the necessary headers
            const headers = {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${file.name}"`,
            };

            return new Response(blob, { headers });
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}
