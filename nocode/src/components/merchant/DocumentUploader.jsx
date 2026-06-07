import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Loader2, Trash2 } from 'lucide-react';
import { parseDocument } from '@/services/documentParser';
import { uploadDocument, fetchDocuments, deleteDocument, saveChunks } from '@/services/knowledgeBase';

const DocumentUploader = ({ merchantId }) => {
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    loadDocs();
  }, [merchantId]);

  const loadDocs = async () => {
    const data = await fetchDocuments(merchantId);
    setDocs(data || []);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const text = await parseDocument(file);
      const chunks = text
        .split(/\n\s*\n/)
        .filter((t) => t.trim().length > 10)
        .map((t, i) => ({ content: t.trim(), chunk_index: i }));
      const doc = await uploadDocument(merchantId, file.name, file.type.includes('pdf') ? 'pdf' : 'word', text);
      if (doc) {
        await saveChunks(merchantId, doc.id, chunks);
      }
      await loadDocs();
    } catch (err) {
      alert('解析失败：' + err.message);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (docId) => {
    await deleteDocument(docId);
    await loadDocs();
  };

  return (
    <div className="space-y-4">
      <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50">
        <CardContent className="p-6 text-center">
          <input type="file" accept=".docx,.pdf" id="doc-upload" className="hidden" onChange={handleFileChange} />
          <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">点击上传 Word 或 PDF 文档</span>
            <span className="text-xs text-gray-500">系统将自动解析、切分并存入知识库</span>
          </label>
        </CardContent>
      </Card>

      {uploading && (
        <div className="flex items-center justify-center gap-2 text-sm text-blue-600 py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          正在解析文档并生成知识库...
        </div>
      )}

      <div className="space-y-2">
        {docs.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-800">{doc.file_name}</p>
                <p className="text-xs text-gray-500">{doc.status === 'completed' ? '已解析' : doc.status}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {docs.length === 0 && <p className="text-center text-sm text-gray-400 py-4">暂无文档</p>}
      </div>
    </div>
  );
};

export default DocumentUploader;
