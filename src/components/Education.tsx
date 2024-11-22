import React from 'react';
import { Award, BookOpen } from 'lucide-react';

export const Education = () => {
  const education = [
    {
      school: "Radboud University",
      location: "Nijmegen",
      degree: "Dutch Language Course",
      period: "Sep, 2023 - Jan, 2024"
    },
    {
      school: "University of Obuda",
      location: "Hungary, Budapest",
      degree: "BSc of Computer Science and Engineering",
      period: "Sep, 2017 - Feb, 2022"
    }
  ];

  const certifications = [
    "Neural Networks and CNN Essential Training",
    "Artificial Intelligence Foundations",
    "C# Advanced Course",
    "Database and SQL Courses",
    "Microsoft Windows Server 2016",
    "CCNA Training"
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Education</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Academic Background
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-900">{edu.school}</h4>
                  <p className="text-indigo-600">{edu.degree}</p>
                  <p className="text-gray-500">{edu.location}</p>
                  <p className="text-gray-500 text-sm mt-2">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <span className="h-2 w-2 bg-indigo-600 rounded-full mr-3"></span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};