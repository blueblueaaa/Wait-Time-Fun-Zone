// 前端文档解析服务：支持 Word(docx) 与 PDF
export const parseDocument = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.docx')) {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || '';
  }

  if (fileName.endsWith('.pdf')) {
    const pdfjsLib = await import('pdfjs-dist');
    const version = pdfjsLib.version || '3.11.174';
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ') + '\n';
    }
    return text;
  }

  throw new Error('仅支持 .docx 和 .pdf 格式');
};
