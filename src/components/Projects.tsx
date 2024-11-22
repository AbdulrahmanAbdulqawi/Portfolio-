import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "Student Helper Website",
      description: "Educational platform built with modern web technologies to help students find opportunities abroad and provide online courses.",
      technologies: ["HTML", "CSS", "JavaScript", "Wix"],
      link: "https://student-helper.org"
    },
    {
      title: "Packman Game",
      description: "A classic Packman game developed from scratch using WPF, demonstrating strong object-oriented programming principles.",
      technologies: ["C#", "WPF", "XAML"],
      github: "https://github.com/AbdulrahmanAbdulqawi"
    },
    {
      title: "Employee Registration App",
      description: "Full-stack application with CI/CD pipeline implementation, showcasing modern cloud deployment practices.",
      technologies: ["ASP.NET Core", "Azure", "CI/CD", "SQL"],
      github: "https://github.com/AbdulrahmanAbdulqawi"
    },
    {
      title: "Tobacco Shop Application",
      description: "Multi-layered application demonstrating various architectural patterns and best practices in software development.",
      technologies: ["C#", "Java", "WPF", "ASP.NET Core"],
      github: "https://github.com/AbdulrahmanAbdulqawi"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Projects</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Featured Work
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};