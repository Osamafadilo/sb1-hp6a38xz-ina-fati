import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const serviceId = formData.get('serviceId') as string;
    const metadata = formData.get('metadata') as string;

    if (!file) {
      throw new Error('No file provided');
    }

    // Generate a unique file path
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `public/${serviceId}/${fileName}`;

    // Upload file to Supabase Storage
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('service-files')
      .upload(filePath, file);

    if (storageError) {
      throw storageError;
    }

    // Create file record in database
    const { data: fileData, error: dbError } = await supabase
      .from('files')
      .insert({
        name: file.name,
        path: filePath,
        size: file.size,
        mime_type: file.type,
        service_id: serviceId,
        metadata: metadata ? JSON.parse(metadata) : {},
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }

    return new Response(
      JSON.stringify({
        message: 'File uploaded successfully',
        file: fileData,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});