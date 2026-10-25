import React, { useState, useEffect, useRef } from 'react';
import { Github } from '../components/Icons';
import {
  checkBackendHealth,
  createProject,
  updateProject,
  deleteProject,
  createSkill,
  updateSkill,
  deleteSkill,
  updateProfile,
  updateExperience,
  getAdminMessages,
  markMessageRead,
  deleteMessage,
  logoutAdmin,
  uploadFile
} from '../services/api';
import {
  FolderGit2,
  Cpu,
  User,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Shield,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  LogOut,
  RefreshCw,
  Database,
  ArrowLeft,
  AlertTriangle,
  Server,
  Layers,
  Sparkles,
  CheckCircle2,
  FileText,
  Download,
  Image as ImageIcon,
  FolderOpen,
  Camera
} from 'lucide-react';

export default function AdminDashboardPage({
  profile,
  projects,
  skills,
  experience,
  education,
  certifications,
  onRefreshData,
  onBackToPortfolio,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('projects');
  const [backendStatus, setBackendStatus] = useState({ isOnline: false, info: 'Checking...' });
  const [messages, setMessages] = useState([]);

  // Project Modal State
  const [editingProject, setEditingProject] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Skill Modal State
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillModalOpen, setSkillModalOpen] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({ ...profile });
  const photoInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handlePhotoFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }

    setUploadingPhoto(true);
    const localPreview = URL.createObjectURL(file);
    setProfileForm((prev) => ({ ...prev, photoUrl: localPreview }));

    try {
      const res = await uploadFile(file, 'photo');
      if (res && res.success) {
        setProfileForm((prev) => ({ ...prev, photoUrl: res.data.url }));
        if (showToast) showToast('Profile photo updated successfully from File Explorer!');
        onRefreshData();
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setProfileForm((prev) => ({ ...prev, photoUrl: ev.target.result }));
        };
        reader.readAsDataURL(file);
        if (showToast) showToast('Photo loaded from File Explorer! Click "Save & Publish" to commit.');
      }
    } catch (err) {
      console.error('Photo upload error:', err);
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  const handleResumeFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Please select a PDF file (.pdf)');
      return;
    }

    setUploadingResume(true);
    try {
      const res = await uploadFile(file, 'resume');
      if (res && res.success) {
        setProfileForm((prev) => ({ ...prev, resumeUrl: res.data.url }));
        if (showToast) showToast(`Resume "${file.name}" updated successfully from File Explorer!`);
        onRefreshData();
      } else {
        setProfileForm((prev) => ({ ...prev, resumeUrl: `/${file.name}` }));
        if (showToast) showToast(`Resume set to /${file.name}. Click "Save & Publish" to commit.`);
      }
    } catch (err) {
      console.error('Resume upload error:', err);
    } finally {
      setUploadingResume(false);
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    }
  };

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    problemStatement: '',
    solution: '',
    architectureOverview: '',
    architectureDiagram: '',
    technologies: '',
    features: '',
    challenges: '',
    testing: '',
    futureImprovements: '',
    githubUrl: '',
    liveDemoUrl: '',
    imageUrl: '',
    status: 'COMPLETED',
    displayOrder: 1,
    featured: true
  });

  // Skill Form State
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Programming Languages',
    level: 'Core Strength',
    icon: 'Code',
    displayOrder: 1,
    highlight: false
  });

  // Check health and load messages on mount
  useEffect(() => {
    checkHealth();
    loadMessages();
    if (profile) setProfileForm({ ...profile });
  }, [profile]);

  const checkHealth = async () => {
    const res = await checkBackendHealth();
    if (res.isOnline) {
      setBackendStatus({
        isOnline: true,
        info: res.data?.database || 'Spring Boot 3 + MySQL 8.0 connected'
      });
    } else {
      setBackendStatus({
        isOnline: false,
        info: 'Standalone Local Cache Sync (Spring Boot backend offline)'
      });
    }
  };

  const loadMessages = async () => {
    try {
      const msgs = await getAdminMessages();
      setMessages(msgs || []);
    } catch (e) { }
  };

  const handleLogout = () => {
    logoutAdmin();
    if (showToast) showToast('Logged out of Admin Portal');
    onBackToPortfolio();
  };

  // --- Projects Handlers ---
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      slug: '',
      tagline: '',
      description: '',
      problemStatement: '',
      solution: '',
      architectureOverview: '',
      architectureDiagram: '',
      technologies: '',
      features: '',
      challenges: '',
      testing: '',
      futureImprovements: '',
      githubUrl: '',
      liveDemoUrl: '',
      imageUrl: '',
      status: 'IN_PROGRESS',
      displayOrder: (projects?.length || 0) + 1,
      featured: false
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      slug: proj.slug || '',
      tagline: proj.tagline || '',
      description: proj.description || '',
      problemStatement: proj.problemStatement || '',
      solution: proj.solution || '',
      architectureOverview: proj.architectureOverview || '',
      architectureDiagram: proj.architectureDiagram || '',
      technologies: proj.technologies || '',
      features: proj.features || '',
      challenges: proj.challenges || '',
      testing: proj.testing || '',
      futureImprovements: proj.futureImprovements || '',
      githubUrl: proj.githubUrl || '',
      liveDemoUrl: proj.liveDemoUrl || '',
      imageUrl: proj.imageUrl || '',
      status: proj.status || 'COMPLETED',
      displayOrder: proj.displayOrder || 1,
      featured: !!proj.featured
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Project Title is required');
      return;
    }

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectForm);
        if (showToast) showToast(`Project "${projectForm.title}" updated successfully!`);
      } else {
        await createProject(projectForm);
        if (showToast) showToast(`New project "${projectForm.title}" added to portfolio!`);
      }
      setProjectModalOpen(false);
      onRefreshData();
    } catch (err) {
      alert('Error saving project: ' + err.message);
    }
  };

  const handleConfirmDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id);
      if (showToast) showToast(`Project deleted successfully`);
      setProjectToDelete(null);
      onRefreshData();
    } catch (err) {
      alert('Error deleting project');
    }
  };

  // --- Skills Handlers ---
  const handleOpenAddSkill = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: 'Programming Languages',
      level: 'Proficient',
      icon: 'Code',
      displayOrder: (skills?.length || 0) + 1,
      highlight: false
    });
    setSkillModalOpen(true);
  };

  const handleOpenEditSkill = (sk) => {
    setEditingSkill(sk);
    setSkillForm({
      name: sk.name || '',
      category: sk.category || 'Programming Languages',
      level: sk.level || 'Proficient',
      icon: sk.icon || 'Code',
      displayOrder: sk.displayOrder || 1,
      highlight: !!sk.highlight
    });
    setSkillModalOpen(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    try {
      if (editingSkill) {
        await updateSkill(editingSkill.id, skillForm);
        if (showToast) showToast(`Skill "${skillForm.name}" updated!`);
      } else {
        await createSkill(skillForm);
        if (showToast) showToast(`Skill "${skillForm.name}" added!`);
      }
      setSkillModalOpen(false);
      onRefreshData();
    } catch (err) {
      alert('Error saving skill');
    }
  };

  const handleDeleteSkill = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete skill "${name}"?`)) {
      await deleteSkill(id);
      if (showToast) showToast(`Skill "${name}" deleted`);
      onRefreshData();
    }
  };

  // --- Profile Handler ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      if (showToast) showToast('Profile details updated and published!');
      onRefreshData();
    } catch (err) {
      alert('Error saving profile');
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '6.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Shield size={20} />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Admin Content Management</h1>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Logged in as Portfolio Administrator • All modifications update the live public site.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={onBackToPortfolio} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
              <ArrowLeft size={16} />
              <span>View Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fb7185' }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Database & System Status Card */}
        <div
          className="glass-card"
          style={{
            padding: '1.25rem 1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            borderLeft: backendStatus.isOnline ? '4px solid #10b981' : '4px solid #f59e0b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: backendStatus.isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: backendStatus.isOnline ? '#10b981' : '#fbbf24'
              }}
            >
              <Database size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: backendStatus.isOnline ? '#10b981' : '#fbbf24',
                    boxShadow: backendStatus.isOnline ? '0 0 8px #10b981' : 'none'
                  }}
                />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  {backendStatus.isOnline
                    ? 'Backend Connected (Spring Boot + MySQL)'
                    : 'Local Cache Mode (Backend Offline)'}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {backendStatus.info}
              </div>
            </div>
          </div>

          <button
            onClick={checkHealth}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
          >
            <RefreshCw size={14} />
            <span>Test Connection</span>
          </button>
        </div>

        {/* Dashboard Tabs Header */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}
        >
          {[
            { id: 'projects', label: 'Projects & Work', icon: <FolderGit2 size={16} /> },
            { id: 'skills', label: 'Technical Skills', icon: <Cpu size={16} /> },
            { id: 'profile', label: 'Profile & Bio', icon: <User size={16} /> },
            { id: 'messages', label: `Inquiries Inbox (${messages.length})`, icon: <MessageSquare size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                background: activeTab === tab.id ? 'var(--bg-card-solid)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-cyan)' : 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Featured Projects ({projects?.length || 0})</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Manage existing project details or publish new projects (e.g. Student Management, Hospital System).
                </p>
              </div>

              <button onClick={handleOpenAddProject} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(projects || []).map((proj) => (
                <div
                  key={proj.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{proj.title}</h3>
                      <span
                        className={`badge ${proj.status === 'COMPLETED'
                            ? 'badge-emerald'
                            : proj.status === 'IN_PROGRESS'
                              ? 'badge-cyan'
                              : 'badge-amber'
                          }`}
                      >
                        {proj.status}
                      </span>
                      {proj.featured && <span className="badge badge-blue">Featured</span>}
                    </div>

                    <p style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      {proj.tagline || proj.description?.slice(0, 90)}
                    </p>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Tech: {proj.technologies}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleOpenEditProject(proj)}
                      className="btn btn-secondary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setProjectToDelete(proj)}
                      className="btn btn-outline"
                      style={{
                        padding: '0.45rem 0.85rem',
                        fontSize: '0.8rem',
                        borderColor: 'rgba(244, 63, 94, 0.4)',
                        color: '#fb7185'
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS MANAGER */}
        {activeTab === 'skills' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Technical Skills ({skills?.length || 0})</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Add, edit, or adjust skills without hardcoded arbitrary percentages.
                </p>
              </div>

              <button onClick={handleOpenAddSkill} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid-3">
              {(skills || []).map((sk) => (
                <div
                  key={sk.id}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{sk.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sk.category}</div>
                    <span className="badge badge-cyan" style={{ marginTop: '0.4rem', fontSize: '0.7rem' }}>
                      {sk.level || 'Proficient'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      onClick={() => handleOpenEditSkill(sk)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--accent-cyan)',
                        cursor: 'pointer',
                        padding: '0.35rem'
                      }}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(sk.id, sk.name)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fb7185',
                        cursor: 'pointer',
                        padding: '0.35rem'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE & HEADLINE */}
        {activeTab === 'profile' && (
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Portfolio Profile & Personal Branding
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Update your professional headline, biography, location, and social links. Changes reflect on the public site immediately.
            </p>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={profileForm.headline || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedinUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.githubUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Hidden File Explorer Inputs */}
                <input
                  type="file"
                  ref={photoInputRef}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  style={{ display: 'none' }}
                  onChange={handlePhotoFileSelect}
                />
                <input
                  type="file"
                  ref={resumeInputRef}
                  accept=".pdf,application/pdf"
                  style={{ display: 'none' }}
                  onChange={handleResumeFileSelect}
                />

                {/* Profile Photo Uploader Card */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.45)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem'
                  }}
                >
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    📸 Profile Photo
                  </label>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Clickable Avatar Thumbnail */}
                    <div
                      onClick={() => photoInputRef.current && photoInputRef.current.click()}
                      title="Click to choose a new photo from your computer"
                      style={{
                        position: 'relative',
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid var(--accent-cyan)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        background: '#0f172a',
                        boxShadow: '0 4px 14px rgba(56, 189, 248, 0.25)',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <img
                        src={profileForm.photoUrl || '/lokesh-photo.jpg'}
                        alt="Current Profile Portrait"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          opacity: 0,
                          transition: 'opacity 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                      >
                        <Camera size={22} />
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <button
                        type="button"
                        onClick={() => photoInputRef.current && photoInputRef.current.click()}
                        disabled={uploadingPhoto}
                        className="btn btn-primary"
                        style={{ padding: '0.65rem 1.15rem', fontSize: '0.825rem', width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}
                      >
                        <FolderOpen size={16} />
                        <span>{uploadingPhoto ? 'Uploading from Explorer...' : 'Open File Explorer to Change Photo'}</span>
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Path:</span>
                        <input
                          type="text"
                          placeholder="/lokesh-photo.jpg"
                          value={profileForm.photoUrl || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, photoUrl: e.target.value })}
                          className="form-input"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Document Uploader Card */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.45)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem'
                  }}
                >
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    📄 Resume PDF
                  </label>

                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Clickable PDF Badge */}
                    <div
                      onClick={() => resumeInputRef.current && resumeInputRef.current.click()}
                      title="Click to choose a new resume PDF from your computer"
                      style={{
                        position: 'relative',
                        width: '72px',
                        height: '72px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.25))',
                        border: '2px dashed rgba(239, 68, 68, 0.5)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f87171',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.borderColor = '#ef4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                      }}
                    >
                      <FileText size={26} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '2px', letterSpacing: '0.04em' }}>PDF</span>
                    </div>

                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => resumeInputRef.current && resumeInputRef.current.click()}
                          disabled={uploadingResume}
                          className="btn btn-primary"
                          style={{ padding: '0.65rem 1.15rem', fontSize: '0.825rem', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
                        >
                          <FolderOpen size={16} />
                          <span>{uploadingResume ? 'Uploading...' : 'Open File Explorer to Change Resume'}</span>
                        </button>

                        {profileForm.resumeUrl && (
                          <a
                            href={profileForm.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{ padding: '0.65rem 0.85rem', fontSize: '0.775rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                            title="Open current resume PDF"
                          >
                            <Download size={14} />
                            <span>Test</span>
                          </a>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Path:</span>
                        <input
                          type="text"
                          placeholder="/Duba_Lokesh_Kumar_Resume.pdf"
                          value={profileForm.resumeUrl || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                          className="form-input"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Hero Introduction Summary
                </label>
                <textarea
                  rows={3}
                  value={profileForm.summary || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Detailed About Me Narrative
                </label>
                <textarea
                  rows={5}
                  value={profileForm.bio || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.8rem 1.75rem' }}>
                <Check size={16} />
                <span>Save & Publish Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Inbound Inquiries ({messages.length})</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Messages submitted by recruiters, managers, and visitors via the contact form.
                </p>
              </div>

              <button onClick={loadMessages} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No inquiries received yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className="glass-card"
                    style={{
                      padding: '1.75rem',
                      borderLeft: m.isRead ? '1px solid var(--border-subtle)' : '4px solid var(--accent-cyan)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{m.name}</div>
                        <a href={`mailto:${m.email}`} style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                          {m.email}
                        </a>
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(m.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Subject: {m.subject || 'General Inquiry'}
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {m.message}
                    </p>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Portfolio Inquiry')}`} className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                        Reply via Email
                      </a>
                      <button
                        onClick={async () => {
                          await deleteMessage(m.id);
                          loadMessages();
                        }}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', color: '#fb7185' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- ADD / EDIT PROJECT MODAL --- */}
      {projectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto'
          }}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '850px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.5rem',
              backgroundColor: '#0a101d',
              border: '1px solid var(--accent-cyan)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {editingProject ? `Edit: ${editingProject.title}` : 'Add New Project'}
              </h3>
              <button
                onClick={() => setProjectModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Student Management System"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. student-management-system"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Project Status
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="form-input"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="PLANNED">Planned</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={projectForm.displayOrder}
                    onChange={(e) => setProjectForm({ ...projectForm, displayOrder: parseInt(e.target.value) || 1 })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Short Tagline
                </label>
                <input
                  type="text"
                  placeholder="One sentence summary of the project"
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Technologies (Comma Separated) *
                </label>
                <input
                  type="text"
                  placeholder="Java, Spring Boot, MySQL, REST APIs, Hibernate..."
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Overview Description
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Problem Statement
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.problemStatement}
                    onChange={(e) => setProjectForm({ ...projectForm, problemStatement: e.target.value })}
                    className="form-input form-textarea"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Engineered Solution
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    className="form-input form-textarea"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Architecture Diagram Spec / Text Diagram
                </label>
                <textarea
                  rows={4}
                  className="form-input form-textarea font-mono"
                  style={{ fontSize: '0.8rem' }}
                  value={projectForm.architectureDiagram}
                  onChange={(e) => setProjectForm({ ...projectForm, architectureDiagram: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Key Features (One feature per line, format: Feature Title: Description)
                </label>
                <textarea
                  rows={4}
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    GitHub Repository Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.liveDemoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT SKILL MODAL --- */}
      {skillModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '500px', padding: '2rem', backgroundColor: '#0a101d' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {editingSkill ? `Edit Skill: ${editingSkill.name}` : 'Add Technical Skill'}
              </h3>
              <button
                onClick={() => setSkillModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Docker, Kafka, Microservices"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Category
                </label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="form-input"
                >
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Databases">Databases</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Tools & Practices">Tools & Practices</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Proficiency Tag
                </label>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className="form-input"
                >
                  <option value="Core Strength">Core Strength</option>
                  <option value="Certified Specialist">Certified Specialist</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Foundations">Foundations</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="highlight"
                  checked={skillForm.highlight}
                  onChange={(e) => setSkillForm({ ...skillForm, highlight: e.target.checked })}
                />
                <label htmlFor="highlight" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Highlight on public portfolio card
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setSkillModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELETE MODAL --- */}
      {projectToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '440px', padding: '2rem', backgroundColor: '#0a101d', border: '1px solid #fb7185' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#fb7185' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Confirm Deletion</h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Are you sure you want to permanently delete project <strong>"{projectToDelete.title}"</strong>? This action
              cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setProjectToDelete(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteProject}
                className="btn btn-primary"
                style={{ background: '#e11d48', borderColor: '#e11d48' }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
