let pdfWorker: string;

if (process.env.NODE_ENV === "production") {
  // use minified version for production
  pdfWorker = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()
} else {
  pdfWorker = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString()
}

export default pdfWorker;
