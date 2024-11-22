import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export const Experience = () => {
  const experiences = [
    {
      title: "Medior Software Developer",
      company: "DevExperts",
      location: "Netherlands",
      period: "March, 2024 - Present",
      responsibilities: [
        "Developed microservice applications using .NET Core and Angular",
        "Built PDF generation service with .NET Core Web API",
        "Created data synchronization pipeline using .NET Core",
        "Led full-stack development of Product Information Management system"
      ]
    },
    {
      title: "Associate Software Developer",
      company: "SAP",
      location: "Hungary",
      period: "Dec, 2021 - Apr, 2023",
      responsibilities: [
        "Designed and developed core Gigya-SAP components",
        "Worked with C#, TPL and micro-services using virtual actor model",
        "Created and implemented API endpoints",
        "Wrote comprehensive test suites using NUnit and XUnit"
      ]
    },
    {
      title: "Co-founder",
      company: "Student-helper.org",
      location: "Remote",
      period: "Dec, 2020 - Jun, 2022",
      responsibilities: [
        "Led development of student assistance platform",
        "Provided C# training and certification courses",
        "Managed database and SQL course programs",
        "Coordinated international student opportunities"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Experience</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Professional Journey
          </p>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-lg text-indigo-600">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};