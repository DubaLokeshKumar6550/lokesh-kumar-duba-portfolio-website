import React, { useEffect } from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import { Github } from '../components/Icons';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TestTube2,
  Calendar,
  Layers,
  Sparkles,
  Database,
  Server,
  Code2
} from 'lucide-react';

export default function ProjectDetailPage({ project, allProjects, onBack, onSelectProject }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  if (!project) {
    return (
      <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Project Not Found</h2>
        <button onClick={onBack} className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Projects
        </button>
      </div>
    );
  }

  const techList = (project.technologies || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const featureList = (project.features || '')
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean);

  const related = (allProjects || []).filter((p) => p.slug !== project.slug);

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '6rem', position: 'relative' }}>
      <div className="container">
        {/* Breadcrumb Back Button */}
        <button
          onClick={onBack}
          className="btn btn-secondary"
          style={{ marginBottom: '2rem', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Projects</span>
        </button>

        {/* Project Header Banner */}
        <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span
              className={`badge ${
                project.status === 'COMPLETED'
                  ? 'badge-emerald'
                  : project.status === 'IN_PROGRESS'
                  ? 'badge-cyan'
                  : 'badge-amber'
              }`}
            >
              {project.status || 'Completed'}
            </span>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
              DAO–Service–Controller Architecture
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
              color: 'var(--text-primary)'
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: 'var(--accent-cyan)',
              maxWidth: '850px',
              marginBottom: '1.75rem',
              fontWeight: 500
            }}
          >
            {project.tagline || project.description}
          </p>

          {/* Technology Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {techList.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: 'var(--text-primary)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links Row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github size={18} />
                <span>View Source Code</span>
              </a>
            ) : (
              <button
                disabled
                className="btn btn-secondary"
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                title="Code repository available upon request"
              >
                <Github size={18} />
                <span>GitHub (Private/Available on Request)</span>
              </button>
            )}

            {project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} />
                <span>Live Demonstration</span>
              </a>
            ) : (
              <button
                disabled
                className="btn btn-outline"
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                title="Live deployment can be scheduled for interview demo"
              >
                <ExternalLink size={18} />
                <span>Demo (Available on Local / Interview)</span>
              </button>
            )}
          </div>
        </div>

        {/* Two-Column Technical Details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '3rem'
          }}
          className="detail-grid"
        >
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Problem & Solution */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <AlertTriangle size={20} color="#f59e0b" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Problem Statement</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
                {project.problemStatement}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Lightbulb size={20} color="#10b981" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Engineered Solution</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {project.solution}
              </p>
            </div>

            {/* Architecture Flowchart & Technical Specification */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                System Architecture & Workflow
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                {project.architectureOverview}
              </p>

              {/* Interactive Architecture Component */}
              <ArchitectureDiagram project={project} />
            </div>

            {/* Challenges & How Solved */}
            {project.challenges && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: '#f43f5e' }}>
                  Technical Challenges & Key Lessons
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.challenges.split('\n').filter(Boolean).map((ch, idx) => {
                    const [title, ...rest] = ch.split(':');
                    return (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.1rem'
                        }}
                      >
                        <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>{title}:</strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginLeft: '0.4rem' }}>
                          {rest.join(':')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Key Features List */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Key Technical Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {featureList.map((f, i) => {
                  const [fTitle, ...fDesc] = f.split(':');
                  return (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <div style={{ fontSize: '0.875rem', lineHeight: 1.55 }}>
                        {fDesc.length > 0 ? (
                          <>
                            <strong style={{ color: 'var(--text-primary)' }}>{fTitle}:</strong>
                            <span style={{ color: 'var(--text-secondary)' }}> {fDesc.join(':')}</span>
                          </>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Testing & Verification */}
            {project.testing && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <TestTube2 size={18} color="var(--accent-cyan)" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Testing & Quality Assurance</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                  {project.testing}
                </p>
              </div>
            )}

            {/* Future Improvements */}
            {project.futureImprovements && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <Sparkles size={18} color="#c084fc" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Future Roadmap</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>
                  {project.futureImprovements}
                </p>
              </div>
            )}

            {/* Related Projects Navigation */}
            {related.length > 0 && (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Other Engineered Projects
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {related.map((rp) => (
                    <div
                      key={rp.id}
                      onClick={() => onSelectProject(rp.slug)}
                      style={{
                        padding: '0.85rem',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {rp.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {rp.technologies?.split(',').slice(0, 3).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
