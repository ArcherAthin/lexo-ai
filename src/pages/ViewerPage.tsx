
import React from 'react';
import Navigation from '@/components/Navigation';
import DocumentViewer from '@/components/DocumentViewer';

const ViewerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DocumentViewer />
    </div>
  );
};

export default ViewerPage;
