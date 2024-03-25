import { create } from 'zustand';
import { TBrushes } from '../types/brushes';
import { BRUSH_TYPES } from '../contants';

interface DrawToolsStoreInterface {
    brushType: TBrushes
    isFillBucket: boolean,
    setBrushType: (brushType: TBrushes) => void, 
    setIsFillBucket: (value: boolean) => void

}

const DrawToolsStore = create<DrawToolsStoreInterface>((set) => ({
    brushType: Object.keys(BRUSH_TYPES)[0] as TBrushes,
    isFillBucket: false,
    setBrushType: (brushType: TBrushes) => set(({ brushType })),
    setIsFillBucket: (value: boolean) => set(({isFillBucket: value}))
}));

export default DrawToolsStore;
export type { DrawToolsStoreInterface }