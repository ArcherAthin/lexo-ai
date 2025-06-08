
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { File, Calendar, Search, Upload, MoreVertical } from 'lucide-react';

const Dashboard = () => {
  const recentDocuments = [
    {
      id: 1,
      title: "Q4 Financial Report 2024.pdf",
      type: "PDF",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      status: "Processed"
    },
    {
      id: 2,
      title: "Market Analysis - Tech Sector.docx",
      type: "DOCX",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
      status: "Processing"
    },
    {
      id: 3,
      title: "Legal Contract Review.pdf",
      type: "PDF",
      uploadDate: "2024-01-13",
      size: "5.2 MB",
      status: "Processed"
    },
    {
      id: 4,
      title: "Research Paper - AI Ethics.pdf",
      type: "PDF",
      uploadDate: "2024-01-12",
      size: "3.1 MB",
      status: "Processed"
    }
  ];

  const stats = [
    { label: "Total Documents", value: "24", trend: "+3 this week" },
    { label: "Pages Analyzed", value: "1,247", trend: "+89 this week" },
    { label: "Insights Generated", value: "156", trend: "+12 this week" },
    { label: "Queries Answered", value: "342", trend: "+45 this week" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Document Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and analyze your documents with AI-powered insights
          </p>
        </div>
        <Button className="bg-lexo-purple hover:bg-lexo-purple-dark button-glow">
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="smooth-transition hover:shadow-glow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.trend}
                  </p>
                </div>
                <div className="w-8 h-8 bg-lexo-purple/10 rounded-lg flex items-center justify-center">
                  <File className="h-4 w-4 text-lexo-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Documents</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="neon-border">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="neon-border">
                <Calendar className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-lexo-purple smooth-transition hover:shadow-glow cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <File className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600">
                      {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'Processed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
