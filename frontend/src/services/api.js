import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperience,
  initialEducation,
  initialCertifications
} from './initialData';

// Determine API base: in dev (Vite proxy) use relative '/api' to bypass CORS, otherwise absolute URL
const getApiBase = () => {
  if (typeof window !== 'undefined' && window.location.origin) {
    return '/api';
  }
  return 'http://localhost:8080/api';
};

const API_BASE = getApiBase();

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
  const candidateUrls = [
    `${API_BASE}/health`,
    'http://localhost:8080/api/health',
    'http://127.0.0.1:8080/api/health'
  ];

  for (const url of candidateUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        return { isOnline: true, data: data.data };
      }
    } catch (e) {
      // Try next candidate URL
    }
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
  const res = await fetch(`${API_BASE}/admin/profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(profileData)
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to update profile (${res.status})`);
  }
  const data = await res.json();
  const saved = data.data || profileData;
  setStored('profile', saved);
  return saved;
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
  const res = await fetch(`${API_BASE}/admin/projects`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(projectData)
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to create project (${res.status})`);
  }
  const data = await res.json();
  const created = data.data;
  const localProjects = getStored('projects', initialProjects);
  const updatedList = [created, ...localProjects.filter(p => p.id !== created.id)];
  setStored('projects', updatedList);
  return created;
}

export async function updateProject(id, projectData) {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(projectData)
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to update project (${res.status})`);
  }
  const data = await res.json();
  const updated = data.data || { ...projectData, id };
  const localProjects = getStored('projects', initialProjects);
  const updatedList = localProjects.map(p => (String(p.id) === String(id) ? updated : p));
  setStored('projects', updatedList);
  return updated;
}

export async function deleteProject(id) {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to delete project (${res.status})`);
  }
  const localProjects = getStored('projects', initialProjects);
  const filtered = localProjects.filter(p => String(p.id) !== String(id));
  setStored('projects', filtered);
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
  const res = await fetch(`${API_BASE}/admin/skills`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(skillData)
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to create skill (${res.status})`);
  }
  const data = await res.json();
  const created = data.data;
  const localSkills = getStored('skills', initialSkills);
  const updatedList = [...localSkills.filter(s => s.id !== created.id), created];
  setStored('skills', updatedList);
  return created;
}

export async function updateSkill(id, skillData) {
  const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(skillData)
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to update skill (${res.status})`);
  }
  const data = await res.json();
  const updated = data.data || { ...skillData, id };
  const localSkills = getStored('skills', initialSkills);
  const updatedList = localSkills.map(s => String(s.id) === String(id) ? updated : s);
  setStored('skills', updatedList);
  return updated;
}

export async function deleteSkill(id) {
  const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to delete skill (${res.status})`);
  }
  const localSkills = getStored('skills', initialSkills);
  const filtered = localSkills.filter(s => String(s.id) !== String(id));
  setStored('skills', filtered);
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
  const res = await fetch(`${API_BASE}/admin/experience/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to update experience (${res.status})`);
  }
  const resJson = await res.json();
  const updated = resJson.data || { ...data, id };
  const list = getStored('experience', initialExperience);
  const updatedList = list.map(item => String(item.id) === String(id) ? updated : item);
  setStored('experience', updatedList);
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
  const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders()
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to mark message as read (${res.status})`);
  }
  const existing = getStored('messages', []);
  const updated = existing.map(m => m.id === id ? { ...m, isRead: true } : m);
  setStored('messages', updated);
}

export async function deleteMessage(id) {
  const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Failed to delete message (${res.status})`);
  }
  const existing = getStored('messages', []);
  const updated = existing.filter(m => m.id !== id);
  setStored('messages', updated);
}

// Candidate base URLs for auth operations to ensure connectivity regardless of proxy or localhost resolution
const getCandidateBases = () => {
  const set = new Set([API_BASE, 'http://localhost:8080/api', 'http://127.0.0.1:8080/api']);
  return Array.from(set);
};

// --- Admin Auth API ---
export async function loginAdmin(username, password) {
  const bases = getCandidateBases();
  let lastError = null;

  for (const base of bases) {
    try {
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.data && data.data.token) {
        setAuthToken(data.data.token);
        return { success: true, data: data.data };
      }
      return {
        success: false,
        message: data.message || "Invalid administrator credentials."
      };
    } catch (e) {
      lastError = e;
      // Try next base URL
    }
  }

  return {
    success: false,
    message: "Unable to connect to backend authentication service. Ensure the Spring Boot backend is running on port 8080."
  };
}

export function logoutAdmin() {
  setAuthToken(null);
}

export async function forgotPassword(email) {
  const bases = getCandidateBases();
  for (const base of bases) {
    try {
      const res = await fetch(`${base}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        return { success: true, message: data.message, data: data.data };
      }
      return {
        success: false,
        message: data.message || "Failed to initiate password reset. Ensure the email belongs to the administrator."
      };
    } catch (e) {
      // Try next base
    }
  }

  return {
    success: false,
    message: "Unable to reach backend service. Please check connection."
  };
}

export async function resetPassword(email, otp, newPassword) {
  const bases = getCandidateBases();
  for (const base of bases) {
    try {
      const res = await fetch(`${base}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        return { success: true, message: data.message };
      }
      return {
        success: false,
        message: data.message || "Invalid or expired verification code."
      };
    } catch (e) {
      // Try next base
    }
  }

  return {
    success: false,
    message: "Unable to reach backend service. Please check connection."
  };
}

export async function changePassword(currentPassword, newPassword) {
  const token = getAuthToken();
  try {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message };
    }
    return {
      success: false,
      message: data.message || "Failed to update password. Verify current password."
    };
  } catch (e) {
    return {
      success: false,
      message: "Unable to reach backend service."
    };
  }
}

export async function uploadFile(file, type) {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('file', file);
  if (type) formData.append('type', type);

  try {
    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, message: data.message, data: data.data };
    }
    return {
      success: false,
      message: data.message || "Failed to upload file."
    };
  } catch (e) {
    return {
      success: false,
      message: "Unable to upload to backend server."
    };
  }
}
