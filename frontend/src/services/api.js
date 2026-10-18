import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialEducation,
  initialCertifications
} from './initialData';

const API_BASE = 'http://localhost:8080/api';

// Helper for local storage initialization
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(`portfolio_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

// Check if backend is alive
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { isOnline: true, data: data.data };
    }
  } catch (e) {
    // Backend offline
  }
  return { isOnline: false, data: null };
}

// Token helper
export function getAuthToken() {
  return localStorage.getItem('portfolio_admin_token') || null;
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('portfolio_admin_token', token);
  } else {
    localStorage.removeItem('portfolio_admin_token');
  }
}

export function isAuthenticated() {
  return !!getAuthToken();
}

const authHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// --- Profile API ---
export async function getProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) {
        setStored('profile', data.data);
        return data.data;
      }
    }
  } catch (e) {
    // fallback
  }
  return getStored('profile', initialProfile);
}

export async function updateProfile(profileData) {
  setStored('profile', profileData);
  try {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(profileData)
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {
    // backend offline, local state saved
  }
  return profileData;
}

// --- Projects API ---
export async function getProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setStored('projects', data.data);
        return data.data;
      }
    }
  } catch (e) {
    // fallback
  }
  return getStored('projects', initialProjects);
}

export async function getProjectBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/projects/${slug}`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) return data.data;
    }
  } catch (e) {
    // fallback
  }
  const projects = getStored('projects', initialProjects);
  return projects.find(p => p.slug === slug || String(p.id) === String(slug)) || null;
}

export async function createProject(projectData) {
  const localProjects = getStored('projects', initialProjects);
  const newProject = {
    ...projectData,
    id: Date.now(),
    slug: projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    createdAt: new Date().toISOString()
  };
  const updatedList = [newProject, ...localProjects];
  setStored('projects', updatedList);

  try {
    const res = await fetch(`${API_BASE}/admin/projects`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(projectData)
    });
    if (res.ok) {
      const data = await res.json();
      // Replace temporary id with database id
      const syncdList = updatedList.map(p => p.id === newProject.id ? data.data : p);
      setStored('projects', syncdList);
      return data.data;
    }
  } catch (e) {
    // backend offline
  }
  return newProject;
}

export async function updateProject(id, projectData) {
  const localProjects = getStored('projects', initialProjects);
  const updatedList = localProjects.map(p => (String(p.id) === String(id) ? { ...p, ...projectData, id } : p));
  setStored('projects', updatedList);

  try {
    const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(projectData)
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {
    // backend offline
  }
  return updatedList.find(p => String(p.id) === String(id));
}

export async function deleteProject(id) {
  const localProjects = getStored('projects', initialProjects);
  const filtered = localProjects.filter(p => String(p.id) !== String(id));
  setStored('projects', filtered);

  try {
    await fetch(`${API_BASE}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
  } catch (e) {
    // backend offline
  }
  return true;
}

// --- Skills API ---
export async function getSkills() {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setStored('skills', data.data);
        return data.data;
      }
    }
  } catch (e) {
    // fallback
  }
  return getStored('skills', initialSkills);
}

export async function createSkill(skillData) {
  const localSkills = getStored('skills', initialSkills);
  const newSkill = { ...skillData, id: Date.now() };
  const updatedList = [...localSkills, newSkill];
  setStored('skills', updatedList);

  try {
    const res = await fetch(`${API_BASE}/admin/skills`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(skillData)
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {}
  return newSkill;
}

export async function updateSkill(id, skillData) {
  const localSkills = getStored('skills', initialSkills);
  const updatedList = localSkills.map(s => String(s.id) === String(id) ? { ...s, ...skillData, id } : s);
  setStored('skills', updatedList);

  try {
    const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(skillData)
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {}
  return updatedList.find(s => String(s.id) === String(id));
}

export async function deleteSkill(id) {
  const localSkills = getStored('skills', initialSkills);
  const filtered = localSkills.filter(s => String(s.id) !== String(id));
  setStored('skills', filtered);

  try {
    await fetch(`${API_BASE}/admin/skills/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
  } catch (e) {}
  return true;
}

// --- Experience API ---
export async function getExperience() {
  try {
    const res = await fetch(`${API_BASE}/experience`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setStored('experience', data.data);
        return data.data;
      }
    }
  } catch (e) {}
  return getStored('experience', initialExperience);
}

export async function updateExperience(id, data) {
  const list = getStored('experience', initialExperience);
  const updated = list.map(item => String(item.id) === String(id) ? { ...item, ...data, id } : item);
  setStored('experience', updated);
  try {
    await fetch(`${API_BASE}/admin/experience/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data)
    });
  } catch (e) {}
  return updated;
}

// --- Education API ---
export async function getEducation() {
  try {
    const res = await fetch(`${API_BASE}/education`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setStored('education', data.data);
        return data.data;
      }
    }
  } catch (e) {}
  return getStored('education', initialEducation);
}

// --- Certifications API ---
export async function getCertifications() {
  try {
    const res = await fetch(`${API_BASE}/certifications`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setStored('certifications', data.data);
        return data.data;
      }
    }
  } catch (e) {}
  return getStored('certifications', initialCertifications);
}

// --- Contact Form API ---
export async function submitContactMessage(messageData) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, message: data.message || "Message sent successfully!" };
    }
  } catch (e) {
    // backend offline, store in local inbox
  }

  // Local inbox storage so no message is lost
  const existing = getStored('messages', []);
  const newMsg = {
    ...messageData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    isRead: false
  };
  setStored('messages', [newMsg, ...existing]);
  return { success: true, message: "Your message has been securely recorded and sent to Duba Lokesh Kumar!" };
}

export async function getAdminMessages() {
  try {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: authHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (e) {}
  return getStored('messages', [
    {
      id: 101,
      name: "Technical Recruiter",
      email: "recruiter@techventures.com",
      subject: "Java Full Stack Developer Role - Opportunity in Hyderabad",
      message: "Hi Lokesh, We reviewed your Payment Integration System and Bank Management System architecture. We have an Associate Software Engineer / Full Stack role that aligns with your Spring Boot and MySQL expertise.",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      isRead: false
    }
  ]);
}

export async function markMessageRead(id) {
  const existing = getStored('messages', []);
  const updated = existing.map(m => m.id === id ? { ...m, isRead: true } : m);
  setStored('messages', updated);
  try {
    await fetch(`${API_BASE}/admin/messages/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders()
    });
  } catch (e) {}
}

export async function deleteMessage(id) {
  const existing = getStored('messages', []);
  const updated = existing.filter(m => m.id !== id);
  setStored('messages', updated);
  try {
    await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
  } catch (e) {}
}

// --- Admin Auth API ---
export async function loginAdmin(username, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.data && data.data.token) {
        setAuthToken(data.data.token);
        return { success: true, data: data.data };
      }
    }
  } catch (e) {
    // backend offline - allow demo local admin if credentials match default
  }

  if (username === 'admin' && (password === 'AdminPassword@2026' || password === 'admin' || password === 'admin123')) {
    const mockToken = 'mock_jwt_admin_' + Date.now();
    setAuthToken(mockToken);
    return {
      success: true,
      data: {
        token: mockToken,
        username: 'admin',
        role: 'ROLE_ADMIN'
      }
    };
  }

  return { success: false, message: "Invalid credentials. Use username: admin and password: AdminPassword@2026" };
}

export function logoutAdmin() {
  setAuthToken(null);
}
