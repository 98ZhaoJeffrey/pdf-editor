import React, { useState, useRef, useEffect } from 'react';
import { Canvas, IText, PencilBrush, TPointerEvent, TPointerEventInfo, Text } from 'fabric';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import { DocumentCallback, PageCallback } from 'react-pdf/dist/cjs/shared/types';
import ToolBar from './ToolBar/ToolBar'
import useTextToolsStore from '@/app/stores/TextToolsStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const windowSize = {width: window.innerWidth, height: window.innerHeight};

const PDFEditor = () => {
 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);

  const { fontFamily, fontColor, fontSize, highlightColor, textDecorations } = useTextToolsStore()

  const fabricTextDecorations = {
    fontStyle: textDecorations.includes('italics') ? 'italics' : 'normal',
    fontWeight: textDecorations.includes('bold') ? 'bold' : 'normal',
    underline: textDecorations.includes('underline'),
    linethrough: textDecorations.includes('strkethrough')
  }

  const onDocumentLoadSuccess = (document: DocumentCallback) => {
    setNumPages(document.numPages);
  }

  const initFabricCanvas = (height: number, width: number) => {
    const canvas = new Canvas(canvasRef.current as HTMLCanvasElement, {
      isDrawingMode: true,
      width,
      height,
    });
    setFabricCanvas(canvas)
    // You can customize the brush settings
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = 'black';
  }

  useEffect(() => {
    fabricCanvas?.on('mouse:up', (options: TPointerEventInfo<TPointerEvent>) => {
      const text = new IText('', {
        left: options.pointer.x,
        top: options.pointer.y,
        fill: fontColor,
        fontFamily: fontFamily,
        fontSize: fontSize,
        textBackgroundColor: highlightColor,
        ...fabricTextDecorations
      })
      //fabricCanvas?.add(text)
      fabricCanvas.isDrawingMode = false
    });

    if(fabricCanvas){
      const text = new IText("  ", {
        left: 10,
        top: 10,
        fill: fontColor,
        fontFamily: fontFamily,
        fontSize: fontSize,
        textBackgroundColor: highlightColor,
        ...fabricTextDecorations
      })
      fabricCanvas.add(text)
      fabricCanvas.setActiveObject(text);
      //text.enterEditing(new MouseEvent())
      fabricCanvas.isDrawingMode = false
    }

    return () => {
      fabricCanvas?.dispose();
    }
  }, [fabricCanvas])

  return (
    <div className="flex flex-col items-center gap-y-2 justify-center min-h-screen">
      <ToolBar/>
      <div className="flex flex-col items-center justify-center h-5/6">
        <Document 
          file="test_pdf_2.pdf" 
          onLoadSuccess={onDocumentLoadSuccess} 
          onLoadError={(e) => console.log('error', e)}
          className="border border-solid border-gray-300"
        >
          <Page 
            pageNumber={pageNumber}
            renderTextLayer={false}
            height={0.85 * windowSize.height}
            onRenderSuccess={(page: PageCallback) => initFabricCanvas(page['height'], page['width'])}
          />
        </Document>
        <div className="absolute">
          <canvas
            ref={canvasRef}
          />      
        </div>
      </div>
    </div>
    
  );
};

export default PDFEditor;