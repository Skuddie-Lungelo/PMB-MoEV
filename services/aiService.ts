import { GoogleGenerativeAI } from '@google/genai';
import { loadChurchInfo, type ChurchInfo } from '../utils/contentLoader';
import { WHAT_WE_BELIEVE_TEXT } from '../constants';

class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private churchInfo: ChurchInfo | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      console.warn('Gemini API key not found. AI features will be limited.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || 'placeholder');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
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
      const systemPrompt = this.buildSystemPrompt();
      
      const prompt = `${systemPrompt}