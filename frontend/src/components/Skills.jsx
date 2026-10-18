import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Database,
  Layers,
  Server,
  Globe,
  HardDrive,
  FileCode,
  LayoutGrid,
  Boxes,
  Package,
  Atom,
  Layout,
  Palette,
  Table,
  Zap,
  Key,
  Network,
  GitBranch,
  Send,
  Monitor,
  ShieldCheck,
  Users,
  Cloud,
  CloudRain,
  Search,
  Sparkles
} from 'lucide-react';

const iconMap = {
  Code: <Code size={18} />,
  Terminal: <Terminal size={18} />,
  Database: <Database size={18} />,
  Layers: <Layers size={18} />,
  Server: <Server size={18} />,
  Globe: <Globe size={18} />,
  HardDrive: <HardDrive size={18} />,
  FileCode: <FileCode size={18} />,
  LayoutGrid: <LayoutGrid size={18} />,
  Boxes: <Boxes size={18} />,
  Package: <Package size={18} />,
  Atom: <Atom size={18} />,
  Layout: <Layout size={18} />,
  Palette: <Palette size={18} />,
  Table: <Table size={18} />,
  Zap: <Zap size={18} />,
  Key: <Key size={18} />,
  Network: <Network size={18} />,
  GitBranch: <GitBranch size={18} />,
  Send: <Send size={18} />,
  Monitor: <Monitor size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  Users: <Users size={18} />,
  Cloud: <Cloud size={18} />,
  CloudRain: <CloudRain size={18} />
};

export default function Skills({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Programming Languages',
    'Backend Development',
    'Databases',
    'Frontend Development',
    'Tools & Practices',
    'Cloud'
  ];

  const filteredSkills = (skills || []).filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getLevelBadgeClass = (level) => {
    if (level === 'Core Strength') return 'badge-cyan';
    if (level === 'Certified Specialist') return 'badge-emerald';
    if (level === 'Proficient') return 'badge-blue';
    return 'badge-amber';
  };

  return (
    <section id="skills" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Sparkles size={14} /> TECHNICAL EXPERTISE
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A comprehensive, verified technical toolkit developed through rigorous engineering coursework, JSpiders full-stack
            internship, and production-style projects.
          </p>
        </div>

        {/* Filter Controls: Category Tabs & Search Input */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search skills (e.g. Spring, SQL, React)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                  background: selectedCategory === cat ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card"
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: skill.highlight ? '3px solid var(--accent-cyan)' : '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  {iconMap[skill.icon] || <Code size={18} />}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {skill.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {skill.category}
                  </div>
                </div>
              </div>

              <div>
                <span className={`badge ${getLevelBadgeClass(skill.level)}`}>
                  {skill.level || 'Proficient'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No skills found matching "{searchTerm}".
          </div>
        )}
      </div>
    </section>
  );
}
