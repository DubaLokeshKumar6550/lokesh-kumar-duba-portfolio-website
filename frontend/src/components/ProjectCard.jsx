import React from 'react';
import { Github } from './Icons';
import {
  ExternalLink,
  ArrowRight,
  Layers,
  Database,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ProjectCard({ project, onSelectProject }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="badge badge-emerald"><CheckCircle2 size={12} /> Completed</span>;
      case 'IN_PROGRESS':
        return <span className="badge badge-cyan"><Clock size={12} /> In Progress</span>;
      case 'PLANNED':
      default:
        return <span className="badge badge-amber"><Calendar size={12} /> Planned</span>;
    }
  };

  const techList = (project.technologies || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div
      className="glass-card"
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div>
        {/* Top Meta: Status and Architecture tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          {getStatusBadge(project.status)}
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            DAO–Service–Controller
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            marginBottom: '0.65rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--accent-cyan)',
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: '1rem'
          }}
        >
          {project.tagline || project.description?.slice(0, 110)}
        </p>

        {/* Description snippet */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '1.5rem'
          }}
        >
          {project.description}
        </p>

        {/* Technology Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
          {techList.slice(0, 6).map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.725rem',
                fontWeight: 600,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.18)',
                color: 'var(--text-secondary)'
              }}
            >
              {tech}
            </span>
          ))}
          {techList.length > 6 && (
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              +{techList.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div
        style={{
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <button
          onClick={() => onSelectProject(project.slug || project.id)}
          className="btn btn-primary"
          style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
        >
          <span>Architecture & Details</span>
          <ArrowRight size={15} />
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {/* GitHub link with availability check */}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="btn btn-outline"
              style={{ padding: '0.5rem', borderRadius: '50%', width: '36px', height: '36px' }}
              title="View GitHub Repository"
            >
              <Github size={16} />
            </a>
          ) : (
            <button
              disabled
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'not-allowed',
                opacity: 0.5
              }}
              title="GitHub repo available upon request / pending publish"
            >
              <Github size={16} />
            </button>
          )}

          {/* Live demo link with availability check */}
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              className="btn btn-outline"
              style={{ padding: '0.5rem', borderRadius: '50%', width: '36px', height: '36px' }}
              title="Open Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          ) : (
            <button
              disabled
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'not-allowed',
                opacity: 0.5
              }}
              title="Live Demo currently unavailable"
            >
              <ExternalLink size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
