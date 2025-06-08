
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Upload, Brain, BarChart3, FileText, ArrowRight, Sparkles, Zap } from 'lucide-react';
import InteractiveBackground from '@/components/InteractiveBackground';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: "Smart Document Upload",
      description: "Upload PDFs, Word docs, or paste URLs for instant AI analysis with advanced processing capabilities"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights", 
      description: "Extract summaries, entities, sentiment, and key topics automatically using Google Gemini AI"
    },
    {
      icon: BarChart3,
      title: "Interactive Analytics",
      description: "Visualize data with beautiful charts, timelines, and organized dashboard tiles"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10">
        {/* Enhanced Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-6"
        >
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-3xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Lexo.ai
            </motion.h1>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="glass-card hover-lift border-purple-200"
                >
                  Dashboard
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate('/upload')}
                  className="premium-button shimmer-effect"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-2xl floating-element">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            
            <h2 className="text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transform Documents with{' '}
              <span className="gradient-text">AI Intelligence</span>
            </h2>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Extract insights, generate summaries, and visualize data from complex documents
              using advanced AI. Upload PDFs, Word docs, or paste URLs for instant analysis.
            </p>
            <div className="flex gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => navigate('/upload')}
                  className="premium-button shimmer-effect text-xl px-12 py-6"
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Start Analyzing 
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="glass-card hover-lift text-xl px-12 py-6 border-purple-200"
                >
                  <FileText className="mr-3 h-6 w-6" />
                  View Dashboard
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="dashboard-tile h-full group">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Card className="dashboard-tile max-w-4xl mx-auto">
              <CardContent className="p-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
                >
                  <Zap className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6 gradient-text">
                  Ready to unlock your documents' potential?
                </h3>
                <p className="text-gray-600 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
                  Join thousands of professionals using AI to transform how they work with documents.
                  Experience the future of document analysis today.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => navigate('/upload')}
                    className="premium-button shimmer-effect text-xl px-16 py-6"
                  >
                    <Brain className="mr-3 h-6 w-6" />
                    Start Free Analysis
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
