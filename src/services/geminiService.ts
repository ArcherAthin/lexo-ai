
interface DocumentAnalysis {
  abstract: string;
  summary: string;
  keywords: string[];
  entities: {
    people: string[];
    organizations: string[];
    locations: string[];
    dates: string[];
  };
  sentiment: {
    overall: 'positive' | 'negative' | 'neutral';
    score: number;
  };
  sections: Array<{
    title: string;
    summary: string;
    importance: number;
  }>;
  timeline: Array<{
    date: string;
    event: string;
  }>;
  citations: string[];
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeDocument(content: string, fileName: string): Promise<DocumentAnalysis> {
    const prompt = `
    Analyze the following document content and provide a comprehensive analysis in JSON format:

    Document: ${fileName}
    Content: ${content}

    Please provide:
    1. A concise abstract (2-3 sentences)
    2. A detailed summary (paragraph)
    3. Key keywords (array of 5-10 terms)
    4. Named entities (people, organizations, locations, dates)
    5. Sentiment analysis (overall sentiment and score 0-1)
    6. Section breakdown with summaries and importance scores
    7. Timeline of events if applicable
    8. Citations if any academic references
    9. 3-5 potential questions with answers based on the content

    Return only valid JSON matching this structure:
    {
      "abstract": "string",
      "summary": "string", 
      "keywords": ["string"],
      "entities": {
        "people": ["string"],
        "organizations": ["string"],
        "locations": ["string"],
        "dates": ["string"]
      },
      "sentiment": {
        "overall": "positive|negative|neutral",
        "score": 0.0
      },
      "sections": [
        {
          "title": "string",
          "summary": "string",
          "importance": 0.0
        }
      ],
      "timeline": [
        {
          "date": "string",
          "event": "string"
        }
      ],
      "citations": ["string"],
      "questions": [
        {
          "question": "string",
          "answer": "string"
        }
      ]
    }
    `;

    try {
      console.log('Making API request to Gemini with API key:', this.apiKey.substring(0, 10) + '...');
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 4096,
          }
        }),
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error details:', errorData);
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response structure from Gemini API');
      }
      
      const analysisText = data.candidates[0].content.parts[0].text;
      
      // Clean up the response to extract JSON
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', analysisText);
        throw new Error('Invalid JSON response from Gemini');
      }

      const parsedAnalysis = JSON.parse(jsonMatch[0]);
      console.log('Parsed analysis:', parsedAnalysis);
      
      return parsedAnalysis;
    } catch (error) {
      console.error('Gemini analysis error:', error);
      throw error;
    }
  }

  async askQuestion(question: string, documentContent: string): Promise<string> {
    const prompt = `
    Based on the following document content, answer this question: "${question}"
    
    Document content: ${documentContent}
    
    Provide a clear, concise answer based only on the information in the document.
    `;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Question answering error:', error);
      throw error;
    }
  }
}

export { GeminiService, type DocumentAnalysis };
