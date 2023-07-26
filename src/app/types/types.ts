export type FileMetaData = {
    id: string
    name: string
    ownerId: string
    creationDate: Date
    lastUpdated: Date
    size: number
    fileParentFolderId: string | null
  }