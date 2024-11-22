import React from 'react';
import { Code, Database, Server, Globe } from 'lucide-react';

export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: ".NET (C#, ASP.NET, WPF)", level: "Expert" },
        { name: "TypeScript/JavaScript", level: "Solid" },
        { name: "HTML/CSS", level: "Solid" },
        { name: "Angular", level: "Solid" }
      ]
    },
    {
      title: "Databases",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "SQL (MySQL, PostgreSQL)", level: "Expert" },
        { name: "Oracle", level: "Solid" },
        { name: "CouchDB", level: "Solid" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "AWS", level: "Solid" },
        { name: "Azure Cloud", level: "Solid" },
        { name: "CI/CD Pipelines", level: "Solid" },
        { name: "Docker", level: "Solid" }
      ]
    },
    {
      title: "Other Technologies",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: "Git (GitHub, GitLab)", level: "Expert" },
        { name: "Agile/Scrum", level: "Solid" },
        { name: "Network Administration", level: "Solid" },
        { name: "Linux/Windows Server", level: "Solid" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Skills</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Technical Expertise
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="text-indigo-600 mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600">{skill.name}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      skill.level === 'Expert' 
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};