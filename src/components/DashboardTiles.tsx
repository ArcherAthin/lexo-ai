
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { DocumentAnalysis } from '@/services/geminiService';
import { Brain, Tags, Heart, BarChart3, Clock, MessageCircle } from 'lucide-react';

interface DashboardTilesProps {
  analysis: DocumentAnalysis;
  documentContent: string;
}

const DashboardTiles: React.FC<DashboardTilesProps> = ({ analysis }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Enhanced data for visualizations
  const sentimentData = [
    { name: 'Positive', value: analysis.sentiment.score > 0.5 ? analysis.sentiment.score * 100 : 30, color: '#10b981' },
    { name: 'Neutral', value: Math.abs(0.5 - analysis.sentiment.score) * 100, color: '#f59e0b' },
    { name: 'Negative', value: analysis.sentiment.score < 0.5 ? (1 - analysis.sentiment.score) * 100 : 20, color: '#ef4444' }
  ];

  const sectionImportanceData = analysis.sections.map(section => ({
    name: section.title.length > 15 ? section.title.substring(0, 15) + '...' : section.title,
    importance: section.importance * 100,
    fullTitle: section.title
  }));

  const GRADIENT_COLORS = ['#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe', '#e879f9'];

  const tileConfigs = [
    {
      icon: Brain,
      title: "Abstract & Summary",
      gradient: "from-purple-500 to-pink-500",
      content: (
        <div className="space-y-6">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="font-semibold text-sm text-purple-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Abstract
            </h4>
            <p className="text-gray-700 leading-relaxed">{analysis.abstract}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <h4 className="font-semibold text-sm text-pink-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Summary
            </h4>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>
      )
    },
    {
      icon: Tags,
      title: "Keywords & Entities",
      gradient: "from-blue-500 to-cyan-500",
      content: (
        <Tabs defaultValue="keywords" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="keywords" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Keywords</TabsTrigger>
            <TabsTrigger value="entities" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">Entities</TabsTrigger>
          </TabsList>
          <TabsContent value="keywords" className="space-y-3 mt-4">
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((keyword, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="glass-card text-blue-700 border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    {keyword}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="entities" className="space-y-4 mt-4">
            {Object.entries(analysis.entities).map(([type, items]) => (
              <div key={type} className="glass-card p-3 rounded-lg">
                <h5 className="font-semibold text-sm text-gray-700 mb-2 capitalize flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  {type}
                </h5>
                <div className="flex flex-wrap gap-1">
                  {items.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-cyan-200">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      )
    },
    {
      icon: Heart,
      title: "Sentiment Analysis",
      gradient: "from-green-500 to-emerald-500",
      content: (
        <div className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Sentiment']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              Overall Sentiment: <span className="font-bold text-lg capitalize text-gray-800">{analysis.sentiment.overall}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Confidence Score: {(analysis.sentiment.score * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      )
    },
    {
      icon: BarChart3,
      title: "Section Analysis",
      gradient: "from-orange-500 to-red-500",
      content: (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectionImportanceData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip 
                formatter={(value: number, name, props) => [
                  `${value.toFixed(1)}%`, 
                  'Importance'
                ]}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;
                  return item?.fullTitle || label;
                }}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Bar 
                dataKey="importance" 
                fill="url(#colorGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    },
    {
      icon: Clock,
      title: "Timeline",
      gradient: "from-indigo-500 to-purple-500",
      content: (
        <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
          {analysis.timeline.length > 0 ? (
            analysis.timeline.map((event, index) => (
              <motion.div 
                key={index} 
                className="glass-card p-4 rounded-lg hover-lift"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-indigo-700">{event.date}</p>
                    <p className="text-sm text-gray-600 mt-1">{event.event}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass-card p-8 rounded-lg text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 italic">No timeline events detected</p>
            </div>
          )}
        </div>
      )
    },
    {
      icon: MessageCircle,
      title: "Key Questions & Answers",
      gradient: "from-pink-500 to-rose-500",
      content: (
        <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar">
          {analysis.questions.map((qa, index) => (
            <motion.div 
              key={index} 
              className="glass-card p-4 rounded-lg hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="border-l-4 border-gradient-to-b from-pink-500 to-rose-500 pl-4">
                <p className="font-semibold text-pink-700 mb-2">{qa.question}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{qa.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tileConfigs.map((tile, index) => (
        <motion.div key={index} variants={tileVariants}>
          <Card className="dashboard-tile h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className={`w-10 h-10 bg-gradient-to-r ${tile.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <tile.icon className="h-5 w-5 text-white" />
                </div>
                <span className="gradient-text">{tile.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tile.content}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardTiles;
