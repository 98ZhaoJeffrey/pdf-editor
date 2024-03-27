import { create } from 'zustand'
import PdfCanvas from '../utils/pdfCanvas';

interface PdfCanvasStoreInterface {
    pdfCanvas: PdfCanvas | null,
    setPdfCanvas: (pdfCanvas: PdfCanvas) => void,
}


const PdfCanvasStore = create<PdfCanvasStoreInterface>((set) => ({
    pdfCanvas: null,
    setPdfCanvas: (pdfCanvas: PdfCanvas) => set({pdfCanvas})
}));

export default PdfCanvasStore;
export type { PdfCanvasStoreInterface }