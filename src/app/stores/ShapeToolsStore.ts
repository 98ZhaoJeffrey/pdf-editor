import { create } from 'zustand'
import { BRUSH_TYPES, DEFAULT_COLORS, DEFAULT_FONTS, SHAPES } from '../contants';
import { TShape } from '../types/shape';

interface ShapeToolsStoreInterface {
    shape: TShape,
    setShape: (shape: TShape) => void,
}


const ShapeToolsStore = create<ShapeToolsStoreInterface>((set) => ({
    shape: Object.keys(SHAPES)[0] as TShape,
    setShape: (shape: TShape) => set(({ shape })),
}));

export default ShapeToolsStore;
export type { ShapeToolsStoreInterface }