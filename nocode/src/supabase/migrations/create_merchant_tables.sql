-- 商家信息表
CREATE TABLE IF NOT EXISTS merchants (
  id bigserial primary key,
  name text not null default '',
  description text not null default '',
  logo_url text not null default '',
  brand_story text not null default '',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 商家文档表
CREATE TABLE IF NOT EXISTS merchant_documents (
  id bigserial primary key,
  merchant_id bigint not null,
  file_name text not null default '',
  file_type text not null default '',
  storage_path text not null default '',
  extracted_text text not null default '',
  status text not null default 'pending',
  created_at timestamp with time zone default now()
);

-- 知识库文本块表（切分后的文档片段）
CREATE TABLE IF NOT EXISTS merchant_kb_chunks (
  id bigserial primary key,
  merchant_id bigint not null,
  document_id bigint not null,
  content text not null default '',
  chunk_index int not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamp with time zone default now()
);

-- 生成的互动内容表（人格测试、海龟汤等）
CREATE TABLE IF NOT EXISTS generated_content (
  id bigserial primary key,
  merchant_id bigint not null,
  content_type text not null default '',
  content_json jsonb not null default '{}',
  status text not null default 'active',
  created_at timestamp with time zone default now()
);

-- 存储桶用于保存原始文件
INSERT INTO storage.buckets (id, name, public)
VALUES ('merchant_docs', 'merchant_docs', true)
ON CONFLICT (id) DO NOTHING;
