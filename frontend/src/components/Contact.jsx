import React, { useState } from 'react';
import { submitContactMessage } from '../services/api';
import { Linkedin, Github } from './Icons';
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function Contact({ profile, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formError, setFormError] = useState(null);

  const emailAddress = profile?.email || 'dubalokeshkumar6550@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    if (showToast) showToast('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Validation
    if (!formData.name.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setFormError('Message body cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitContactMessage(formData);
      if (res && res.success) {
        setFormSuccess(res.message || 'Your message was delivered successfully! I will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (showToast) showToast('Message sent successfully!');
      } else {
        setFormError(res?.message || 'Failed to send message. Please try emailing directly.');
      }
    } catch (err) {
      setFormError('An unexpected network error occurred. Please reach out via email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Mail size={14} /> GET IN TOUCH
          </div>
          <h2 className="section-title">
            Let's Discuss <span className="gradient-text">New Opportunities</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Looking for a Java Full Stack Developer or Associate Software Engineer? I'm available for full-time opportunities,
            technical interviews, and engineering collaborations.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left: Contact Info & Direct Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Contact Card */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Contact Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {/* Email Item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</div>
                    <a
                      href={`mailto:${emailAddress}`}
                      style={{
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        wordBreak: 'break-all'
                      }}
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)'
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {profile?.location || 'Hyderabad, Telangana, India'}
                    </div>
                  </div>
                </div>

                {/* Phone Item */}
                {profile?.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10b981'
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone</div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {profile.phone}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Copy Email, Mailto */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                <button
                  onClick={handleCopyEmail}
                  className="btn btn-secondary"
                  style={{ flex: 1, minWidth: '150px', fontSize: '0.85rem' }}
                >
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy Email Address'}</span>
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '150px', fontSize: '0.85rem' }}
                >
                  <Mail size={16} />
                  <span>Send Direct Email</span>
                </a>
              </div>

              {/* Social Profiles */}
              <div>
                <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  VERIFIED PROFILES:
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href={profile?.linkedinUrl || 'https://linkedin.com/in/lokeshkumarduba'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.65rem' }}
                  >
                    <Linkedin size={18} color="#0077b5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profile?.githubUrl || 'https://github.com/DubaLokeshKumar6550'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.65rem' }}
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Working Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Send a Direct Message
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Messages are saved directly into the backend database and forwarded to my inbox.
            </p>

            {formSuccess && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Check size={18} />
                <span>{formSuccess}</span>
              </div>
            )}

            {formError && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#fb7185',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <AlertCircle size={18} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. sarah@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Subject / Position
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Associate Software Engineer Interview / Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Message Content *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about the role, technical requirements, or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.75rem', alignSelf: 'flex-start', minWidth: '180px' }}
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
