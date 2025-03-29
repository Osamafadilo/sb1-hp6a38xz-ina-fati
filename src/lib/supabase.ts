import { createClient } from '@supabase/supabase-js';
import config from '../config';

const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadFile = async (
  file: File,
  serviceId: string,
  metadata: Record<string, any> = {}
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('serviceId', serviceId);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await fetch(
      `${supabaseUrl}/functions/v1/upload-file`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getServiceFiles = async (serviceId: string) => {
  try {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('service_id', serviceId)
      .eq('status', 'active');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    const { data: file, error: fetchError } = await supabase
      .from('files')
      .select('path')
      .eq('id', fileId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Delete from storage
    const { error: storageError } = await supabase
      .storage
      .from('service-files')
      .remove([file.path]);

    if (storageError) {
      throw storageError;
    }

    // Update database record
    const { error: updateError } = await supabase
      .from('files')
      .update({ status: 'deleted' })
      .eq('id', fileId);

    if (updateError) {
      throw updateError;
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};