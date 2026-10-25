import React, { useState, useEffect } from 'react';
import { Terminal, Moon, Sun, Shield, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ currentTheme, toggleTheme, onNavigate, activePage }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (activePage === 'home') {
        const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      onNavigate('home', null, id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled
          ? currentTheme === 'dark'
            ? 'rgba(7, 11, 20, 0.88)'
            : 'rgba(248, 250, 252, 0.88)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : 'none',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <div
          onClick={() => handleLinkClick('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
              color: '#fff'
            }}
          >
            <Terminal size={19} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
              Duba Lokesh Kumar
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', letterSpacing: '0.04em' }}
            >
              JAVA FULL STACK DEVELOPER
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activePage === 'home' && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                style={{
                  background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle & Admin Portal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title={currentTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Navy Theme'}
          >
            {currentTheme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#3b82f6" />}
          </button>

          <button
            onClick={() => onNavigate(activePage === 'admin-login' ? 'home' : 'admin')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.95rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              background: activePage === 'admin' || activePage === 'admin-dashboard' ? 'var(--accent-blue)' : 'rgba(56, 189, 248, 0.1)',
              border: '1px solid var(--border-subtle)',
              color: activePage === 'admin' || activePage === 'admin-dashboard' ? '#fff' : 'var(--accent-cyan)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {activePage === 'admin-login' ? (
              <>
                <ArrowUpRight size={14} style={{ transform: 'rotate(-135deg)' }} />
                <span>Public Site</span>
              </>
            ) : (
              <>
                <Shield size={14} />
                <span>Admin</span>
              </>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="mobile-toggle"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              padding: '0.35rem',
              cursor: 'pointer',
              display: 'none'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card-solid)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              style={{
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: '0.65rem 0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: activeSection === link.id ? 'var(--accent-cyan)' : 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
