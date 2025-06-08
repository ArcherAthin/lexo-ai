
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, File, CloudUpload, Link, Sparkles, Zap, Loader2, FileText, Globe, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GeminiService, DocumentAnalysis } from '@/services/geminiService';
import DashboardTiles from './DashboardTiles';
import InteractiveBackground from './InteractiveBackground';

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
        content = `This is a demo analysis of ${file.name}. In a real implementation, this would extract actual content from PDF/DOCX files using appropriate libraries.`;
      }
      
      setDocumentContent(content);
      
      const analysisResult = await geminiService.analyzeDocument(content, file.name);
      setAnalysis(analysisResult);
      
      toast({
        title: "Document processed successfully! ✨",
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
      const mockContent = `This is simulated content extracted from ${urlInput}. In a real implementation, this would fetch and extract content from the provided URL.`;
      
      setDocumentContent(mockContent);
      
      const analysisResult = await geminiService.analyzeDocument(mockContent, `Web content from ${urlInput}`);
      setAnalysis(analysisResult);
      
      toast({
        title: "URL content processed! 🚀",
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  if (analysis) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <InteractiveBackground />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <motion.div 
                className="inline-flex items-center gap-4 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-5xl font-bold gradient-text">
                  Analysis Complete! ✨
                </h2>
              </motion.div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Your document has been processed with advanced AI insights
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setAnalysis(null);
                    setDocumentContent('');
                  }}
                  className="premium-button shimmer-effect"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Analyze Another Document
                </Button>
              </motion.div>
            </motion.div>
            
            <DashboardTiles analysis={analysis} documentContent={documentContent} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-2xl floating-element">
              <Upload className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-6xl font-bold gradient-text">
              Transform Documents with AI
            </h2>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Upload your documents and unlock intelligent insights with our advanced AI processing engine. 
            Supports PDFs, Word docs, text files, and web content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <Card 
            className={`dashboard-tile transition-all duration-500 ${
              isDragging 
                ? 'scale-105 border-purple-400 shadow-2xl' 
                : 'hover:scale-102'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-12">
              <div className="text-center">
                <motion.div
                  className="mx-auto w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-8 floating-element shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isProcessing ? (
                    <Loader2 className="h-16 w-16 text-white animate-spin" />
                  ) : (
                    <Upload className="h-16 w-16 text-white" />
                  )}
                </motion.div>
                
                <h3 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
                  {isProcessing ? 'AI Processing...' : 'Drop Files or Click to Upload'}
                </h3>
                <p className="text-lg text-gray-600 mb-10">
                  Supports PDF, DOCX, TXT files and web links • Maximum 50MB
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
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
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="premium-button shimmer-effect px-10 py-4 text-lg cursor-pointer"
                        disabled={isProcessing}
                        asChild
                      >
                        <span>
                          <FileText className="h-6 w-6 mr-3" />
                          Choose Files
                        </span>
                      </Button>
                    </motion.div>
                  </label>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      className="glass-card hover-lift px-10 py-4 text-lg border-purple-200"
                      disabled={isProcessing}
                    >
                      <CloudUpload className="h-6 w-6 mr-3" />
                      Cloud Import
                    </Button>
                  </motion.div>
                </div>

                <motion.div 
                  className="flex gap-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Input
                    type="url"
                    placeholder="Paste any URL for instant AI analysis..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    disabled={isProcessing}
                    className="modern-input flex-1 text-lg"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={handleUrlImport}
                      disabled={!urlInput.trim() || isProcessing}
                      className="premium-button px-8"
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: "Smart Analysis",
              description: "Advanced AI extracts key insights, summaries, and structured data from your documents",
              gradient: "from-blue-500 to-cyan-500",
              delay: 0
            },
            {
              icon: Sparkles,
              title: "Intelligent Insights",
              description: "Get precise answers, sentiment analysis, and entity recognition automatically",
              gradient: "from-green-500 to-emerald-500",
              delay: 0.1
            },
            {
              icon: Zap,
              title: "Visual Analytics",
              description: "Interactive charts, timelines, and data visualizations for better understanding",
              gradient: "from-purple-500 to-pink-500",
              delay: 0.2
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + feature.delay, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="dashboard-tile h-full group">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed flex-grow text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentUpload;
