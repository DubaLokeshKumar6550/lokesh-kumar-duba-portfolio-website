import React from 'react';
import {
  Download,
  FolderGit2,
  Send,
  MapPin,
  CheckCircle2,
  Sparkles,
  Server,
  Database,
  Code2,
  ShieldCheck
} from 'lucide-react';

export default function Hero({ profile, onNavigate }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '5rem',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background glow orbs */}
      <div
        className="glow-orb"
        style={{
          top: '15%',
          left: '10%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(59, 130, 246, 0.05) 70%)'
        }}
      />
      <div
        className="glow-orb"
        style={{
          bottom: '10%',
          right: '8%',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(14, 165, 233, 0.02) 70%)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.9fr',
            gap: '4rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Intro & Calls to Action */}
          <div>
            {/* Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                marginBottom: '1.5rem'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
              />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                Available for Full-Time Roles
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={13} /> {profile?.location || 'Hyderabad, India'}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.2vw, 3.85rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}
            >
              Hi, I'm <span className="gradient-text">{profile?.name || 'Duba Lokesh Kumar'}</span>
            </h1>

            {/* Subtitle / Role */}
            <h2
              style={{
                fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap'
              }}
            >
              <span>{profile?.headline || 'Java Full Stack Developer | Associate Software Engineer'}</span>
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: '620px',
                marginBottom: '2.25rem'
              }}
            >
              {profile?.summary ||
                'Passionate about developing maintainable backend applications, robust REST APIs, ACID database-driven systems, and responsive user interfaces. Experienced in Spring Boot microservices, Hibernate ORM, and high-performance MySQL query optimization.'}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button onClick={() => handleScrollTo('projects')} className="btn btn-primary">
                <FolderGit2 size={18} />
                <span>View Projects</span>
              </button>

              <a
                href={profile?.resumeUrl || '/Duba_Lokesh_Kumar_Resume.pdf'}
                download="Duba_Lokesh_Kumar_Resume.pdf"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </a>

              <button onClick={() => handleScrollTo('contact')} className="btn btn-outline">
                <Send size={16} />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Tech Badges Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                flexWrap: 'wrap',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Primary Stack:
              </span>
              {['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST APIs', 'React JS', 'Microservices'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Profile Photo with Modern Holographic / Glow Frame */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '320px',
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Outer Animated Glow Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.45), rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.4))',
                  filter: 'blur(14px)',
                  opacity: 0.8
                }}
              />

              {/* Orbiting Border Accent */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(56, 189, 248, 0.5)',
                  animation: 'spin 30s linear infinite'
                }}
              />

              {/* Photo Container */}
              <div
                style={{
                  position: 'relative',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid rgba(15, 23, 42, 0.9)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)',
                  backgroundColor: '#0f172a'
                }}
              >
                <img
                  src={profile?.photoUrl || '/lokesh-photo.jpg'}
                  alt="Duba Lokesh Kumar - Professional Portrait"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/profile-alt.png';
                  }}
                />
              </div>

              {/* Floating Badge 1: Backend Architecture */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '-20px',
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  <Server size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Focus</div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>Spring Boot & REST</div>
                </div>
              </div>

              {/* Floating Badge 2: SQL Certified */}
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '-15px',
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981'
                  }}
                >
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Certified</div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>Infosys SQL Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
