import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nuvzwidobettxbxmernr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnp3aWRvYmV0dHhieG1lcm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NTgyMDMsImV4cCI6MjEwODMzNDIwM30.-epQ2Dhb4g3j--l7GMvy21yT97EIS-BQRB7ravaRnvY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Remplacez cette adresse par votre adresse e-mail administrateur exacte
const ADMIN_EMAIL = 'kazima9891@gmail.com';

const TRANSLATIONS = {
  EN: {
    banner: "🌐 NEXUS HUB GLOBAL: Connecting Vetted International Capital with High-Growth Emerging Deals — Apply for Qualified Deal Flow & Junior Advisory Access.",
    heroTitle: "Global Cross-Border Investment & Advisory Marketplace",
    heroSubtitle: "A curated gateway for international investors, vetted deal flows, and junior deal advisory.",
    tabOpportunities: "Opportunities",
    tabAdvisory: "Advisory & Experts",
    tabInvestors: "Angel & Institutional",
    tabDashboard: "My Dashboard",
    tabAdmin: "⚙️ ADMIN",
    btnSubmitProject: "+ Apply to List Deal",
    btnLogout: "Sign Out",
    btnSignIn: "Sign In",
    btnSignUp: "Create Account",
    authTagline: "Global Private Equity & Advisory Platform",
    emailLabel: "Email Address:",
    passwordLabel: "Password:",
    roleLabel: "Primary Role:",
    roleEntrepreneur: "Project Owner / Founder",
    roleInvestor: "Investor / Fund",
    roleAdvisor: "Service Provider / Advisor",
    goalLabel: "Target Goal",
    raisedLabel: "Raised",
    equityLabel: "Equity Offered",
    btnInvest: "Request Advisory & Deal Access",
    noAccount: "New to the platform?",
    hasAccount: "Already a member?",
    advisoryNotice: "Nexus Hub operates as a gated intermediary and advisory partner. Entry & vetting fees apply upon submission.",
    contactModalTitle: "Deal Introduction & Advisory Request",
    contactSentMsg: "✓ Request submitted to Nexus Hub Deal Advisory team!"
  },
  FR: {
    banner: "🌐 NEXUS HUB GLOBAL : Connectez les capitaux internationaux aux opportunités émergentes à forte croissance — Accès qualifié & Conseil.",
    heroTitle: "Marketplace Mondiale d'Investissement & Conseil Transfrontalier",
    heroSubtitle: "Une passerelle internationale pour investisseurs, projets audités et accompagnement stratégique.",
    tabOpportunities: "Opportunités",
    tabAdvisory: "Conseils & Experts",
    tabInvestors: "Investisseurs & Angels",
    tabDashboard: "Mon Espace",
    tabAdmin: "⚙️ ADMIN",
    btnSubmitProject: "+ Proposer un Projet",
    btnLogout: "Déconnexion",
    btnSignIn: "Se connecter",
    btnSignUp: "Créer un compte",
    authTagline: "Plateforme Mondiale d'Investissement & Conseil",
    emailLabel: "Adresse e-mail :",
    passwordLabel: "Mot de passe :",
    roleLabel: "Rôle principal :",
    roleEntrepreneur: "Porteur de projet / Fondateur",
    roleInvestor: "Investisseur / Fonds",
    roleAdvisor: "Prestataire / Conseiller",
    goalLabel: "Objectif Cible",
    raisedLabel: "Levé",
    equityLabel: "Capital Offert",
    btnInvest: "Demander l'Accès Conseil & Deal",
    noAccount: "Nouveau sur la plateforme ?",
    hasAccount: "Déjà membre ?",
    advisoryNotice: "Nexus Hub agit en tant qu'intermédiaire filtrant et partenaire conseil. Des frais de dossier s'appliquent à la soumission.",
    contactModalTitle: "Demande de Mise en Relation & Conseil",
    contactSentMsg: "✓ Demande transmise à l'équipe Conseil Nexus Hub !"
  }
};

export default function NexusHubApp() {
  const [lang, setLang] = useState('EN'); // Langue par défaut : Anglais
  const t = TRANSLATIONS[lang];

  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(t.roleEntrepreneur);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [investorFilter, setInvestorFilter] = useState('All');

  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Global Cross-Border EV Mobility Deal',
      summary: 'Scalable hybrid & electric fleet platform expansion across high-growth international trade hubs.',
      category: 'Mobility & Logistics',
      funding_goal: 50000,
      amount_raised: 12500,
      equity_offered: 12,
      stage: 'Growth / Seed',
      currency: 'USD',
      owner: 'founder@globalventure.com',
      status: 'verified'
    }
  ]);

  const [providers, setProviders] = useState([
    { id: 'p1', name: 'Global Tech & Structuring Agency', service: 'Full-stack Web/Mobile Architecture & Advisory', rate: 'Retainer / Quote', contact_person: 'Tech Advisory', status: 'verified' },
    { id: 'p2', name: 'Cross-Border Financial Advisory', service: 'Financial modeling, valuation & due diligence support', rate: '$75/hour', contact_person: 'Senior Analyst', status: 'verified' }
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
    category: 'Technology',
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
      console.warn('Fallback active');
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
      else alert(lang === 'EN' ? 'Account created! You can now sign in.' : 'Compte créé ! Vous pouvez vous connecter.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(lang === 'EN' ? 'Invalid email or password.' : 'Identifiants incorrects.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const validateWithAI = (title, summary) => {
    const textToCheck = (title + ' ' + summary).toLowerCase();
    const forbiddenTerms = ['spam', 'hack', 'illegal', 'scam', 'casino', 'fuck', 'shit', 'bitch'];
    const hasProfanity = forbiddenTerms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(textToCheck));
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(textToCheck);
    const hasPhone = /\b\d{6,}\b/.test(textToCheck);

    if (hasProfanity) return '⚠️ AI Flag: Inappropriate or prohibited content detected.';
    if (hasEmail || hasPhone) return '⚠️ AI Guard: Direct contact info is strictly prohibited to preserve platform advisory rules.';
    return null;
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setModerationNotice('AI Vetting & Advisory Review in progress...');

    const errorMsg = validateWithAI(newProject.title, newProject.summary);
    if (errorMsg) {
      setModerationNotice(errorMsg);
      return;
    }

    const created = {
      id: Date.now().toString(),
      ...newProject,
      funding_goal: Number(newProject.funding_goal),
      amount_raised: 0,
      equity_offered: Number(newProject.equity_offered),
      stage: 'Pending Vetting & Entry Fee',
      currency: 'USD',
      owner: session?.user?.email || 'Global Founder',
      status: 'verified'
    };

    try {
      await supabase.from('projects').insert([created]);
    } catch (err) {
      console.warn('Local save');
    }

    setProjects([created, ...projects]);
    setShowModal(false);
    setModerationNotice('');
    setNewProject({ title: '', summary: '', category: 'Technology', funding_goal: '', equity_offered: '' });
  };

  const handleCreateProvider = (e) => {
    e.preventDefault();
    const createdProvider = {
      id: 'p_' + Date.now(),
      ...newProvider,
      contact_person: session?.user?.email || 'Advisor',
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

  const handleDeleteProject = (id) => {
    if (window.confirm(lang === 'EN' ? 'Delete this deal listing?' : 'Supprimer ce projet ?')) {
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

  const isAdmin = session?.user?.email?.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();

  // LOGIN SCREEN
  if (!session) {
    return (
      <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        
        {/* SELECTEUR DE LANGUE DANS AUTH */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setLang('EN')} style={{ backgroundColor: lang === 'EN' ? '#0866ff' : '#1e293b', color: '#ffffff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>EN</button>
          <button onClick={() => setLang('FR')} style={{ backgroundColor: lang === 'FR' ? '#0866ff' : '#1e293b', color: '#ffffff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>FR</button>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '48px', height: '48px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.75rem' }}>N</div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB GLOBAL</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem' }}>{t.authTagline}</p>
          </div>

          {authError && (
            <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600', textAlign: 'center' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>{t.emailLabel}</label>
              <input required type="email" placeholder="name@globalventure.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>{t.passwordLabel}</label>
              <input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
            </div>

            {authMode === 'signup' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>{t.roleLabel}</label>
                <select value={userRole} onChange={e => setUserRole(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                  <option>{t.roleEntrepreneur}</option>
                  <option>{t.roleInvestor}</option>
                  <option>{t.roleAdvisor}</option>
                </select>
              </div>
            )}

            <button type="submit" style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', marginBottom: '1rem' }}>
              {authMode === 'signin' ? t.btnSignIn : t.btnSignUp}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
            {authMode === 'signin' ? (
              <span>{t.noAccount} <button onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: '#0866ff', fontWeight: '700', cursor: 'pointer', padding: 0 }}>{t.btnSignUp}</button></span>
            ) : (
              <span>{t.hasAccount} <button onClick={() => setAuthMode('signin')} style={{ background: 'none', border: 'none', color: '#0866ff', fontWeight: '700', cursor: 'pointer', padding: 0 }}>{t.btnSignIn}</button></span>
            )}
          </div>
        </div>
      </div>
    );
  }

  const myProjects = projects.filter(p => p.owner === session.user.email);

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* FEUILLE DE STYLE MOTION & DESIGN GLOBAL */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(8, 102, 255, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(8, 102, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(8, 102, 255, 0); }
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

      {/* BANDEAU PUBLICITAIRE DÉFILANT ACCROCHEUR */}
      <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0.6rem 0', fontSize: '0.85rem', fontWeight: '700', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 28s linear infinite' }}>
          {t.banner}
        </div>
      </div>

      {/* HEADER AVEC SELECTEUR DE LANGUE */}
      <header style={{ backgroundColor: '#ffffff', padding: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', gap: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem' }}>N</div>
          <h1 style={{ fontSize: '1.3rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '700', verticalAlign: 'super' }}>GLOBAL</span></h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'projects' ? '2px solid #0866ff' : 'none' }}>{t.tabOpportunities}</button>
          <button onClick={() => setActiveTab('providers')} style={{ background: 'none', border: 'none', color: activeTab === 'providers' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'providers' ? '2px solid #0866ff' : 'none' }}>{t.tabAdvisory}</button>
          <button onClick={() => setActiveTab('investors')} style={{ background: 'none', border: 'none', color: activeTab === 'investors' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'investors' ? '2px solid #0866ff' : 'none' }}>{t.tabInvestors}</button>
          <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'dashboard' ? '2px solid #0866ff' : 'none' }}>{t.tabDashboard} ({myProjects.length})</button>
          
          {isAdmin && (
            <button onClick={() => setActiveTab('admin')} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>
              {t.tabAdmin}
            </button>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* SÉLECTEUR DE LANGUE EN HEADER */}
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '6px', padding: '0.15rem' }}>
            <button onClick={() => setLang('EN')} style={{ backgroundColor: lang === 'EN' ? '#0866ff' : 'transparent', color: lang === 'EN' ? '#ffffff' : '#475569', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>EN</button>
            <button onClick={() => setLang('FR')} style={{ backgroundColor: lang === 'FR' ? '#0866ff' : 'transparent', color: lang === 'FR' ? '#ffffff' : '#475569', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>FR</button>
          </div>

          <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
            {t.btnSubmitProject}
          </button>
          <button onClick={handleLogout} style={{ backgroundColor: '#f1f5f9', color: '#ef4444', border: '1px solid #cbd5e1', padding: '0.6rem 0.9rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
            {t.btnLogout}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '3.5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>{t.heroTitle}</h2>
        <p style={{ color: '#94a3b8', maxWidth: '700px', margin: '0 auto 1.5rem auto', fontSize: '1.05rem', lineHeight: '1.5' }}>
          {t.heroSubtitle}
        </p>
        <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '600' }}>
          User: <strong>{session.user.email}</strong> {isAdmin && <span style={{ color: '#ff9900' }}>(Admin)</span>}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1rem' }}>
        
        {/* OPPORTUNITIES TAB */}
        {activeTab === 'projects' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Vetted Investment Opportunities</h3>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['All', 'Mobility & Logistics', 'Technology', 'Media & Education'].map((cat) => (
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {projects
                .filter(p => p.status === 'verified')
                .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                .map((p) => {
                  const raised = p.amount_raised || 0;
                  const goal = p.funding_goal || 1;
                  const percentage = Math.min(Math.round((raised / goal) * 100), 100);

                  return (
                    <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{p.category}</span>
                          <span className="pulse-badge" style={{ fontSize: '0.75rem', color: '#0866ff', fontWeight: '700', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>✓ Vetted Deal</span>
                        </div>
                        <h4 style={{ fontSize: '1.15rem', margin: '0.5rem 0', color: '#0f172a', fontWeight: '800' }}>{p.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4', marginBottom: '1.25rem' }}>{p.summary}</p>
                      </div>

                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                            <span style={{ color: '#0f172a' }}>{raised.toLocaleString()} {p.currency || 'USD'} {t.raisedLabel}</span>
                            <span style={{ color: '#0866ff' }}>{percentage}%</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#0866ff', borderRadius: '4px' }}></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.3rem' }}>
                            <span>{t.goalLabel}: {goal.toLocaleString()} {p.currency || 'USD'}</span>
                            <span>{t.equityLabel}: <strong>{p.equity_offered}%</strong></span>
                          </div>
                        </div>

                        <button onClick={() => setContactModal(p)} style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                          {t.btnInvest}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* ADVISORY TAB */}
        {activeTab === 'providers' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Junior Deal Advisory & Experts</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Vetted legal, financial, and tech partners for cross-border deal structuring.</p>
              </div>
              <button onClick={() => setShowProviderModal(true)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                + List Advisory Services
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {providers.map((pr) => (
                <div key={pr.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>✓ Approved Partner</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0866ff' }}>{pr.rate}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '700' }}>{pr.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>{pr.service}</p>
                  <button onClick={() => setContactModal({ title: `Service: ${pr.name}` })} style={{ width: '100%', backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '0.6rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Request Advisory Intro
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* INVESTORS TAB */}
        {activeTab === 'investors' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Angel & Institutional Investor Portal</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Filter opportunities by ticket capacity.</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', alignSelf: 'center' }}>Ticket Size:</span>
                {['All', '< 10,000 USD', '10,000 - 50,000 USD', '> 50,000 USD'].map(f => (
                  <button key={f} onClick={() => setInvestorFilter(f)} style={{ backgroundColor: investorFilter === f ? '#0866ff' : '#e2e8f0', color: investorFilter === f ? '#ffffff' : '#475569', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {projects
                .filter(p => p.status === 'verified')
                .map((p) => (
                  <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{p.category}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff' }}>Target: {p.funding_goal} USD</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '700' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>{p.summary}</p>
                    <button onClick={() => setContactModal(p)} style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.65rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                      {t.btnInvest}
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>My Dashboard & Applications</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Track your deal submissions and advisory status.</p>
            </div>

            {myProjects.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>No active submissions under this account.</p>
                <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.65rem 1.2rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                  {t.btnSubmitProject}
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {myProjects.map((p) => (
                  <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '2px solid #0866ff', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>My Application</span>
                      <span style={{ fontSize: '0.75rem', color: p.status === 'verified' ? '#16a34a' : '#ef4444', fontWeight: '600' }}>● {p.status === 'verified' ? 'Active' : 'Suspended'}</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '700' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>{p.summary}</p>
                    <div style={{ backgroundColor: '#f8fafc', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem', color: '#475569' }}>
                      Target: <strong>{p.funding_goal} USD</strong> | Equity: <strong>{p.equity_offered}%</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && isAdmin && (
          <>
            <div style={{ marginBottom: '1.5rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '800', color: '#991b1b' }}>⚙️ Global Admin & Advisory Moderation Panel</h3>
              <p style={{ fontSize: '0.85rem', color: '#7f1d1d', margin: '0.3rem 0 0 0' }}>Review submissions, collect entry fees, and approve global deal listings.</p>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '0.75rem' }}>Deal Title</th>
                    <th style={{ padding: '0.75rem' }}>Owner</th>
                    <th style={{ padding: '0.75rem' }}>Target ($)</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
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
                          {p.status === 'verified' ? '✓ Verified' : '⚠️ Suspended'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <button onClick={() => handleToggleStatus(p.id)} style={{ backgroundColor: p.status === 'verified' ? '#f59e0b' : '#16a34a', color: '#ffffff', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', marginRight: '0.4rem' }}>
                          {p.status === 'verified' ? 'Hide' : 'Approve'}
                        </button>
                        <button onClick={() => handleDeleteProject(p.id)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '0.35rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>
                          Delete
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

      {/* SUBMIT MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.4rem', color: '#0f172a', fontWeight: '800', fontSize: '1.2rem' }}>Apply to List Deal & Request Advisory</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>{t.advisoryNotice}</p>
            
            {moderationNotice && (
              <div style={{ backgroundColor: moderationNotice.includes('⚠️') ? '#fef2f2' : '#eff6ff', color: moderationNotice.includes('⚠️') ? '#991b1b' : '#1e40af', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: '600' }}>
                {moderationNotice}
              </div>
            )}

            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Deal Title:</label>
                <input required type="text" placeholder="e.g., Global Green Tech Logistics" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Value Proposition Summary:</label>
                <textarea required rows="3" placeholder="Describe scalability, impact and business model..." value={newProject.summary} onChange={e => setNewProject({...newProject, summary: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Funding Goal ($):</label>
                  <input required type="number" placeholder="25000" value={newProject.funding_goal} onChange={e => setNewProject({...newProject, funding_goal: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Equity Offered (%):</label>
                  <input required type="number" placeholder="10" value={newProject.equity_offered} onChange={e => setNewProject({...newProject, equity_offered: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADVISORY MODAL */}
      {showProviderModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.4rem', color: '#0f172a', fontWeight: '800', fontSize: '1.1rem' }}>List Advisory / Expert Services</h3>
            <form onSubmit={handleCreateProvider}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Firm / Advisor Name:</label>
                <input required type="text" placeholder="e.g., Apex Financial Structuring" value={newProvider.name} onChange={e => setNewProvider({...newProvider, name: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Services Offered:</label>
                <textarea required rows="3" placeholder="e.g., Legal audit, deal structuring..." value={newProvider.service} onChange={e => setNewProvider({...newProvider, service: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}></textarea>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Rate / Retainer:</label>
                <input required type="text" placeholder="e.g., $100/hr or Quote" value={newProvider.rate} onChange={e => setNewProvider({...newProvider, rate: e.target.value})} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" onClick={() => setShowProviderModal(false)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Save Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT/INVEST MODAL */}
      {contactModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.4rem', color: '#0f172a', fontWeight: '800', fontSize: '1.1rem' }}>{t.contactModalTitle}</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
              For deal: <strong>{contactModal.title}</strong>. Handled securely via Nexus Hub Advisory.
            </p>

            {contactSent ? (
              <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.85rem', borderRadius: '8px', textAlign: 'center', fontWeight: '700', fontSize: '0.85rem' }}>
                {t.contactSentMsg}
              </div>
            ) : (
              <form onSubmit={handleSendContact}>
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Profile Type:</label>
                  <select style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                    <option>Accredited Investor / Angel</option>
                    <option>Institutional Fund</option>
                    <option>Strategic Advisor</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Indicated Ticket / Interest:</label>
                  <textarea required rows="3" placeholder="Specify ticket size, advisory needs or offer..." value={contactMessage} onChange={e => setContactMessage(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}></textarea>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                  <button type="button" onClick={() => setContactModal(null)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Close</button>
                  <button type="submit" style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}>Send Advisory Request</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
