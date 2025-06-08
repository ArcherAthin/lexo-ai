
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, File, CloudUpload, Link, Search, Settings, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GeminiService, DocumentAnalysis } from '@/services/geminiService';
import DashboardTiles from './DashboardTiles';
import AnimatedBackground from './AnimatedBackground';

interface DocumentUploadProps {
  apiKey: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ apiKey }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [documentContent, setDocumentContent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const { toast } = useToast();

  const geminiService = new GeminiService(apiKey);

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

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        // For now, we'll handle plain text files
        // In a real implementation, you'd use different libraries for PDF, DOCX, etc.
        resolve(content);
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    const allowedTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.txt')) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a TXT, PDF, or DOCX file.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      let content = '';
      
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        content = await extractTextFromFile(file);
      } else {
        // For demo purposes, we'll simulate content extraction
        content = `This is a demo analysis of ${file.name}. In a real implementation, this would extract actual content from PDF/DOCX files using appropriate libraries.`;
      }
      
      setDocumentContent(content);
      
      const analysisResult = await geminiService.analyzeDocument(content, file.name);
      setAnalysis(analysisResult);
      
      toast({
        title: "Document processed successfully!",
        description: `${file.name} has been analyzed with AI insights.`,
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Processing failed",
        description: "Failed to analyze the document. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlImport = async () => {
    if (!urlInput.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // For demo purposes, we'll simulate content extraction from URL
      const mockContent = `This is simulated content extracted from ${urlInput}. In a real implementation, this would fetch and extract content from the provided URL.`;
      
      setDocumentContent(mockContent);
      
      const analysisResult = await geminiService.analyzeDocument(mockContent, `Web content from ${urlInput}`);
      setAnalysis(analysisResult);
      
      toast({
        title: "URL content processed!",
        description: "Web content has been analyzed with AI insights.",
      });
      setUrlInput('');
    } catch (error) {
      console.error('URL processing error:', error);
      toast({
        title: "Processing failed",
        description: "Failed to process the URL content.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  if (analysis) {
    return (
      <div className="min-h-screen bg-white relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Document Analysis Complete
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                AI-powered insights extracted from your document
              </p>
              <Button
                onClick={() => {
                  setAnalysis(null);
                  setDocumentContent('');
                }}
                variant="outline"
                className="mt-4 neon-border"
              >
                Analyze Another Document
              </Button>
            </motion.div>
            
            <DashboardTiles analysis={analysis} documentContent={documentContent} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Your Documents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload PDFs, Word docs, text files, or paste URLs to extract insights with AI-powered analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
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
                <motion.div
                  className="mx-auto w-16 h-16 bg-lexo-purple/10 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isProcessing ? (
                    <Loader2 className="h-8 w-8 text-lexo-purple animate-spin" />
                  ) : (
                    <Upload className="h-8 w-8 text-lexo-purple" />
                  )}
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isProcessing ? 'Processing with AI...' : 'Drop files here or click to upload'}
                </h3>
                <p className="text-gray-600 mb-6">
                  Supports PDF, DOCX, TXT files up to 50MB
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                    disabled={isProcessing}
                  />
                  <label htmlFor="file-upload">
                    <Button 
                      className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow cursor-pointer"
                      disabled={isProcessing}
                      asChild
                    >
                      <span>
                        <File className="h-5 w-5 mr-2" />
                        Choose Files
                      </span>
                    </Button>
                  </label>

                  <Button 
                    variant="outline" 
                    className="neon-border button-glow"
                    disabled={isProcessing}
                  >
                    <CloudUpload className="h-5 w-5 mr-2" />
                    Import from Cloud
                  </Button>
                </div>

                {/* URL Input */}
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input
                    type="url"
                    placeholder="Paste Google Docs link or any URL..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleUrlImport}
                    disabled={!urlInput.trim() || isProcessing}
                    className="bg-lexo-purple hover:bg-lexo-purple-dark"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentUpload;
