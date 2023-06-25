import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { folderID: string } }) {
    try {
        await prisma.folder.delete({
            where: {
                id: params.folderID,
            }
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PATCH(request: Request, { params }: { params: { folderID: string } }) {
    const res = await request.json()

    try {
        await prisma.folder.update({
            where: {
                id: params.folderID,
            },
            data: res,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

    return NextResponse.json(res);
}