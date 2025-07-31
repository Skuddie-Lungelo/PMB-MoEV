import React, { useState, useEffect } from 'react';
import { loadAboutContent, type AboutContent } from '../utils/contentLoader';

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const aboutContent = await loadAboutContent();
      setContent(aboutContent);
      setTimeout(() => setIsLoaded(true), 100);
    };
    loadContent();
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="loading-spinner w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className={`section-padding bg-gradient-to-br from-stone-50 to-pink-50 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h1 className="heading-xl gradient-text mb-6">
            {content.hero.title}
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>
          <p className="text-lg text-stone-700 max-w-4xl mx-auto leading-relaxed">
            {content.hero.description}
          </p>
          <div className="mt-10">
            <a href="#story" className="btn-primary mr-4">
              Learn Our Story
            </a>
            <a href="/visit" className="btn-outline">
              Visit Us
            </a>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className={`section-padding transition-all duration-1000 delay-300 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">{content.story.title}</h2>
              <p className="text-lg text-stone-700 leading-relaxed mb-8">
                {content.story.content}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-stone-600">Founded in Faith</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-stone-600">Grounded in Truth</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-stone-600">Committed to Community</span>
                </div>
              </div>
            </div>
            <div className="hover-lift">
              <div className="bg-gradient-to-br from-pink-100 to-stone-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800">Living Hope</h3>
                  <p className="text-stone-600">Since 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`section-padding bg-stone-50 transition-all duration-1000 delay-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card hover-lift">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="heading-md mb-4">{content.mission.title}</h3>
              <p className="text-stone-700 leading-relaxed">{content.mission.content}</p>
            </div>
            
            <div className="card hover-lift">
              <div className="w-12 h-12 bg-stone-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="heading-md mb-4">{content.vision.title}</h3>
              <p className="text-stone-700 leading-relaxed">{content.vision.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`section-padding transition-all duration-1000 delay-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6">Our Values</h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              These core values guide everything we do as a church community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((value, index) => (
              <div 
                key={index} 
                className={`card hover-lift text-center transition-all duration-300`}
                style={{ 
                  animationDelay: `${(index + 1) * 200}ms`,
                  animation: isLoaded ? 'fadeIn 0.8s ease-out forwards' : undefined
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-stone-800">{value.title}</h3>
                <p className="text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`section-padding bg-gradient-to-r from-pink-500 to-stone-600 text-white transition-all duration-1000 delay-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Join Our Church Family</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            We'd love to welcome you into our community. Come as you are and discover the hope and love found in Jesus Christ.
          </p>
          <div className="space-x-4">
            <a href="/visit" className="bg-white text-pink-600 font-medium py-3 px-8 rounded-lg hover:bg-stone-50 transition-colors inline-block">
              Plan Your Visit
            </a>
            <a href="/beliefs" className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-pink-600 transition-colors inline-block">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
