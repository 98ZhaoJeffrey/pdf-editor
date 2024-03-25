import { create } from 'zustand'
import { DEFAULT_COLORS, DEFAULT_FONTS } from '../contants';
import { TTool } from '../types/tools';

interface ToolStoreInterface {
    tool: TTool,
    size: number,
    color: string,
    highlight: string,
    fontFamily: string,
    setTool: (tool: TTool) => void,
    setSize: (size: number) => void,
    setColor: (color: string) => void,
    setHighlight: (highlight: string) => void
    setFontFamily: (family: string) => void,
}


const ToolStore = create<ToolStoreInterface>((set) => ({
    tool: "select",
    size: 12,
    color: DEFAULT_COLORS.BLACK,
    highlight: DEFAULT_COLORS.TRANSPARENT,
    fontFamily: DEFAULT_FONTS[0],
    setTool: (tool: TTool) => set(({ tool })),
    setSize: (size) => set(({size })),
    setColor: (color: string) => set(({ color })),
    setHighlight: (highlight: string) => set(({ highlight })),
    setFontFamily: (family) => set(({ fontFamily: family })),
}));

export default ToolStore;
export type { ToolStoreInterface };
