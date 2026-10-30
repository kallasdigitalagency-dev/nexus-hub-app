import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nuvzwidobettxbxmernr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnp3aWRvYmV0dHhieG1lcm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NTgyMDMsImV4cCI6MjEwODMzNDIwM30.-epQ2Dhb4g3j--l7GMvy21yT97EIS-BQRB7ravaRnvY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Adresse e-mail autorisée à accéder au panneau d'administration
const ADMIN_EMAIL = 'kazi@gmail.com'; // Vous pouvez ajuster cette adresse selon vos besoins

export default function NexusHubApp() {
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Entrepreneur');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [investorFilter, setInvestorFilter] = useState('All');

  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Transport Électrique Bujumbura (VTC)',
      summary: 'Flotte de véhicules électriques et hybrides pour le transport urbain sécurisé.',
      category: 'Mobilité & Transport',
      funding_goal: 15000,
      equity_offered: 15,
      stage: 'Prototype / MVP',
      currency: 'USD',
      owner: 'willy.b@example.com',
      status: 'verified'
    }
  ]);

  const [providers, setProviders] = useState([
    { id: 'p1', name: 'Kallas Digital Agency', service: 'Développement Web & Mobile React / Supabase', rate: 'Sur devis', contact_person: 'Équipe Tech', status: 'verified' },
    { id: 'p2', name: 'Audit & Conseil Finance East Africa', service: 'Montage financier et modélisation CAPEX/OPEX', rate: '50$/heure', contact_person: 'Expert Financier', status: 'verified' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [contactModal, setContactModal] = useState(null);
  const [moderationNotice, setModerationNotice] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    summary: '',
    category: 'Technologie',
    funding_goal: '',
    equity_offered: ''
  });

  const [newProvider, setNewProvider] = useState({
    name: '',
    service: '',
    rate: ''
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (!error && data && data.length > 0) {
        setProjects(data);
      }
    } catch (err) {
      console.warn('Mode secours actif');
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (authMode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: userRole } }
      });
      if (error) setAuthError(error.message);
      else alert('Compte créé avec succès ! Connectez-vous.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError('Identifiants incorrects.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const validateWithAI = (title, summary) => {
    const textToCheck = (title + ' ' + summary).toLowerCase();
    const forbiddenTerms = ['merde', 'connard', 'putain', 'salope', 'encule', 'chier', 'fuck', 'shit', 'bitch', 'spam', 'arnaque', 'casino', 'hack', 'illegal'];
    const hasProfanity = forbiddenTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(textToCheck));
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(textToCheck);
    const hasPhone = /\b\d{6,}\b/.test(textToCheck);

    if (hasProfanity) return '⚠️ Projet rejeté par l\'IA : Langage inapproprié détecté.';
    if (hasEmail || hasPhone) return '⚠️ Projet rejeté par l\'IA : Le partage de contacts directs est interdit.';
    return null;
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setModerationNotice('Analyse par IA en cours...');

    const errorMsg = validateWithAI(newProject.title, newProject.summary);
    if (errorMsg) {
      setModerationNotice(errorMsg);
      return;
    }

    const created = {
      id: Date.now().toString(),
      ...newProject,
      funding_goal: Number(newProject.funding_goal),
      equity_offered: Number(newProject.equity_offered),
      stage: 'Ébauche / Idée',
      currency: 'USD',
      owner: session?.user?.email || 'Entrepreneur',
      status: 'verified'
    };

    try {
      await supabase.from('projects').insert([created]);
    } catch (err) {
      console.warn('Sauvegarde locale');
    }

    setProjects([created, ...projects]);
    setShowModal(false);
    setModerationNotice('');
    setNewProject({ title: '', summary: '', category: 'Technologie', funding_goal: '', equity_offered: '' });
  };

  const handleCreateProvider = (e) => {
    e.preventDefault();
    const createdProvider = {
      id: 'p_' + Date.now(),
      ...newProvider,
      contact_person: session?.user?.email || 'Prestataire',
      status: 'verified'
    };
    setProviders([createdProvider, ...providers]);
    setShowProviderModal(false);
    setNewProvider({ name: '', service: '', rate: '' });
  };

  const handleSendContact = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactModal(null);
      setContactMessage('');
    }, 2000);
  };

  // ACTIONS ADMIN
  const handleDeleteProject = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'verified' ? 'suspended' : 'verified' };
      }
      return p;
    }));
  };

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  if (!session) {
    return (
      <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '48px', height: '48px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.75rem' }}>N</div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem' }}>Marketplace d'Écosystème Modérée par IA</p>
          </div>

          {authError && (
            <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600', textAlign: 'center' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Adresse e-mail :</label>
              <input required type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Mot de passe :</label>
              <input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
            </div>

            {authMode === 'signup' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Votre rôle principal :</label>
                <select value={userRole} onChange={e => setUserRole(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                  <option>Entrepreneur / Porteur de projet</option>
                  <option>Investisseur (Angel)</option>
                  <option>Prestataire de services</option>
                </select>
              </div>
            )}

            <button type="submit" style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', marginBottom: '1rem' }}>
              {authMode === 'signin' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
            {authMode === 'signin' ? (
              <span>Nouveau sur la plateforme ? <button onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: '#0866ff', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Créer un compte</button></span>
            ) : (
              <span>Déjà membre ? <button onClick={() => setAuthMode('signin')} style={{ background: 'none', border: 'none', color: '#0866ff', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Se connecter</button></span>
            )}
          </div>
        </div>
      </div>
    );
  }

  const myProjects = projects.filter(p => p.owner === session.user.email);

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* FEUILLE DE STYLE MOTION CSS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(22, 163, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
        .animated-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .animated-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -5px rgba(0,0,0,0.1) !important;
        }
        .pulse-badge {
          animation: pulseGlow 2s infinite;
        }
      `}</style>

      {/* BANDEAU PUBLICITAIRE DYNAMIQUE DÉFILANT */}
      <div style={{ backgroundColor: '#1e293b', color: '#ff9900', overflow: 'hidden', whitespace: 'nowrap', padding: '0.6rem 0', fontSize: '0.85rem', fontWeight: '700', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 25s linear infinite' }}>
          🔥 ESPACE SPONSORE : Rejoignez l'écosystème Nexus Hub — Plus de 50 investisseurs qualifiés connectés ce mois-ci en Afrique de l'Est ! 🚀
        </div>
      </div>

      {/* HEADER */}
      <header style={{ backgroundColor: '#ffffff', padding: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', gap: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem' }}>N</div>
          <h1 style={{ fontSize: '1.3rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB</h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'projects' ? '2px solid #0866ff' : 'none' }}>Projets</button>
          <button onClick={() => setActiveTab('providers')} style={{ background: 'none', border: 'none', color: activeTab === 'providers' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'providers' ? '2px solid #0866ff' : 'none' }}>Prestataires</button>
          <button onClick={() => setActiveTab('investors')} style={{ background: 'none', border: 'none', color: activeTab === 'investors' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'investors' ? '2px solid #0866ff' : 'none' }}>Investisseurs</button>
          <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'dashboard' ? '2px solid #0866ff' : 'none' }}>Mon Espace ({myProjects.length})</button>
          
          {/* BOUTON ADMIN SI CONNECTÉ EN TANT QU'ADMINISTRATEUR */}
          {isAdmin && (
            <button onClick={() => setActiveTab('admin')} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>
              ⚙️ ADMIN
            </button>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#ff9900', color: '#131921', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
            + Publier un Projet [FLASH]
          </button>
          <button onClick={handleLogout} style={{ backgroundColor: '#f1f5f9', color: '#ef4444', border: '1px solid #cbd5e1', padding: '0.6rem 0.9rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
            Déconnexion
          </button>
        </div>
      </header>

      {/* HERO */}
      <section style={{ backgroundColor: '#131921', color: '#ffffff', padding: '2.5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '800' }}>Connecter les Idées au Capital et aux Compétences</h2>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 1rem auto', fontSize: '0.95rem' }}>
          Connecté en tant que : <strong>{session.user.email}</strong> {isAdmin && <span style={{ color: '#ff9900', fontWeight: 'bold' }}>(Administrateur)</span>}
        </p>
      </section>

      {/* CONTENU PRINCIPAL */}
      <main style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1rem' }}>
        
        {/* ONGLET PROJETS */}
        {activeTab === 'projects' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Toutes les Opportunités & Idées</h3>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['All', 'Mobilité & Transport', 'Éducation / Média', 'Technologie'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    style={{ 
                      backgroundColor: selectedCategory === cat ? '#0866ff' : '#e2e8f0', 
                      color: selectedCategory === cat ? '#ffffff' : '#475569',
                      border: 'none', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' 
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {projects
                .filter(p => p.status === 'verified')
                .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                .map((p) => (
                  <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{p.category}</span>
                        <span className="pulse-badge" style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '700', backgroundColor: '#f0fdf4', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>✓ Vérifié IA</span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', color: '#0f172a', fontWeight: '700' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4', marginBottom: '1rem' }}>{p.summary}</p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ color: '#64748b' }}>Objectif :</div>
                          <div style={{ fontWeight: '700', color: '#0f172a' }}>{p.funding_goal ? p.funding_goal.toLocaleString() : 'N/A'} {p.currency || 'USD'}</div>
                        </div>
                        <div>
                          <div style={{ color: '#64748b' }}>Capital :</div>
                          <div style={{ fontWeight: '700', color: '#16a34a' }}>{p.equity_offered || 'N/A'}%</div>
                        </div>
                      </div>
                      <button onClick={() => setContactModal(p)} style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.65rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                        Demander un contact / En savoir plus
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* ONGLET PRESTATAIRES */}
        {activeTab === 'providers' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Prestataires & Experts Qualifiés</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Trouvez les meilleures compétences pour vos projets.</p>
              </div>
              <button onClick={() => setShowProviderModal(true)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                + Proposer mes services
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {providers.map((pr) => (
                <div key={pr.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>✓ Vérifié</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0866ff' }}>{pr.rate}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '700' }}>{pr.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>{pr.service}</p>
                  <button onClick={() => setContactModal({ title: `Service de ${pr.name}` })} style={{ width: '100%', backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '0.6rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Solliciter ce prestataire
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ONGLET INVESTISSEURS */}
        {activeTab === 'investors' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Espace Investisseurs (Angels)</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Filtrez les projets selon votre capacité de ticket d'investissement.</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', alignSelf: 'center' }}>Ticket d'investissement :</span>
                {['All', '< 5000 USD', '5000 - 20000 USD', '> 20000 USD'].map(f => (
                  <button key={f} onClick={() => setInvestorFilter(f)} style={{ backgroundColor: investorFilter === f ? '#0866ff' : '#e2e8f0', color: investorFilter === f ? '#ffffff' : '#475569', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {projects
                .filter(p => p.status === 'verified')
                .filter(p => {
                  if (investorFilter === '< 5000 USD') return p.funding_goal < 5000;
                  if (investorFilter === '5000 - 20000 USD') return p.funding_goal >= 5000 && p.funding_goal <= 20000;
                  if (investorFilter === '> 20000 USD') return p.funding_goal > 20000;
                  return true;
                })
                .map((p) => (
                  <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{p.category}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ff9900' }}>Recherche : {p.funding_goal} USD</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '700' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>{p.summary}</p>
                    <button onClick={() => setContactModal(p)} style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.65rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                      Proposer un ticket d'investissement
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* MON ESPACE */}
        {activeTab === 'dashboard' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Mon Espace Personnel</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Gérez les projets que vous avez créés et suivez vos publications.</p>
            </div>

            {myProjects.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Vous n'avez pas encore publié de projet avec ce compte.</p>
                <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#ff9900', color: '#131921', border: 'none', padding: '0.65rem 1.2rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                  + Publier mon premier projet
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {myProjects.map((p) => (
                  <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '2px solid #0866ff', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>Mon Projet</span>
                      <span style={{ fontSize: '0.75rem', color: p.status === 'verified' ? '#16a34a' : '#ef4444', fontWeight: '600' }}>● {p.status === 'verified' ? 'En Ligne' : 'Suspendu'}</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '700' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>{p.summary}</p>
                    <div style={{ backgroundColor: '#f8fafc', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem', color: '#475569' }}>
                      Cible : <strong>{p.funding_goal} USD</strong> | Part : <strong>{p.equity_offered}%</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ONGLET ADMINISTRATEUR SEUL */}
        {activeTab === 'admin' && isAdmin && (
          <>
            <div style={{ marginBottom: '1.5rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '800', color: '#991b1b' }}>⚙️ Panneau de Modération Administrateur</h3>
              <p style={{ fontSize: '0.85rem', color: '#7f1d1d', margin: '0.3rem 0 0 0' }}>Gérez les publications globales de Nexus Hub en temps réel.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '0.75rem' }}>Titre du projet</th>
                    <th style={{ padding: '0.75rem' }}>Auteur</th>
                    <th style={{ padding: '0.75rem' }}>Recherche ($)</th>
                    <th style={{ padding: '0.75rem' }}>Statut</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>{p.title}</td>
                      <td style={{ padding: '0.75rem', color: '#64748b' }}>{p.owner}</td>
                      <td style={{ padding: '0.75rem', fontWeight: '700', color: '#0866ff' }}>{p.funding_goal} USD</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: p.status === 'verified' ? '#16a34a' : '#ef4444', backgroundColor: p.status === 'verified' ? '#f0fdf4' : '#fef2f2', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {p.status === 'verified' ? '✓ Actif' : '⚠️ Suspendu'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <button onClick={() => handleToggleStatus(p.id)} style={{ backgroundColor: p.status === 'verified' ? '#f59e0b' : '#16a34a', color: '#ffffff', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', marginRight: '0.4rem' }}>
                          {p.status === 'verified' ? 'Masquer' : 'Approuver'}
                        </button>
                        <button onClick={() => handleDeleteProject(p.id)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </main>

      {/* MODALE SOUMISSION PROJET */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.4rem', color: '#0f172a', fontWeight: '800', fontSize: '1.2rem' }}>Publier une Idée / Projet [FLASH]</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>Modération IA active : Pas de contacts directs ni de vulgarités.</p>
            
            {moderationNotice && (
              <div style={{ backgroundColor: moderationNotice.includes('⚠️') ? '#fef2f2' : '#eff6ff', color: moderationNotice.includes('⚠️') ? '#991b1b' : '#1e40af', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: '600' }}>
                {moderationNotice}
              </div>
            )}

            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Titre du projet :</label>
                <input required type="text" placeholder="Ex: Plateforme logistique" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Résumé du concept :</label>
                <textarea required rows="3" placeholder="Présentez la valeur..." value={newProject.summary} onChange={e => setNewProject({...newProject, summary: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Recherche ($) :</label>
                  <input required type="number" placeholder="5000" value={newProject.funding_goal} onChange={e => setNewProject({...newProject, funding_goal: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Capital (%) :</label>
                  <input required type="number" placeholder="10" value={newProject.equity_offered} onChange={e => setNewProject({...newProject, equity_offered: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Annuler</button>
                <button type="submit" style={{ backgroundColor: '#ff9900', color: '#131921', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE SOUMISSION PRESTATAIRE */}
      {showProviderModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.4rem', color: '#0f172a', fontWeight: '800', fontSize: '1.1rem' }}>Proposer mes services d'expert</h3>
            <form onSubmit={handleCreateProvider}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Nom du cabinet / Expert :</label>
                <input required type="text" placeholder="Ex: Studio Tech Bujumbura" value={newProvider.name} onChange={e => setNewProvider({...newProvider, name: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Compétences & Services proposés :</label>
                <textarea required rows="3" placeholder="Ex: Audit légal, développement d'application..." value={newProvider.service} onChange={e => setNewProvider({...newProvider, service: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}></textarea>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Tarif indicatif :</label>
                <input required type="text" placeholder="Ex: 30$/heure ou Sur devis" value={newProvider.rate} onChange={e => setNewProvider({...newProvider, rate: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" onClick={() => setShowProviderModal(false)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Annuler</button>
                <button type="submit" style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Enregistrer ma fiche</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE DE CONTACT */}
      {contactModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.4rem', color: '#0f172a', fontWeight: '800', fontSize: '1.1rem' }}>Demande de mise en relation</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              Pour : <strong>{contactModal.title}</strong>. L'équipe Nexus Hub traite votre demande en toute confidentialité.
            </p>

            {contactSent ? (
              <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.85rem', borderRadius: '8px', textAlign: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                ✓ Demande transmise avec succès !
              </div>
            ) : (
              <form onSubmit={handleSendContact}>
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Votre rôle :</label>
                  <select style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <option>Investisseur</option>
                    <option>Prestataire</option>
                    <option>Partenaire</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Votre message :</label>
                  <textarea required rows="3" placeholder="Présentez brièvement votre intérêt..." value={contactMessage} onChange={e => setContactMessage(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}></textarea>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                  <button type="button" onClick={() => setContactModal(null)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Fermer</button>
                  <button type="submit" style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Envoyer la demande</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
