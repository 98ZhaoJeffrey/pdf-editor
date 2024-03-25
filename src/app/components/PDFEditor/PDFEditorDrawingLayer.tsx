
import { useEffect, useRef, useState } from "react"
import DrawToolsStore from "@/app/stores/DrawToolsStore";
import ShapeToolsStore from "@/app/stores/ShapeToolsStore";
import TextToolsStore from "@/app/stores/TextToolsStore";
import ToolStore from "@/app/stores/ToolStore"
import PdfCanvas from "@/app/utils/pdfCanvas";
import { fabric } from "fabric";

interface PDFEditorDrawingLayerProps {
    height: number,
    width: number
}

type TCanvasModes = "select" | "text" | "draw" | "shape"

const PDFEditorDrawingLayer = ({height, width} : PDFEditorDrawingLayerProps) => {
    
    
    const [fabricCanvas, setFabricCanvas] = useState<PdfCanvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        console.log("init", height, width)
        initFabricCanvas(height, width)
    }, [])

    const initFabricCanvas = (height: number, width: number) => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current as HTMLCanvasElement, {
            isDrawingMode: true,
            width,
            height,
        });
        const canvas = new PdfCanvas(canvasRef.current as HTMLCanvasElement, 
          TextToolsStore,
          DrawToolsStore,
          ShapeToolsStore,
          ToolStore,
          {
            width,
            height,
            selection: true
          }
        );
        setFabricCanvas(canvas)
        console.log(canvas)
    }

    return (
        <canvas ref={canvasRef}/>
    )

}


export default PDFEditorDrawingLayer;