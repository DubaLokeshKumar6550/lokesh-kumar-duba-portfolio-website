import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle,
  Terminal,
  Cpu,
  Boxes
} from 'lucide-react';

export default function About({ profile }) {
  const pillars = [
    {
      icon: <Layers size={22} color="#38bdf8" />,
      title: "Layered Architecture",
      desc: "Strict adherence to DAO–Service–Controller layering, decoupling business logic from persistence and controllers for high maintainability."
    },
    {
      icon: <Database size={22} color="#3b82f6" />,
      title: "Database Normalization & Indexing",
      desc: "Certified SQL expertise designing 3NF normalized schemas and applying B-Tree indexes to optimize complex transaction queries."
    },
    {
      icon: <ShieldCheck size={22} color="#10b981" />,
      title: "ACID & Transaction Safety",
      desc: "Engineering atomic database transactions with Hibernate ORM session management to ensure zero financial or data inconsistencies."
    },
    {
      icon: <Boxes size={22} color="#a855f7" />,
      title: "Clean RESTful APIs",
      desc: "Architecting standardized, idempotent REST endpoints verified through comprehensive Postman collections and automated test cases."
    }
  ];

  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Terminal size={14} /> ABOUT ME
          </div>
          <h2 className="section-title">
            Engineering Reliable <span className="gradient-text">Software Systems</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A disciplined approach to enterprise Java full-stack engineering, API design, and performance-tuned databases.
          </p>
        </div>

        {/* Narrative & Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.9fr',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '4rem'
          }}
          className="about-grid"
        >
          {/* Detailed Biography */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Professional Background
            </h3>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              I graduated with a <strong>B.Tech in Electronics & Communication Engineering</strong> from{' '}
              <strong>Mother Teresa Institute of Science & Technology (2021–2025)</strong>, achieving a CGPA of 7.7/10.
              Throughout my engineering studies, I developed a deep analytical foundation in computer architectures, digital systems,
              and programmatic problem-solving.
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              To channel this passion into enterprise software development, I completed rigorous{' '}
              <strong>Java Full Stack Development training and an internship at JSpiders, Hyderabad</strong>. During this
              production-style internship, I engineered end-to-end applications using <strong>Spring Boot</strong>,{' '}
              <strong>Hibernate ORM</strong>, <strong>MySQL</strong>, and <strong>React JS</strong>, participating in Agile/Scrum
              sprints and structured code reviews.
            </p>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              My engineering focus centers on backend development, robust REST API design, relational schema architecture, and SQL query
              optimization. I believe in writing readable, maintainable, and thoroughly tested code that solves real business requirements
              without unnecessary complexity.
            </p>

            {/* Quick Facts Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Hyderabad, India</div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Education</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>B.Tech (ECE)</div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certification</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Infosys SQL Developer</div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Specialization</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Java / Spring Boot</div>
              </div>
            </div>
          </div>

          {/* Education & Internship Highlight Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Internship Card */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Full Stack Development Intern</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>JSpiders, Hyderabad • 2026</div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  'Built REST APIs with Spring Boot and tested reliability via Postman suites',
                  'Integrated React JS front-end components with backend endpoints',
                  'Tuned MySQL queries and applied indexing for faster data retrieval',
                  'Practiced DAO-Service-Controller architecture and Git version control'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={15} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Degree Card */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#818cf8'
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>B.Tech in Electronics & Communication</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Mother Teresa Institute of Science & Technology • 2021–2025
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Completed 4-year degree with CGPA 7.7/10. Solid analytical training in computational mathematics, circuit logic, embedded
                systems, and scalable system design.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy Cards */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.75rem', textAlign: 'center' }}>
            Core Engineering Principles
          </h3>
          <div className="grid-2">
            {pillars.map((p, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ marginBottom: '1rem' }}>{p.icon}</div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
