import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Hi, I'm</span>
            <span className="block text-indigo-600">Abdulrahman Abdulqawi</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Software Developer specializing in C#, .NET Core, and SQL. Building innovative solutions with modern technologies.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/AbdulrahmanAbdulqawi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <Github className="h-8 w-8" />
              </a>
              <a
                href="https://linkedin.com/in/abdulrahman-abdulqawi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a
                href="mailto:abdulrahmanabdulqawi76@gmail.com"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <Mail className="h-8 w-8" />
              </a>
              <a
                href="tel:+31687269021"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <Phone className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};