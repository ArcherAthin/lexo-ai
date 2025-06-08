
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, CloudUpload, Link, Search, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Uploading files:', files);
    toast({
      title: "Files uploaded!",
      description: `Successfully uploaded ${files.length} file(s) for processing.`,
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Documents
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload PDFs, Word docs, PowerPoints, or paste URLs to extract insights with AI-powered analysis
        </p>
      </div>

      <Card 
        className={`border-2 border-dashed transition-all duration-300 ${
          isDragging 
            ? 'border-lexo-purple bg-lexo-purple/5 neon-glow' 
            : 'border-gray-300 hover:border-lexo-purple hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-12">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-lexo-purple/10 rounded-full flex items-center justify-center mb-6">
              <Upload className="h-8 w-8 text-lexo-purple" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-gray-600 mb-6">
              Supports PDF, DOCX, PPTX, TXT files up to 50MB
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow cursor-pointer">
                  <File className="h-5 w-5 mr-2" />
                  Choose Files
                </Button>
              </label>

              <Button variant="outline" className="neon-border button-glow">
                <CloudUpload className="h-5 w-5 mr-2" />
                Import from Cloud
              </Button>

              <Button variant="outline" className="neon-border button-glow">
                <Link className="h-5 w-5 mr-2" />
                Add URL
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="smooth-transition hover:shadow-glow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <File className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Smart Processing</h4>
            <p className="text-sm text-gray-600">Advanced AI extracts key insights and structures your documents</p>
          </CardContent>
        </Card>

        <Card className="smooth-transition hover:shadow-glow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Intelligent Search</h4>
            <p className="text-sm text-gray-600">Ask questions and get precise answers from your documents</p>
          </CardContent>
        </Card>

        <Card className="smooth-transition hover:shadow-glow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Rich Analytics</h4>
            <p className="text-sm text-gray-600">Get summaries, timelines, and entity recognition automatically</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;
