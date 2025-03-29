import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

const DownloadDocs = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/src/docs/api-connections.csv';
    link.download = 'api-connections.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleDownload}
      className="bg-primary text-white flex items-center gap-2"
    >
      <Download className="h-5 w-5" />
      تحميل وثائق API
    </Button>
  );
};

export default DownloadDocs;