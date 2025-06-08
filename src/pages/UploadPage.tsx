
import React from 'react';
import Navigation from '@/components/Navigation';
import DocumentUpload from '@/components/DocumentUpload';

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DocumentUpload />
    </div>
  );
};

export default UploadPage;
