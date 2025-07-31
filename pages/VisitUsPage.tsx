import React, { useState, useEffect } from 'react';
import { loadContactContent, type ContactContent } from '../utils/contentLoader';

const VisitUsPage: React.FC = () => {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const contactContent = await loadContactContent();
      setContent(contactContent);
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
          <h1 className="heading-xl gradient-text mb-6">Visit Us</h1>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            We can't wait to welcome you! Come as you are and experience the warmth of our church family.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-stone-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Service Times */}
      <section className={`section-padding transition-all duration-1000 delay-300 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Service Times</h2>
            <p className="text-lg text-stone-600">
              Join us for worship, fellowship, and God's Word
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sunday Morning</h3>
              <p className="text-3xl font-bold text-pink-600 mb-2">{content.serviceTime.sunday.morning}</p>
              <p className="text-stone-600">Worship Service</p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sunday Evening</h3>
              <p className="text-3xl font-bold text-stone-600 mb-2">{content.serviceTime.sunday.evening}</p>
              <p className="text-stone-600">Evening Service</p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wednesday</h3>
              <p className="text-3xl font-bold text-pink-600 mb-2">{content.serviceTime.wednesday.prayer}</p>
              <p className="text-stone-600">Prayer Meeting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className={`section-padding bg-stone-50 transition-all duration-1000 delay-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="heading-lg mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Address</h3>
                    <p className="text-stone-700">{content.address.full}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-stone-700">{content.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-stone-700">{content.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                    <div className="text-stone-700 space-y-1">
                      <p>Monday - Friday: {content.officeHours.weekdays}</p>
                      <p>Saturday: {content.officeHours.saturday}</p>
                      <p>Sunday: {content.officeHours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="hover-lift">
              <div className="bg-gradient-to-br from-pink-100 to-stone-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-2">Find Us Here</h3>
                  <p className="text-stone-600">{content.address.full}</p>
                  <a 
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(content.address.full)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary mt-4 inline-block"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className={`section-padding transition-all duration-1000 delay-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">What to Expect</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Your first visit should be comfortable and welcoming. Here's what you can expect when you join us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Warm Welcome</h3>
              <p className="text-stone-600">
                Our friendly greeters will welcome you and help you feel at home from the moment you arrive.
              </p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Come As You Are</h3>
              <p className="text-stone-600">
                No dress code required! Wear whatever makes you comfortable - we're just happy you're here.
              </p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Great for Families</h3>
              <p className="text-stone-600">
                We have excellent children's programs and a nursery available during all services.
              </p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L10.93 8.588z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Practical Teaching</h3>
              <p className="text-stone-600">
                Our messages are biblical, relevant, and designed to help you in your daily walk with Christ.
              </p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fellowship Time</h3>
              <p className="text-stone-600">
                Stay after service for coffee, refreshments, and the opportunity to meet new friends.
              </p>
            </div>
            
            <div className="card hover-lift text-center">
              <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">No Pressure</h3>
              <p className="text-stone-600">
                Feel free to observe and participate as much or as little as you're comfortable with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className={`section-padding bg-gradient-to-r from-pink-500 to-stone-600 text-white transition-all duration-1000 delay-900 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Visit?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            We're excited to meet you! If you have any questions or would like someone to meet you when you arrive, 
            please don't hesitate to reach out.
          </p>
          <div className="space-x-4">
            <a href={`tel:${content.phone}`} className="bg-white text-pink-600 font-medium py-3 px-8 rounded-lg hover:bg-stone-50 transition-colors inline-block">
              Call Us
            </a>
            <a href={`mailto:${content.email}`} className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-pink-600 transition-colors inline-block">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitUsPage;
