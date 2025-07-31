import React, { useState, useEffect } from 'react';
import { LEADERSHIP_PROFILES } from '../constants';
import type { LeadershipProfile } from '../types';

const LeadershipPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const eldershipTeam = LEADERSHIP_PROFILES.filter(member => member.role === 'Eldership');
  const deaconsTeam = LEADERSHIP_PROFILES.filter(member => member.role === 'Deacons');

  const ProfileCard: React.FC<{ profile: LeadershipProfile; index: number }> = ({ profile, index }) => (
    <div 
      className={`card hover-lift text-center transition-all duration-500`}
      style={{ 
        animationDelay: `${(index + 1) * 150}ms`,
        animation: isLoaded ? 'fadeIn 0.8s ease-out forwards' : undefined
      }}
    >
      <div className="relative mb-6">
        <img 
          src={profile.imageUrl} 
          alt={profile.name}
          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-pink-200 hover:border-pink-400 transition-colors duration-300"
          loading="lazy"
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {profile.role}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-stone-800">{profile.name}</h3>
      <p className="text-stone-600 mb-4">
        {profile.role === 'Eldership' 
          ? 'Providing spiritual oversight and guidance to our church family' 
          : 'Serving our community with dedication and love'
        }
      </p>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className={`section-padding bg-gradient-to-br from-stone-50 to-pink-50 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h1 className="heading-xl gradient-text mb-6">Our Leadership</h1>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            Meet the dedicated individuals who serve and guide our church community with wisdom, love, and faith.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-stone-600 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Eldership Section */}
      <section className={`section-padding transition-all duration-1000 delay-300 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Eldership Team</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Our elders provide spiritual leadership, oversight, and pastoral care to our congregation. 
              They are committed to teaching God's Word and shepherding our church family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eldershipTeam.map((member, index) => (
              <ProfileCard key={member.name} profile={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Deacons Section */}
      <section className={`section-padding bg-stone-50 transition-all duration-1000 delay-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Deacons Team</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Our deacons serve alongside the elders, focusing on the practical needs of our congregation 
              and ensuring that our church operates smoothly and efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deaconsTeam.map((member, index) => (
              <ProfileCard key={member.name} profile={member} index={index + eldershipTeam.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className={`section-padding transition-all duration-1000 delay-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">Our Leadership Philosophy</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Servant Leadership</h3>
                    <p className="text-stone-600">
                      Following Christ's example, our leaders serve with humility and put the needs of others first.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Biblical Foundation</h3>
                    <p className="text-stone-600">
                      All leadership decisions are grounded in Scripture and guided by prayer and the Holy Spirit.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Collaborative Care</h3>
                    <p className="text-stone-600">
                      Our leadership team works together to provide comprehensive care and guidance for our church family.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hover-lift">
              <div className="bg-gradient-to-br from-pink-100 to-stone-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-800">United in Purpose</h3>
                  <p className="text-stone-600">Leading with love and wisdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className={`section-padding bg-gradient-to-r from-pink-500 to-stone-600 text-white transition-all duration-1000 delay-900 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Connect with Our Leadership</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Our leaders are here to serve and support you. Whether you have questions, need prayer, 
            or would like to get more involved, we'd love to hear from you.
          </p>
          <div className="space-x-4">
            <a href="/visit" className="bg-white text-pink-600 font-medium py-3 px-8 rounded-lg hover:bg-stone-50 transition-colors inline-block">
              Schedule a Meeting
            </a>
            <a href="mailto:leadership@livinghopechurch.org" className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-pink-600 transition-colors inline-block">
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
