
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Bookmark, 
  Tag, 
  Upload, 
  ChevronLeft, 
  ChevronRight,
  Book,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [question, setQuestion] = useState('');
  const { toast } = useToast();

  const totalPages = 45;

  const handleAskQuestion = () => {
    if (question.trim()) {
      console.log('Asking question:', question);
      toast({
        title: "Question submitted!",
        description: "AI is analyzing the document to provide an answer.",
      });
      setQuestion('');
    }
  };

  const summary = {
    oneLiner: "A comprehensive financial report outlining Q4 2024 performance with 15% revenue growth and strategic expansion plans.",
    sections: [
      { title: "Executive Summary", summary: "Strong quarterly performance with key metrics exceeding targets." },
      { title: "Financial Performance", summary: "Revenue increased 15% YoY driven by product innovation and market expansion." },
      { title: "Market Analysis", summary: "Competitive positioning strengthened in core markets with new customer acquisition." },
      { title: "Future Outlook", summary: "Optimistic projections for 2025 with planned investments in technology and talent." }
    ]
  };

  const entities = [
    { type: "People", items: ["John Smith (CEO)", "Sarah Johnson (CFO)", "Michael Brown (CTO)"] },
    { type: "Organizations", items: ["TechCorp Inc.", "Innovation Labs", "Global Solutions Ltd."] },
    { type: "Dates", items: ["Q4 2024", "December 31, 2024", "January 15, 2025"] },
    { type: "Financial", items: ["$15.2M revenue", "15% growth", "$2.3M profit"] }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Q4 Financial Report 2024.pdf
          </h1>
          <p className="text-gray-600">2.4 MB • 45 pages • Uploaded Jan 15, 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="neon-border">
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmark
          </Button>
          <Button variant="outline" size="sm" className="neon-border">
            <Tag className="h-4 w-4 mr-2" />
            Tag
          </Button>
          <Button variant="outline" size="sm" className="neon-border">
            <Upload className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Document View */}
        <div className="lg:col-span-2">
          <Card className="h-[800px]">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search in document..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Button size="sm" className="bg-lexo-purple hover:bg-lexo-purple-dark">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Document Preview</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Page {currentPage} content would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Question Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ask Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="What are the key financial highlights?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                />
                <Button 
                  onClick={handleAskQuestion}
                  className="w-full bg-lexo-purple hover:bg-lexo-purple-dark button-glow"
                  disabled={!question.trim()}
                >
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="entities">Entities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">One-Liner</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {summary.oneLiner}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Section Summaries</h4>
                    <div className="space-y-3">
                      {summary.sections.map((section, index) => (
                        <div key={index} className="border-l-2 border-lexo-purple pl-3">
                          <h5 className="font-medium text-sm text-gray-800">{section.title}</h5>
                          <p className="text-xs text-gray-600 mt-1">{section.summary}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="entities" className="space-y-4">
                  {entities.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">{category.type}</h4>
                      <div className="space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <span 
                            key={itemIndex}
                            className="inline-block bg-lexo-purple/10 text-lexo-purple text-xs px-2 py-1 rounded mr-2 mb-1"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
