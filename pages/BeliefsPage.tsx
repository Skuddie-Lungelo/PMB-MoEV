import React, { useState, useEffect } from 'react';
import { WHAT_WE_BELIEVE_TEXT } from '../constants';
import { loadChurchInfo, type ChurchInfo } from '../utils/contentLoader';
import { aiService } from '../services/aiService';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

const BeliefsPage: React.FC = () => {
  const [churchInfo, setChurchInfo] = useState<ChurchInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: 'Hello! I\'m here to help answer any questions you have about Living Hope Church\'s beliefs, programs, or faith in general. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const content = await loadChurchInfo();
      setChurchInfo(content);
      setTimeout(() => setIsLoaded(true), 100);
    };
    loadContent();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const response = await aiService.askQuestion(newMessage);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: response,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: 'I apologize, but I\'m having trouble responding right now. Please feel free to contact our church directly at (555) 123-HOPE for any questions!',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };

  if (!churchInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="loading-spinner w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"></div>
      </div>
    );
  }

  const beliefSections = Object.entries(churchInfo.detailedBeliefs);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className={`section-padding bg-gradient-to-br from-stone-50 to-pink-50 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h1 className="heading-xl gradient-text mb-6">Our Beliefs</h1>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            Discover what we believe and why it matters. Ask our AI assistant any questions about our faith.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-stone-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className={`section-padding transition-all duration-1000 delay-300 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6">Statement of Faith</h2>
          </div>
          
          {beliefSections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {beliefSections.map(([key, belief], index) => (
                <div 
                  key={key}
                  className={`card hover-lift transition-all duration-500`}
                  style={{ 
                    animationDelay: `${(index + 1) * 200}ms`,
                    animation: isLoaded ? 'fadeIn 0.8s ease-out forwards' : undefined
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-stone-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-stone-800">{belief.title}</h3>
                  <p className="text-stone-700 leading-relaxed">{belief.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="card">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-stone-700 leading-relaxed">
                    {WHAT_WE_BELIEVE_TEXT}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI Assistant Chat */}
      <section className={`section-padding bg-stone-50 transition-all duration-1000 delay-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="heading-lg mb-4">Ask Our AI Assistant</h2>
              <p className="text-lg text-stone-600">
                Have questions about our beliefs, church programs, or faith in general? 
                Our AI assistant is here to help!
              </p>
            </div>
            
            <div className="card">
              {/* Chat Messages */}
              <div className="chat-container rounded-lg p-6 h-96 overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`chat-message ${message.type}`}>
                      <p className="text-sm">{message.message}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="chat-message ai">
                      <div className="flex items-center space-x-2">
                        <div className="loading-spinner w-4 h-4 border-2 border-stone-200 border-t-stone-600 rounded-full"></div>
                        <span className="text-sm text-stone-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about our beliefs, programs, or any faith-related questions..."
                  className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !newMessage.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    'Send'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      {churchInfo.frequentlyAskedQuestions && churchInfo.frequentlyAskedQuestions.length > 0 && (
        <section className={`section-padding transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-stone-600">
                Here are some common questions about our church and beliefs
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {churchInfo.frequentlyAskedQuestions.map((faq, index) => (
                <div 
                  key={index}
                  className={`card hover-lift transition-all duration-500`}
                  style={{ 
                    animationDelay: `${(index + 1) * 100}ms`,
                    animation: isLoaded ? 'fadeIn 0.8s ease-out forwards' : undefined
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-stone-800">{faq.question}</h3>
                  <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className={`section-padding bg-gradient-to-r from-pink-500 to-stone-600 text-white transition-all duration-1000 delay-900 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Explore Faith With Us</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Whether you're just beginning to explore faith or looking to deepen your relationship with God, 
            we're here to walk alongside you.
          </p>
          <div className="space-x-4">
            <a href="/visit" className="bg-white text-pink-600 font-medium py-3 px-8 rounded-lg hover:bg-stone-50 transition-colors inline-block">
              Join Us Sunday
            </a>
            <a href="/leadership" className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-pink-600 transition-colors inline-block">
              Meet Our Leaders
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeliefsPage;
