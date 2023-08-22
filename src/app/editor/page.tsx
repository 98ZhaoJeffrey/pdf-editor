'use client'
import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'

import workerSrc from '../pdf-worker'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

export default function Editor () {

    const [pdfSrc, setPdfSrc] = React.useState('');

    React.useEffect(() => {
        async function generatePDF() {
            const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages()
            const firstPage = pages[0]
            const { width, height } = firstPage.getSize()
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
            firstPage.drawText('Hello, world!', {
                x: 5,
                y: height / 2 + 300,
                size: 50,
                font: font,
                color: rgb(0.95, 0.1, 0.1),
                rotate: degrees(-45),
            });
        
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            setPdfSrc(URL.createObjectURL(blob));
        }
    
        generatePDF();
      }, []);

    const [numPages, setNumPages] = React.useState(0);

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
      }

    return (
        <>{
            pdfSrc &&
                <Document file={pdfSrc}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(e) => {console.log('error', e)}}
                    options={options}
                >
                    {Array.from({ length: numPages }, (_, index) => (
                        <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        />
                    ))}
                </Document>
            }
        </>
    )
}