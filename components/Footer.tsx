import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadContactContent, type ContactContent } from '../utils/contentLoader';

const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const content = await loadContactContent();
      setContactInfo(content);
    };
    loadContent();
  }, []);

  if (!contactInfo) {
    return (
      <footer className="bg-stone-800 text-white section-padding">
        <div className="container-custom text-center">
          <p>Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-stone-800 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-stone-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LH</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Living Hope</h3>
                <p className="text-stone-400 -mt-1">Church</p>
              </div>
            </div>
            <p className="text-stone-300">
              A community of faith, hope, and love in the heart of our city.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-stone-300 hover:text-pink-400 transition-colors">
                About Us
              </Link>
              <Link to="/leadership" className="text-stone-300 hover:text-pink-400 transition-colors">
                Leadership
              </Link>
              <Link to="/beliefs" className="text-stone-300 hover:text-pink-400 transition-colors">
                Our Beliefs
              </Link>
              <Link to="/visit" className="text-stone-300 hover:text-pink-400 transition-colors">
                Visit Us
              </Link>
            </nav>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Service Times</h4>
            <div className="space-y-2 text-stone-300">
              <div>
                <p className="font-medium">Sunday Morning</p>
                <p>{contactInfo.serviceTime.sunday.morning}</p>
              </div>
              <div>
                <p className="font-medium">Sunday Evening</p>
                <p>{contactInfo.serviceTime.sunday.evening}</p>
              </div>
              <div>
                <p className="font-medium">Wednesday Prayer</p>
                <p>{contactInfo.serviceTime.wednesday.prayer}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3 text-stone-300">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-0.5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p>{contactInfo.address.full}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <p>{contactInfo.phone}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>{contactInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-stone-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <a 
                href={`https://${contactInfo.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-pink-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={`https://instagram.com/${contactInfo.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.281C3.85 14.977 3.017 13.116 3.017 11.987c0-2.312 1.875-4.186 4.186-4.186s4.186 1.874 4.186 4.186c0 2.312-1.875 4.186-4.186 4.186zm7.718-9.626H6.835v9.626h9.332V7.362z"/>
                </svg>
              </a>
              <a 
                href={`https://${contactInfo.socialMedia.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-pink-400 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <p className="text-stone-400 text-sm">
              © 2024 Living Hope Church. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;