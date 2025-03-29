/*
  # Storage and Files Management Schema

  1. New Tables
    - `files`
      - `id` (uuid, primary key)
      - `name` (text)
      - `path` (text)
      - `size` (bigint)
      - `mime_type` (text)
      - `user_id` (uuid, references auth.users)
      - `service_id` (uuid, references services)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `status` (text)
      - `metadata` (jsonb)

    - `services`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `provider_id` (uuid, references auth.users)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `metadata` (jsonb)

  2. Security
    - Enable RLS on all tables
    - Add policies for file access and management
    - Add policies for service management
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  provider_id uuid REFERENCES auth.users NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT valid_service_type CHECK (
    type IN ('accommodation', 'store', 'maintenance', 'transport', 'restaurant', 'investment', 'delivery')
  ),
  CONSTRAINT valid_status CHECK (
    status IN ('active', 'inactive', 'pending', 'suspended')
  )
);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  path text NOT NULL,
  size bigint NOT NULL,
  mime_type text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  service_id uuid REFERENCES services,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'active',
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT valid_file_status CHECK (
    status IN ('active', 'deleted', 'processing')
  )
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Service policies
CREATE POLICY "Users can view their own services"
  ON services
  FOR SELECT
  TO authenticated
  USING (provider_id = auth.uid());

CREATE POLICY "Users can create services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Users can update their own services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (provider_id = auth.uid())
  WITH CHECK (provider_id = auth.uid());

-- File policies
CREATE POLICY "Users can view their own files"
  ON files
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can upload files"
  ON files
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own files"
  ON files
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_services_provider ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_services_type ON services(type);
CREATE INDEX IF NOT EXISTS idx_files_user ON files(user_id);
CREATE INDEX IF NOT EXISTS idx_files_service ON files(service_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at
  BEFORE UPDATE ON files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();