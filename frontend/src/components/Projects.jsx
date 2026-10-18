import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { FolderGit2, Search, Filter, Plus, Shield } from 'lucide-react';

export default function Projects({ projects, onSelectProject, onNavigate }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = (projects || []).filter((p) => {
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.technologies || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <FolderGit2 size={14} /> FEATURED WORK
          </div>
          <h2 className="section-title">
            Engineered <span className="gradient-text">Full-Stack Projects</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Production-style systems demonstrating layered backend architecture, Stripe integration, ACID banking transactions,
            and optimized MySQL schemas.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {/* Status Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'COMPLETED', 'IN_PROGRESS', 'PLANNED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterStatus === st ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  background: filterStatus === st ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
                  color: filterStatus === st ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {st === 'ALL' ? 'All Projects' : st === 'IN_PROGRESS' ? 'In Progress' : st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Search Input & Manage Button */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Filter by tech / title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '2.4rem',
                  paddingTop: '0.55rem',
                  paddingBottom: '0.55rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-full)'
                }}
              />
            </div>

            <button
              onClick={() => onNavigate('admin', 'projects')}
              className="btn btn-secondary"
              style={{ padding: '0.55rem 0.95rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              title="Add or edit projects via Admin Dashboard"
            >
              <Plus size={14} />
              <span>Add / Manage</span>
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid-2">
          {filtered.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="glass-card"
            style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--text-muted)' }}
          >
            <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>No projects found matching current criteria.</p>
            <button
              onClick={() => {
                setFilterStatus('ALL');
                setSearchTerm('');
              }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
