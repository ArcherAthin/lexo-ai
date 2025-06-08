
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import DocumentUpload from '@/components/DocumentUpload';
import ApiKeyInput from '@/components/ApiKeyInput';

const UploadPage = () => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  if (!apiKey) {
    return <ApiKeyInput onApiKeySet={setApiKey} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <DocumentUpload apiKey={apiKey} />
    </div>
  );
};

export default UploadPage;
