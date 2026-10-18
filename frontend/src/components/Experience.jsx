import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Terminal, Layers } from 'lucide-react';

export default function Experience({ experience }) {
  return (
    <section id="experience" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Briefcase size={14} /> WORK EXPERIENCE
          </div>
          <h2 className="section-title">
            Internship & <span className="gradient-text">Practical Experience</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Hands-on full-stack development experience building enterprise APIs, connecting responsive front ends, and tuning database performance.
          </p>
        </div>

        {/* Experience Timeline */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          {(experience || []).map((exp, idx) => {
            const highlightsList = (exp.highlights || '')
              .split('\n')
              .map((h) => h.trim())
              .filter(Boolean);

            const skillsList = (exp.skillsUsed || '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);

            return (
              <div
                key={exp.id || idx}
                className="glass-card"
                style={{
                  padding: '2.5rem',
                  position: 'relative',
                  borderLeft: '4px solid var(--accent-cyan)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {exp.role}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.825rem',
                      color: 'var(--accent-cyan)',
                      fontWeight: 600
                    }}
                  >
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    flexWrap: 'wrap',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '1.25rem'
                  }}
                >
                  <span style={{ color: 'var(--accent-blue)' }}>{exp.company}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                    <MapPin size={14} /> {exp.location}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  {exp.description}
                </p>

                {/* Highlights List */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    Key Contributions & Engineering Impact:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {highlightsList.map((hl, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.65rem',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6
                        }}
                      >
                        <CheckCircle size={16} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Practiced */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {skillsList.map((skill, i) => (
                    <span
                      key={i}
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
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
