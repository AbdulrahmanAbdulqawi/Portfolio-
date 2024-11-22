import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Me</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Passionate Software Developer
          </p>
        </div>
        <div className="mt-10">
          <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              I am an enthusiastic and results-driven Software Developer with a strong background in C#, .NET Core, and SQL. 
              My journey in software development has been marked by a commitment to designing and implementing innovative solutions 
              that make a real difference.
            </p>
            <p className="mt-4">
              Currently based in Amersfoort, Netherlands, I bring a global perspective to my work, having studied and worked 
              across different countries. This international experience has enhanced my ability to collaborate in diverse teams 
              and adapt to various working environments.
            </p>
            <p className="mt-4">
              I'm particularly passionate about creating efficient, scalable solutions and staying current with the latest 
              technologies and best practices in software development. My experience ranges from developing microservice 
              applications to implementing complex database solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};