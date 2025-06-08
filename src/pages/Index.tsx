
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Upload, Search, Settings, File, ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: "Smart Document Upload",
      description: "Upload PDFs, Word docs, or paste URLs for instant AI analysis"
    },
    {
      icon: Search,
      title: "Intelligent Insights", 
      description: "Extract summaries, entities, sentiment, and key topics automatically"
    },
    {
      icon: Settings,
      title: "Interactive Dashboard",
      description: "Visualize data with charts, timelines, and organized tiles"
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold gradient-text">Lexo.ai</h1>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="neon-border"
              >
                Dashboard
              </Button>
              <Button 
                onClick={() => navigate('/upload')}
                className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Documents with{' '}
              <span className="gradient-text">AI Intelligence</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Extract insights, generate summaries, and visualize data from complex documents
              using advanced AI. Upload PDFs, Word docs, or paste URLs for instant analysis.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/upload')}
                className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow text-lg px-8 py-4"
              >
                Start Analyzing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="neon-border text-lg px-8 py-4"
              >
                <File className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-glow smooth-transition border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-lexo-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-lexo-purple" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-lexo-purple/5 to-lexo-neon/5 border-lexo-purple/20 hover:shadow-glow smooth-transition">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to unlock your documents' potential?
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Join thousands of professionals using AI to transform how they work with documents.
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate('/upload')}
                  className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow text-lg px-12 py-4"
                >
                  Start Free Analysis
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
