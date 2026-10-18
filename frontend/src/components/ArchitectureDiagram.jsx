import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  ShieldAlert,
  Server,
  Database,
  CheckCircle2,
  Lock,
  RefreshCw,
  Cpu,
  Globe,
  Radio,
  FileText
} from 'lucide-react';

export default function ArchitectureDiagram({ project }) {
  const [viewMode, setViewMode] = useState('visual'); // 'visual' | 'code'

  const isPayment = project.slug === 'payment-integration-system';
  const isBank = project.slug === 'bank-management-system';

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={18} color="var(--accent-cyan)" />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
            {isPayment ? 'Asynchronous Webhook & Auditing Architecture' : 'Atomic Transaction Boundary Workflow'}
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setViewMode('visual')}
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: viewMode === 'visual' ? 'var(--accent-blue)' : 'transparent',
              color: viewMode === 'visual' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Interactive Flowchart
          </button>
          <button
            onClick={() => setViewMode('code')}
            style={{
              padding: '0.3rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: viewMode === 'code' ? 'var(--accent-blue)' : 'transparent',
              color: viewMode === 'code' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            System Diagram Spec
          </button>
        </div>
      </div>

      {viewMode === 'visual' ? (
        <div
          className="glass-card"
          style={{
            padding: '2rem',
            background: 'rgba(10, 16, 30, 0.85)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {isPayment && (
            <div>
              {/* Technical Note on Webhooks */}
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  marginBottom: '2rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}
              >
                <Radio size={18} color="#38bdf8" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Dual-Path Architecture:</strong> Notice that client
                  charge creation follows a direct synchronous path, whereas final settlement verification arrives via a{' '}
                  <strong>dedicated, decoupled server-to-server webhook callback</strong> from Stripe to ensure absolute idempotency
                  and eliminate reliance on client network stability.
                </div>
              </div>

              {/* Step Flow Nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Stage 1: Client to API */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Step 1 • Front End
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Customer / React UI</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Initiates POST /create-intent</div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <ArrowRight size={22} style={{ margin: '0 auto' }} />
                  </div>

                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Step 2 • REST Layer
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Spring Boot REST API</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PaymentService / Controller</div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <ArrowRight size={22} style={{ margin: '0 auto' }} />
                  </div>

                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(99, 102, 241, 0.4)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Step 3 • External Gateway
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#c7d2fe' }}>Stripe Payment Service</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Processes Charge Lifecycle</div>
                  </div>
                </div>

                {/* Webhook Divider Banner */}
                <div
                  style={{
                    margin: '0.75rem 0',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px dashed rgba(99, 102, 241, 0.35)',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#c7d2fe',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  ⚡ Asynchronous Server-to-Server Webhook Flow (HMAC-SHA256 Cryptographic Signature) ⚡
                </div>

                {/* Stage 2: Webhook, Audit & Database */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: '#34d399', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Step 4 • Security Verification
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Verified Webhook Receiver</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Signature & Idempotency Check</div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <ArrowRight size={22} style={{ margin: '0 auto' }} />
                  </div>

                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: '#fbbf24', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Step 5 • Audit Engine
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Risk Threshold Rules</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flags high amounts before settlement</div>
                  </div>

                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <ArrowRight size={22} style={{ margin: '0 auto' }} />
                  </div>

                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Step 6 • Persistence
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>DAO / MySQL Database</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Targeted B-Tree Indexed Tables</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isBank && (
            <div>
              {/* Technical Note on Transaction Boundaries */}
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  marginBottom: '2rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}
              >
                <Lock size={18} color="#10b981" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#10b981' }}>ACID Transaction Boundary Invariant:</strong> The transfer logic
                  operates inside an explicit Hibernate Session transaction boundary. If an unhandled exception or server crash
                  occurs at any point between the source debit and destination credit, the entire transaction is rolled back by the
                  database engine, ensuring account balances never get out of balance.
                </div>
              </div>

              {/* 8-Step Pipeline */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}
              >
                {[
                  { step: '1', title: 'Enter Transfer Details', desc: 'Source, destination, amount', icon: <FileText size={16} /> },
                  { step: '2', title: 'Validate Input', desc: 'Format, positive bounds', icon: <CheckCircle2 size={16} /> },
                  { step: '3', title: 'Verify Accounts', desc: 'Confirm accounts active in DB', icon: <Cpu size={16} /> },
                  { step: '4', title: 'Check Available Balance', desc: 'Source balance >= transfer amount', icon: <ShieldAlert size={16} /> },
                  { step: '5', title: 'BEGIN Transaction', desc: 'Hibernate boundary initialized', icon: <Lock size={16} /> },
                  { step: '6', title: 'Debit & Credit', desc: 'Debit source, credit destination', icon: <RefreshCw size={16} /> },
                  { step: '7', title: 'COMMIT or ROLLBACK', desc: 'Atomic state persistence', icon: <Database size={16} /> },
                  { step: '8', title: 'Display Result', desc: 'Updated confirmation & balance', icon: <CheckCircle2 size={16} /> }
                ].map((s) => (
                  <div
                    key={s.step}
                    style={{
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        PHASE {s.step}
                      </span>
                      <span style={{ color: 'var(--accent-cyan)' }}>{s.icon}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isPayment && !isBank && (
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Standard 3-Tier Layered Architecture: React Client UI ➔ Spring Boot Controller ➔ Service Layer ➔ DAO/Repository ➔ MySQL Database.
            </div>
          )}
        </div>
      ) : (
        <div className="architecture-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {project.architectureDiagram || 'Architecture spec diagram not configured.'}
          </pre>
        </div>
      )}
    </div>
  );
}
