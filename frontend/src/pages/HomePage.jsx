import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';

export default function HomePage({
  profile,
  projects,
  skills,
  experience,
  education,
  certifications,
  onSelectProject,
  onNavigate,
  showToast
}) {
  return (
    <main>
      <Hero profile={profile} onNavigate={onNavigate} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} onSelectProject={onSelectProject} onNavigate={onNavigate} />
      <Experience experience={experience} />
      <Education education={education} certifications={certifications} />
      <Contact profile={profile} showToast={showToast} />
    </main>
  );
}
