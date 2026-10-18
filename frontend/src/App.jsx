import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TechCanvas from './components/TechCanvas';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

import {
  getProfile,
  getProjects,
  getSkills,
  getExperience,
  getEducation,
  getCertifications,
  isAuthenticated
} from './services/api';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark';
  });

  const [activeRoute, setActiveRoute] = useState({ page: 'home', param: null });
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3500);
  };

  // Initial Data Fetch
  const loadPortfolioData = async () => {
    try {
      const [prof, projs, sks, exp, edu, certs] = await Promise.all([
        getProfile(),
        getProjects(),
        getSkills(),
        getExperience(),
        getEducation(),
        getCertifications()
      ]);

      if (prof) setProfile(prof);
      if (projs) setProjects(projs);
      if (sks) setSkills(sks);
      if (exp) setExperience(exp);
      if (edu) setEducation(edu);
      if (certs) setCertifications(certs);
    } catch (e) {
      console.error('Error loading data:', e);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Handle browser URL routing & popstate
  const syncRouteFromUrl = () => {
    const path = window.location.pathname;

    if (path === '/' || path === '') {
      setActiveRoute({ page: 'home', param: null });
    } else if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '').replace(/\/$/, '');
      setActiveRoute({ page: 'project-detail', param: slug });
    } else if (path === '/admin') {
      if (isAuthenticated()) {
        setActiveRoute({ page: 'admin-dashboard', param: null });
      } else {
        setActiveRoute({ page: 'admin-login', param: null });
      }
    } else if (path === '/login') {
      setActiveRoute({ page: 'admin-login', param: null });
    } else {
      setActiveRoute({ page: '404', param: null });
    }
  };

  useEffect(() => {
    syncRouteFromUrl();
    window.addEventListener('popstate', syncRouteFromUrl);
    return () => window.removeEventListener('popstate', syncRouteFromUrl);
  }, []);

  const navigateTo = (page, param = null, scrollTarget = null) => {
    let url = '/';
    if (page === 'project-detail') {
      url = `/projects/${param}`;
    } else if (page === 'admin') {
      url = '/admin';
      page = isAuthenticated() ? 'admin-dashboard' : 'admin-login';
    } else if (page === 'admin-dashboard') {
      url = '/admin';
    } else if (page === 'admin-login') {
      url = '/login';
    }

    window.history.pushState({}, '', url);
    setActiveRoute({ page, param });

    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProject = (slugOrId) => {
    navigateTo('project-detail', slugOrId);
  };

  // Find active project for detail page
  const activeProject =
    activeRoute.page === 'project-detail'
      ? (projects || []).find((p) => p.slug === activeRoute.param || String(p.id) === String(activeRoute.param))
      : null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Background canvas */}
      <TechCanvas />

      {/* Navbar */}
      <Navbar
        currentTheme={theme}
        toggleTheme={toggleTheme}
        onNavigate={navigateTo}
        activePage={activeRoute.page}
      />

      {/* Main Page Views */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {activeRoute.page === 'home' && (
          <HomePage
            profile={profile}
            projects={projects}
            skills={skills}
            experience={experience}
            education={education}
            certifications={certifications}
            onSelectProject={handleSelectProject}
            onNavigate={navigateTo}
            showToast={showToast}
          />
        )}

        {activeRoute.page === 'project-detail' && (
          <ProjectDetailPage
            project={activeProject}
            allProjects={projects}
            onBack={() => navigateTo('home', null, 'projects')}
            onSelectProject={handleSelectProject}
          />
        )}

        {activeRoute.page === 'admin-login' && (
          <AdminLoginPage
            onLoginSuccess={() => navigateTo('admin-dashboard')}
            onBackToPortfolio={() => navigateTo('home')}
            showToast={showToast}
          />
        )}

        {activeRoute.page === 'admin-dashboard' && (
          <AdminDashboardPage
            profile={profile}
            projects={projects}
            skills={skills}
            experience={experience}
            education={education}
            certifications={certifications}
            onRefreshData={loadPortfolioData}
            onBackToPortfolio={() => navigateTo('home')}
            showToast={showToast}
          />
        )}

        {activeRoute.page === '404' && (
          <NotFoundPage onGoHome={() => navigateTo('home')} />
        )}
      </div>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Toast Alert */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
