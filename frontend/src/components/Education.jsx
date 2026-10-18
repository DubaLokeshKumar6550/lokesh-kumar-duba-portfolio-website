import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2, ShieldCheck, Database, Code, Cpu } from 'lucide-react';

const certIcons = {
  Database: <Database size={24} color="#38bdf8" />,
  Code: <Code size={24} color="#3b82f6" />,
  Cpu: <Cpu size={24} color="#a855f7" />,
  ShieldCheck: <ShieldCheck size={24} color="#10b981" />
};

export default function Education({ education, certifications }) {
  return (
    <section id="education" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <GraduationCap size={14} /> ACADEMIC & CERTIFICATIONS
          </div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Verified Credentials</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Structured engineering training in electronics and computing systems, paired with industry-verified certifications in SQL, Java, and Data Science.
          </p>
        </div>

        {/* Two-Column Grid: Education on Left, Certifications on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Education Column */}
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <GraduationCap size={22} color="var(--accent-cyan)" />
              <span>Academic Degrees</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(education || []).map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="glass-card"
                  style={{ padding: '2rem', borderLeft: '3px solid var(--accent-blue)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span className="badge badge-blue">{edu.period}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {edu.grade}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {edu.degree}
                  </h4>

                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                    {edu.institution}
                  </div>

                  {edu.description && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={22} color="#10b981" />
              <span>Professional Certifications</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(certifications || []).map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {certIcons[cert.badgeIcon] || <Award size={24} color="#38bdf8" />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{cert.issueYear || 'Verified'}</span>
                    </div>
                  </div>

                  <CheckCircle2 size={18} color="#10b981" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
