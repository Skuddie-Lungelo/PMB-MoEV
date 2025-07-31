import { loadChurchInfo, type ChurchInfo } from '../utils/contentLoader';
import { WHAT_WE_BELIEVE_TEXT } from '../constants';

class AIService {
  private churchInfo: ChurchInfo | null = null;

  constructor() {
    this.loadChurchData();
  }

  private async loadChurchData() {
    try {
      this.churchInfo = await loadChurchInfo();
    } catch (error) {
      console.error('Error loading church data for AI:', error);
    }
  }

  private buildSystemPrompt(): string {
    const churchData = this.churchInfo;
    
    return `You are an AI assistant for Living Hope Church, a warm and welcoming Christian church community. Your role is to help visitors and members learn about the church, its beliefs, programs, and community.

CHURCH INFORMATION:
${churchData ? `
Church Name: ${churchData.churchName}
Founded: ${churchData.founded}
Denomination: ${churchData.denomination}

Pastor's Message: ${churchData.pastorMessage}

Church History: ${churchData.churchHistory}

Ministries:
${churchData.ministries.map(m => `- ${m.name}: ${m.description}`).join('\n')}

Community Involvement:
${churchData.communityInvolvement.map(c => `- ${c.program}: ${c.description}`).join('\n')}

Pastoral Care: ${churchData.pastoralCare}
Small Groups: ${churchData.smallGroups}
` : ''}

STATEMENT OF FAITH:
${WHAT_WE_BELIEVE_TEXT}

${churchData?.detailedBeliefs ? `
DETAILED BELIEFS:
${Object.entries(churchData.detailedBeliefs).map(([key, belief]) => `
${belief.title}:
${belief.content}
`).join('\n')}
` : ''}

${churchData?.frequentlyAskedQuestions ? `
FREQUENTLY ASKED QUESTIONS:
${churchData.frequentlyAskedQuestions.map(faq => `
Q: ${faq.question}
A: ${faq.answer}
`).join('\n')}
` : ''}

GUIDELINES:
1. Always be welcoming, warm, and encouraging in your responses
2. Prioritize information about Living Hope Church when answering questions
3. If asked about specific church programs, events, or services, refer to the information provided above
4. For doctrinal questions, refer to our Statement of Faith and detailed beliefs
5. If you don't have specific information about the church, acknowledge this and offer to help them contact the church directly
6. Be respectful of all faith backgrounds while staying true to our Christian beliefs
7. Encourage visitors to join us for worship and community activities
8. Keep responses conversational and not overly formal
9. If asked about other churches or denominations, be respectful but focus on Living Hope Church

Remember: You represent Living Hope Church, so always maintain a Christ-like attitude of love, grace, and truth.`;
  }

  async askQuestion(question: string): Promise<string> {
    try {
      // For now, we'll use a simple response system since Gemini API might not be available
      const systemPrompt = this.buildSystemPrompt();
      
      // Try to use Gemini if available, otherwise fall back to simple responses
      if (typeof window !== 'undefined' && (window as any).GoogleGenerativeAI) {
        const genAI = new (window as any).GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        
        const prompt = `${systemPrompt}

Human Question: ${question}

Please provide a helpful, warm, and informative response about Living Hope Church or the Christian faith. Keep your response conversational and welcoming.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } else {
        throw new Error('Gemini API not available');
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback responses for common questions
      const fallbackResponses = {
        'service times': 'Our Sunday morning service is at 10:00 AM and evening service at 6:00 PM. We also have prayer meeting on Wednesday at 7:00 PM. We\'d love to have you join us!',
        'location': 'We\'re located at 123 Hope Street, Springfield. Feel free to contact us at (555) 123-HOPE for directions or any questions!',
        'beliefs': 'We believe in the Bible as God\'s Word, the Trinity, salvation through Jesus Christ, and the importance of living out our faith in community. You can learn more about our beliefs on our website or by visiting us!',
        'welcome': 'Welcome to Living Hope Church! We\'re so glad you\'re interested in our church family. We\'d love to meet you and answer any questions you might have.',
        'programs': 'We have wonderful programs for all ages including children\'s ministry, youth ministry, adult Bible studies, worship ministry, and community outreach. Come visit us to learn more!',
        'pastor': 'Our leadership team is committed to serving our congregation with biblical teaching and pastoral care. You can meet our elders and deacons by visiting our Leadership page or joining us for worship.',
        'baptism': 'We practice believer\'s baptism by immersion as a public declaration of faith in Jesus Christ. It\'s an important step of obedience that symbolizes our death to sin and new life in Christ.',
        'membership': 'We believe church membership is about becoming part of our church family. We\'d love to talk with you about what it means to be a member of Living Hope Church. Please contact us or speak with one of our leaders.',
        'small groups': 'Small groups are the heartbeat of our church community. These intimate gatherings provide opportunities for deeper relationships, Bible study, prayer, and mutual support. Groups meet throughout the week in various locations.',
        'children': 'Yes! We have excellent children\'s programs for all ages from nursery through elementary. Our trained volunteers provide age-appropriate lessons and activities while parents attend the main service.'
      };
      
      // Simple keyword matching for fallback
      const lowerQuestion = question.toLowerCase();
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerQuestion.includes(key)) {
          return response;
        }
      }
      
      return "Thank you for your question! I'd love to help answer that for you. Please feel free to contact our church directly at (555) 123-HOPE or info@livinghopechurch.org, and we'll be happy to provide you with more detailed information. We'd also love to have you visit us on Sunday!";
    }
  }

  async isServiceAvailable(): Promise<boolean> {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      return apiKey && apiKey !== 'PLACEHOLDER_API_KEY';
    } catch {
      return false;
    }
  }
}

export const aiService = new AIService();