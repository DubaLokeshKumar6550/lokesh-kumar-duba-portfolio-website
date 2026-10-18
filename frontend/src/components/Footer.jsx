import React from 'react';
import { Github, Linkedin } from './Icons';
import { Terminal, Heart, ArrowUp, Mail, Shield } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        paddingTop: '4rem',
        paddingBottom: '3rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {/* Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Terminal size={17} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Duba Lokesh Kumar</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '400px' }}>
              Java Full Stack Developer | Associate Software Engineer. Focused on reliable Spring Boot REST APIs, ACID databases,
              and scalable software architecture.
            </p>
          </div>

          {/* Social & Admin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/DubaLokeshKumar6550"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.825rem' }}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/lokeshkumarduba"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.825rem' }}
            >
              <Linkedin size={16} color="#0077b5" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => onNavigate('admin')}
              className="btn btn-outline"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.825rem' }}
            >
              <Shield size={14} />
              <span>Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="btn btn-secondary"
              style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0 }}
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom copyright & tech details */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Duba Lokesh Kumar. All rights reserved.
          </div>

          <div className="font-mono">
            Stack: Spring Boot 3 • MySQL 8.0 • React JS • Vanilla CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
