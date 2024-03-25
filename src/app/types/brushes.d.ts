export type TBrushes = "Pencil" | "Eraser"

export interface brushOptions {
    brush: TBrushes,
    brushSize: number,
    brushColor: string
}