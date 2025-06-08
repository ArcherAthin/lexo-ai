
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { ArrowUp, Upload, Search, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-lexo-purple/10 text-lexo-purple text-sm font-medium mb-8 animate-fade-in">
            <ArrowUp className="h-4 w-4 mr-2" />
            AI-Powered Document Intelligence
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Transform Documents into
            <span className="gradient-text block mt-2">
              Actionable Insights
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 text-balance">
            Extract structured insights from complex documents with advanced AI. 
            Upload PDFs, Word files, presentations, and get instant summaries, 
            Q&A capabilities, and intelligent analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/upload">
              <Button size="lg" className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow text-lg px-8 py-3">
                <Upload className="h-5 w-5 mr-2" />
                Start Analyzing Documents
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="neon-border button-glow text-lg px-8 py-3">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful AI Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to understand and analyze your documents with cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Search,
              title: "Intelligent Q&A",
              description: "Ask natural language questions and get precise answers from your documents with context-aware AI."
            },
            {
              icon: Book,
              title: "Multi-Layer Summaries",
              description: "Get one-liners, section summaries, and comprehensive overviews generated automatically."
            },
            {
              icon: Upload,
              title: "Universal Upload",
              description: "Support for PDFs, Word docs, PowerPoints, images, and direct URL extraction."
            },
            {
              icon: Search,
              title: "Entity Recognition",
              description: "Automatically identify people, places, organizations, dates, and key terms in your documents."
            },
            {
              icon: Book,
              title: "Timeline Generation",
              description: "Extract and visualize events, dates, and chronological information automatically."
            },
            {
              icon: Upload,
              title: "Sentiment Analysis",
              description: "Understand tone, sentiment shifts, and emotional context throughout your documents."
            }
          ].map((feature, index) => (
            <Card key={index} className="smooth-transition hover:shadow-glow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-lexo-purple/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-lexo-purple" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-lexo-purple to-lexo-purple-dark py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals who rely on Lexo.ai for intelligent document analysis
          </p>
          <Link to="/upload">
            <Button size="lg" variant="secondary" className="button-glow text-lg px-8 py-3">
              <Upload className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text mb-4">Lexo.ai</h3>
            <p className="text-gray-400 mb-6">
              AI-powered document intelligence for the modern professional
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-lexo-neon smooth-transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-lexo-neon smooth-transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-lexo-neon smooth-transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
