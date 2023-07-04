import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server";

async function getParent(folderID: string) {
  try {
    return await prisma.folder.findUnique({
      where: {
        id: folderID
      },
      select: {
        id: true,
        folderParentFolderId: true,
        name: true
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllAncestors(folderID: string) {
  if (!folderID) {
    return []
  }
  let ancestors = [];
  let currID = (await getParent(folderID))?.folderParentFolderId;
  while (currID) {
    const folder = await getParent(currID);
    if (folder) {
      ancestors.unshift({ name: folder.name, folderID: folder.id });
      currID = folder.folderParentFolderId;
    } else {
      console.log("Failed to retrieve folder");
      return;
    }
  }
  return ancestors;
}

export async function GET(request: Request, { params }: { params: { folderID: string } }) {
  try {
    const allAncestor = await getAllAncestors(params.folderID)
    return NextResponse.json({ ancestors: allAncestor })
  } catch (e) {
    throw new Error('Failed to obtain parent')
  }
}

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