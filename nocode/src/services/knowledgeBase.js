import { supabase } from '@/integrations/supabase/client';

export const fetchMerchant = async (id) => {
  const { data } = await supabase.from('merchants').select('*').eq('id', id).single();
  return data;
};

export const upsertMerchant = async (payload) => {
  const { data, error } = await supabase
    .from('merchants')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const uploadDocument = async (merchantId, fileName, fileType, extractedText) => {
  const { data, error } = await supabase
    .from('merchant_documents')
    .insert({
      merchant_id: merchantId,
      file_name: fileName,
      file_type: fileType,
      storage_path: '',
      extracted_text: extractedText,
      status: 'completed',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const fetchDocuments = async (merchantId) => {
  const { data, error } = await supabase
    .from('merchant_documents')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const deleteDocument = async (docId) => {
  await supabase.from('merchant_kb_chunks').delete().eq('document_id', docId);
  await supabase.from('merchant_documents').delete().eq('id', docId);
};

export const saveChunks = async (merchantId, documentId, chunks) => {
  const rows = chunks.map((c) => ({
    merchant_id: merchantId,
    document_id: documentId,
    content: c.content,
    chunk_index: c.chunk_index,
    metadata: {},
  }));
  const { error } = await supabase.from('merchant_kb_chunks').insert(rows);
  if (error) throw error;
};

export const fetchChunks = async (merchantId) => {
  const { data, error } = await supabase
    .from('merchant_kb_chunks')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('chunk_index', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const saveGeneratedContent = async (merchantId, type, contentJson) => {
  await supabase
    .from('generated_content')
    .update({ status: 'archived' })
    .eq('merchant_id', merchantId)
    .eq('content_type', type);
  const { error } = await supabase.from('generated_content').insert({
    merchant_id: merchantId,
    content_type: type,
    content_json: contentJson,
    status: 'active',
  });
  if (error) throw error;
};

export const fetchGeneratedContent = async (merchantId) => {
  const { data, error } = await supabase
    .from('generated_content')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};
