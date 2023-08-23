import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { auth } from '@clerk/nextjs';

export async function GET(request: Request, { params }: { params: { ID: string } }) {
    const { userId } = auth();
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: params.ID,
            },
            select: {
                fileContent: true,
                name: true,
                ownerId: true,
            }
        })

        if (file) {
            if (file.ownerId != userId) {
                return NextResponse.json('Access denied')
            }

            const blob = new Blob([file.fileContent]);

            // Set the necessary headers
            const headers = {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${file.name}"`,
            };

            return new Response(blob, { headers });
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(error)
    }
}