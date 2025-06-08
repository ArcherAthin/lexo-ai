
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { DocumentAnalysis } from '@/services/geminiService';

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
        staggerChildren: 0.1
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Mock data for visualizations
  const sentimentData = [
    { name: 'Positive', value: analysis.sentiment.score > 0.5 ? analysis.sentiment.score * 100 : 30 },
    { name: 'Neutral', value: Math.abs(0.5 - analysis.sentiment.score) * 100 },
    { name: 'Negative', value: analysis.sentiment.score < 0.5 ? (1 - analysis.sentiment.score) * 100 : 20 }
  ];

  const sectionImportanceData = analysis.sections.map(section => ({
    name: section.title,
    importance: section.importance * 100
  }));

  const COLORS = ['#8b5cf6', '#a78bfa', '#c084fc', '#d8b4fe'];

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Abstract & Summary */}
      <motion.div variants={tileVariants}>
        <Card className="h-full hover:shadow-glow smooth-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lexo-purple rounded-full"></div>
              Abstract & Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Abstract</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{analysis.abstract}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Summary</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{analysis.summary}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Keywords & Entities */}
      <motion.div variants={tileVariants}>
        <Card className="h-full hover:shadow-glow smooth-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-lexo-neon rounded-full"></div>
              Keywords & Entities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="keywords" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="entities">Entities</TabsTrigger>
              </TabsList>
              <TabsContent value="keywords" className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="bg-lexo-purple/10 text-lexo-purple">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="entities" className="space-y-3">
                {Object.entries(analysis.entities).map(([type, items]) => (
                  <div key={type}>
                    <h5 className="font-medium text-sm text-gray-700 mb-1 capitalize">{type}</h5>
                    <div className="flex flex-wrap gap-1">
                      {items.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sentiment Analysis */}
      <motion.div variants={tileVariants}>
        <Card className="h-full hover:shadow-glow smooth-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-gray-600">
                Overall: <span className="font-semibold capitalize">{analysis.sentiment.overall}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Importance */}
      <motion.div variants={tileVariants}>
        <Card className="h-full hover:shadow-glow smooth-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Section Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectionImportanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={tileVariants}>
        <Card className="h-full hover:shadow-glow smooth-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analysis.timeline.length > 0 ? (
                analysis.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-lexo-purple rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-sm">{event.date}</p>
                      <p className="text-xs text-gray-600">{event.event}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No timeline events found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Q&A Module */}
      <motion.div variants={tileVariants}>
        <Card className="h-full hover:shadow-glow smooth-transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Key Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {analysis.questions.map((qa, index) => (
                <div key={index} className="border-l-2 border-lexo-purple pl-3">
                  <p className="font-medium text-sm text-gray-800">{qa.question}</p>
                  <p className="text-xs text-gray-600 mt-1">{qa.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardTiles;
