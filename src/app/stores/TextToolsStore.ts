import { create } from 'zustand'
import { DEFAULT_COLORS, DEFAULT_FONTS } from '../contants';

interface TextToolsStore {
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    highlightColor: string,
    textDecorations: string[],
    setFontSize: (size: number) => void,
    setFontFamily: (family: string) => void,
    setFontColor: (color: string) => void,
    setHighlightColor: (color: string) => void,
    setTextDecorations: (decorations: string[]) => void
}


const useTextToolsStore = create<TextToolsStore>((set) => ({
    fontFamily: DEFAULT_FONTS[0],
    fontSize: 12,
    fontColor: DEFAULT_COLORS.BLACK,
    highlightColor: "",
    textDecorations: [],
    setFontSize: (size) => set(({ fontSize: size })),
    setFontFamily: (family) => set(({ fontFamily: family })),
    setFontColor: (color: string) => set(({ fontColor: color })),
    setHighlightColor: (color: string) => set(({ highlightColor: color })),
    setTextDecorations: (decorations: string[]) => set(({ textDecorations: decorations }))
  }));

export default useTextToolsStore;