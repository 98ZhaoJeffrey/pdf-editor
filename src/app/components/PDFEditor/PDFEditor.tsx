import React, { useState, useRef, useEffect } from 'react';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import { DocumentCallback, PageCallback } from 'react-pdf/dist/cjs/shared/types';
import ToolBar from './ToolBar/ToolBar'
import PdfCanvas from '@/app/utils/pdfCanvas';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useDeviceSize from '@/app/hooks/useDeviceSize';

import DrawToolsStore from '@/app/stores/DrawToolsStore';
import ShapeToolsStore from '@/app/stores/ShapeToolsStore';
import TextToolsStore from '@/app/stores/TextToolsStore';
import ToolStore from '@/app/stores/ToolStore';

const PDFEditor = () => {  
  const windowSize = useDeviceSize();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [fabricCanvas, setFabricCanvas] = useState<PdfCanvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onDocumentLoadSuccess = (document: DocumentCallback) => {
    setNumPages(document.numPages);
  }

  const initFabricCanvas = (height: number, width: number) => {
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
  }


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
            height={0.85 * windowSize["height"]}
            onRenderSuccess={(page: PageCallback) => initFabricCanvas(page['height'], page['width'])}
          />
        </Document>
        <div className="absolute"> 
          <canvas ref={canvasRef} />
        </div> 
      </div>
    </div>
    
  );
};

export default PDFEditor;