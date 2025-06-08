
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, File, CloudUpload, Link, Search, Settings, Loader2, Sparkles, Zap } from 'lucide-react';
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
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <motion.div 
                className="inline-flex items-center gap-3 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lexo-purple to-lexo-neon flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold gradient-text">
                  AI Analysis Complete! ✨
                </h2>
              </motion.div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your document has been processed with next-gen AI insights
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
                  className="mt-6 cyber-card button-glow px-8 py-3 text-lg rounded-2xl shimmer"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Analyze Another Doc
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
      <AnimatedBackground />
      <div className="relative z-10 max-w-5xl mx-auto p-6">
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
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-lexo-purple via-lexo-neon to-lexo-cyber-pink flex items-center justify-center animate-rainbow-glow">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold gradient-text">
              Drop it like it's hot! 🔥
            </h2>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload your docs and watch our AI work its magic ✨ Supports PDFs, Word docs, text files, and URLs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <Card 
            className={`cyber-card transition-all duration-500 ${
              isDragging 
                ? 'neon-glow scale-105 animate-pulse-glow' 
                : 'hover:neon-glow hover:scale-102'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-12">
              <div className="text-center">
                <motion.div
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-lexo-purple to-lexo-neon rounded-3xl flex items-center justify-center mb-8 floating-element"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isProcessing ? (
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                  ) : (
                    <Upload className="h-12 w-12 text-white" />
                  )}
                </motion.div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-3 gradient-text">
                  {isProcessing ? 'AI is cooking... 🧠' : 'Drag & drop or click to upload'}
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Supports PDF, DOCX, TXT files up to 50MB
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
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
                        className="button-glow px-8 py-4 text-lg rounded-2xl cursor-pointer shimmer"
                        disabled={isProcessing}
                        asChild
                      >
                        <span>
                          <File className="h-6 w-6 mr-3" />
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
                      className="neon-border px-8 py-4 text-lg rounded-2xl shimmer"
                      disabled={isProcessing}
                    >
                      <CloudUpload className="h-6 w-6 mr-3" />
                      Cloud Import
                    </Button>
                  </motion.div>
                </div>

                {/* Enhanced URL Input */}
                <motion.div 
                  className="flex gap-3 max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Input
                    type="url"
                    placeholder="Paste any URL and watch the magic happen... ✨"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    disabled={isProcessing}
                    className="flex-1 rounded-xl border-2 border-transparent bg-white/80 backdrop-blur-sm focus:neon-border"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={handleUrlImport}
                      disabled={!urlInput.trim() || isProcessing}
                      className="button-glow px-6 rounded-xl"
                    >
                      <Link className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: File,
              title: "Smart Processing",
              description: "Advanced AI extracts key insights and structures your documents",
              color: "from-blue-500 to-cyan-500",
              delay: 0
            },
            {
              icon: Search,
              title: "Intelligent Search",
              description: "Ask questions and get precise answers from your documents",
              color: "from-green-500 to-emerald-500",
              delay: 0.1
            },
            {
              icon: Settings,
              title: "Rich Analytics",
              description: "Get summaries, timelines, and entity recognition automatically",
              color: "from-purple-500 to-pink-500",
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
              <Card className="cyber-card h-full hover:neon-glow group">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-in`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4 gradient-text">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
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
