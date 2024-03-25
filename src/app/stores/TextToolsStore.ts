import { create } from 'zustand'

interface TextToolsStoreInterface {
    textDecorations: string[],
    setTextDecorations: (decorations: string[]) => void
}


const TextToolsStore = create<TextToolsStoreInterface>((set) => ({
    textDecorations: [],
    setTextDecorations: (decorations: string[]) => set(({ textDecorations: decorations }))
  }));

export default TextToolsStore;
export type { TextToolsStoreInterface };
