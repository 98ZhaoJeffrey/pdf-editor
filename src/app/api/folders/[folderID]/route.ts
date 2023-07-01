import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server";

async function deleteFile(fileID: string) {
  await prisma.file.delete({
    where: {
      id: fileID,
    },
  });
}

async function deleteFolder(folderID: string) {
  const target = await prisma.folder.findUnique({
    where: {
      id: folderID,
    },
    include: {
      folders: true,
      files: true,
    },
  });

  if (!target) {
    throw new Error('Folder not found'); // Throw an error instead of returning
  }

  for (const folder of target.folders) {
    await deleteFolder(folder.id);
  }

  for (const file of target.files) {
    await deleteFile(file.id);
  }

  // Delete the current folder
  await prisma.folder.delete({
    where: {
      id: folderID,
    },
  });
}

export async function DELETE(request: Request, { params }: { params: { folderID: string } }) {
  try {
    await deleteFolder(params.folderID);
    return NextResponse.json({ success: true })
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