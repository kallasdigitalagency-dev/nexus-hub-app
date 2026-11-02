import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nuvzwidobettxbxmernr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnp3aWRvYmV0dHhieG1lcm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NTgyMDMsImV4cCI6MjEwODMzNDIwM30.-epQ2Dhb4g3j--l7GMvy21yT97EIS-BQRB7ravaRnvY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_EMAIL = 'kazima9891@gmail.com';

const TRANSLATIONS = {
  EN: {
    banner: "🌐 NEXUS HUB GLOBAL: Connecting Vetted International Capital with High-Growth Emerging Deals — Apply for Qualified Deal Flow & Junior Advisory Access.",
    heroTitle: "Global Cross-Border Investment & Advisory Marketplace",
    heroSubtitle: "A curated gateway for international investors, vetted deal flows, and junior deal advisory.",
    tabOpportunities: "Opportunities",
    tabAdvisory: "Advisory & Experts",
    tabAiStudio: "✨ AI Site Studio",
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
    contactSentMsg: "✓ Request submitted to Nexus Hub Deal Advisory team!",
    pkgStandardTitle: "Standard Deal Listing ($100)",
    pkgStandardDesc: "Basic vetting, compliance check & marketplace listing.",
    pkgPremiumTitle: "Premium Advisory + AI Showcase ($300)",
    pkgPremiumDesc: "Priority vetting, expert review & dedicated AI-generated landing page.",
    onboardingTitle: "Complete Your Profile Onboarding",
    onboardingSubtitle: "Help us match you with the right opportunities, capital, or experts.",
    btnSaveOnboarding: "Save & Enter Nexus Hub",
    aiStudioTitle: "AI Landing Page & Website Studio",
    aiStudioDesc: "Generate, customize, and preview professional vibecoder-grade landing pages for your vetted deals.",
    btnGenerateShowcase: "✨ Generate Professional Website"
  },
  FR: {
    banner: "🌐 NEXUS HUB GLOBAL : Connectez les capitaux internationaux aux opportunités émergentes à forte croissance — Accès qualifié & Conseil.",
    heroTitle: "Marketplace Mondiale d'Investissement & Conseil Transfrontalier",
    heroSubtitle: "Une passerelle internationale pour investisseurs, projets audités et accompagnement stratégique.",
    tabOpportunities: "Opportunités",
    tabAdvisory: "Conseils & Experts",
    tabAiStudio: "✨ Studio Vitrine IA",
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
    contactSentMsg: "✓ Demande transmise à l'équipe Conseil Nexus Hub !",
    pkgStandardTitle: "Publication Standard (100 $)",
    pkgStandardDesc: "Audit de base, vérification de conformité & publication marketplace.",
    pkgPremiumTitle: "Conseil Premium + Vitrine IA (300 $)",
    pkgPremiumDesc: "Audit prioritaire, revue d'expert & page vitrine IA dédiée générée automatiquement.",
    onboardingTitle: "Complétez votre Profil d'Onboarding",
    onboardingSubtitle: "Aidez-nous à cibler précisément vos attentes, compétences et objectifs.",
    btnSaveOnboarding: "Enregistrer & Accéder à Nexus Hub",
    aiStudioTitle: "Studio de Vitrine Web & Pitch IA",
    aiStudioDesc: "Générez, personnalisez et prévisualisez des sites web et landing pages professionnels pour vos projets.",
    btnGenerateShowcase: "✨ Générer le Site Web Pro"
  }
};

export default function NexusHubApp() {
  const [lang, setLang] = useState('EN');
  const t = TRANSLATIONS[lang];

  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Entrepreneur');
  const [authError, setAuthError] = useState('');

  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    stage: 'Seed / Amorce',
    category: 'Mobility & Logistics',
    targetGoal: '50000',
    needs: 'Financial Structuring & Due Diligence',
    investorType: 'Business Angel',
    ticketSize: '10,000 - 50,000 USD',
    preferredSectors: 'Technology & EV Mobility',
    expertise: 'Financial Modeling & Valuation',
    serviceRate: '$75/hour or Project Retainer',
    geoZone: 'Emerging Markets / East Africa'
  });

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
      status: 'verified',
      package: 'Premium',
      hasWebsite: true
    }
  ]);

  const [providers, setProviders] = useState([
    { id: 'p1', name: 'Global Tech & Structuring Agency', service: 'Full-stack Web/Mobile Architecture & Advisory', rate: 'Retainer / Quote', contact_person: 'Tech Advisory', status: 'verified' },
    { id: 'p2', name: 'Cross-Border Financial Advisory', service: 'Financial modeling, valuation & due diligence support', rate: '$75/hour', contact_person: 'Senior Analyst', status: 'verified' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [contactModal, setContactModal] = useState(null);
  const [showWebsiteModal, setShowWebsiteModal] = useState(null);
  const [moderationNotice, setModerationNotice] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    summary: '',
    category: 'Technology',
    funding_goal: '',
    equity_offered: '',
    package: 'Standard'
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        const metaRole = session.user?.user_metadata?.role;
        if (metaRole) setUserRole(metaRole);
        if (session.user?.user_metadata?.onboarded) setIsOnboarded(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.user_metadata?.role) {
        setUserRole(session.user.user_metadata.role);
      }
      if (session?.user?.user_metadata?.onboarded) {
        setIsOnboarded(true);
      }
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
        options: { data: { role: userRole, onboarded: false } }
      });
      if (error) setAuthError(error.message);
      else {
        alert(lang === 'EN' ? 'Account created! Please complete your onboarding.' : 'Compte créé ! Veuillez compléter votre onboarding.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(lang === 'EN' ? 'Invalid email or password.' : 'Identifiants incorrects.');
    }
  };

  const handleCompleteOnboarding = async (e) => {
    e.preventDefault();
    setIsOnboarded(true);
    try {
      await supabase.auth.updateUser({
        data: { role: userRole, onboarding: onboardingData, onboarded: true }
      });
    } catch (err) {
      console.warn('Local onboarding state saved');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOnboarded(false);
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

    const isPremium = newProject.package === 'Premium';

    const created = {
      id: Date.now().toString(),
      ...newProject,
      funding_goal: Number(newProject.funding_goal),
      amount_raised: 0,
      equity_offered: Number(newProject.equity_offered),
      stage: isPremium ? 'Premium Advisory & Showcase' : 'Standard Listing',
      currency: 'USD',
      owner: session?.user?.email || 'Global Founder',
      status: 'verified',
      hasWebsite: true
    };

    try {
      await supabase.from('projects').insert([created]);
    } catch (err) {
      console.warn('Local save');
    }

    setProjects([created, ...projects]);
    setShowModal(false);
    setModerationNotice('');
    setNewProject({ title: '', summary: '', category: 'Technology', funding_goal: '', equity_offered: '', package: 'Standard' });
  };

  const handleGenerateWebsite = (projectId) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, hasWebsite: true };
      }
      return p;
    }));
    alert(lang === 'EN' ? 'Professional Vibecoder Website generated successfully!' : 'Site web pro généré avec succès !');
  };

  const handleSendContact = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactModal(null);
    }, 2000);
  };

  const isAdmin = session?.user?.email?.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();

  // 1. Auth Screen
  if (!session) {
    return (
      <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
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
                  <option value="Entrepreneur">{t.roleEntrepreneur}</option>
                  <option value="Investor">{t.roleInvestor}</option>
                  <option value="Advisor">{t.roleAdvisor}</option>
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

  // 2. Onboarding Questionnaire Screen
  if (!isOnboarded) {
    return (
      <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', fontWeight: '800', color: '#0866ff' }}>{t.onboardingTitle}</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>{t.onboardingSubtitle} ({userRole})</p>

          <form onSubmit={handleCompleteOnboarding}>
            {userRole === 'Entrepreneur' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Project Stage / Stade :</label>
                  <select value={onboardingData.stage} onChange={e => setOnboardingData({...onboardingData, stage: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <option>Idea / Idée</option>
                    <option>Seed / Amorce</option>
                    <option>Growth / Croissance</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Primary Needs / Besoins prioritaires :</label>
                  <input type="text" value={onboardingData.needs} onChange={e => setOnboardingData({...onboardingData, needs: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </>
            )}

            {userRole === 'Investor' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Investor Type / Type d'investisseur :</label>
                  <select value={onboardingData.investorType} onChange={e => setOnboardingData({...onboardingData, investorType: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <option>Business Angel</option>
                    <option>Family Office</option>
                    <option>Institutional VC</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Target Ticket Size / Taille de ticket :</label>
                  <input type="text" value={onboardingData.ticketSize} onChange={e => setOnboardingData({...onboardingData, ticketSize: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </>
            )}

            {userRole === 'Advisor' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Expertise Domain / Domaine d'expertise :</label>
                  <input type="text" value={onboardingData.expertise} onChange={e => setOnboardingData({...onboardingData, expertise: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Rate / Modèle tarifaire :</label>
                  <input type="text" value={onboardingData.serviceRate} onChange={e => setOnboardingData({...onboardingData, serviceRate: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </>
            )}

            <button type="submit" style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '1rem' }}>
              {t.btnSaveOnboarding}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const myProjects = projects.filter(p => p.owner === session.user.email);

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
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

      {/* Marquee Banner */}
      <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0.6rem 0', fontSize: '0.85rem', fontWeight: '700', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 28s linear infinite' }}>
          {t.banner}
        </div>
      </div>

      {/* Header & Navigation */}
      <header style={{ backgroundColor: '#ffffff', padding: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', gap: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem' }}>N</div>
          <h1 style={{ fontSize: '1.3rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '700', verticalAlign: 'super' }}>GLOBAL</span></h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'projects' ? '2px solid #0866ff' : 'none' }}>{t.tabOpportunities}</button>
          <button onClick={() => setActiveTab('providers')} style={{ background: 'none', border: 'none', color: activeTab === 'providers' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'providers' ? '2px solid #0866ff' : 'none' }}>{t.tabAdvisory}</button>
          <button onClick={() => setActiveTab('ai_builder')} style={{ background: 'none', border: 'none', color: activeTab === 'ai_builder' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'ai_builder' ? '2px solid #0866ff' : 'none' }}>{t.tabAiStudio}</button>
          <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', borderBottom: activeTab === 'dashboard' ? '2px solid #0866ff' : 'none' }}>{t.tabDashboard} ({myProjects.length})</button>
          
          {isAdmin && (
            <button onClick={() => setActiveTab('admin')} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>
              {t.tabAdmin}
            </button>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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

      {/* Hero Section */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '3.5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>{t.heroTitle}</h2>
        <p style={{ color: '#94a3b8', maxWidth: '700px', margin: '0 auto 1.5rem auto', fontSize: '1.05rem', lineHeight: '1.5' }}>
          {t.heroSubtitle}
        </p>
        <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '600' }}>
          Role: <strong>{userRole}</strong> | User: <strong>{session.user.email}</strong> {isAdmin && <span style={{ color: '#ff9900' }}>(Admin)</span>}
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1rem' }}>
        
        {/* Tab 1: Opportunities */}
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
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => setContactModal(p)} style={{ flex: 1, backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                            {t.btnInvest}
                          </button>
                          {p.hasWebsite && (
                            <button onClick={() => setShowWebsiteModal(p)} style={{ backgroundColor: '#f1f5f9', color: '#0866ff', border: '1px solid #cbd5e1', padding: '0.7rem 0.9rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }} title="View Pro Website">
                              🌐 Web
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* Tab 2: Advisory & Experts */}
        {activeTab === 'providers' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>Junior Deal Advisory & Experts</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Vetted legal, financial, and tech partners for cross-border deal structuring.</p>
              </div>
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

        {/* Tab 3: Dedicated AI Site Studio (Vibecoder Pro Website Generator) */}
        {activeTab === 'ai_builder' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ maxWidth: '700px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0866ff', margin: '0 0 0.5rem 0' }}>{t.aiStudioTitle}</h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.5' }}>{t.aiStudioDesc}</p>
            </div>

            {myProjects.length === 0 ? (
              <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>You need an active project listing to generate a professional vibecoder website.</p>
                <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  {t.btnSubmitProject}
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {myProjects.map(p => (
                  <div key={p.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{p.category}</span>
                      <h4 style={{ fontSize: '1.1rem', margin: '0.75rem 0 0.5rem 0', fontWeight: '800' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>{p.summary}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button onClick={() => handleGenerateWebsite(p.id)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                        {t.btnGenerateShowcase}
                      </button>
                      <button onClick={() => setShowWebsiteModal(p)} style={{ backgroundColor: '#ffffff', color: '#0866ff', border: '1px solid #0866ff', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                        🌐 Live Pro Website Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Dashboard (Strictly Tailored by Role) */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', margin: 0, fontWeight: '800' }}>My Dashboard ({userRole} Space)</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Personalized interface for your role.</p>
            </div>

            {/* Entrepreneur Dashboard View */}
            {userRole === 'Entrepreneur' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#0866ff' }}>🚀 Founder Control Panel</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Manage your deal applications and professional website showcases.</p>
                  <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    {t.btnSubmitProject}
                  </button>
                </div>

                <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#0866ff' }}>📊 My Active Submissions ({myProjects.length})</h4>
                  {myProjects.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>No submissions yet.</p>
                  ) : (
                    myProjects.map(p => (
                      <div key={p.id} style={{ fontSize: '0.85rem', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div><strong>{p.title}</strong> — <span style={{ color: '#16a34a' }}>{p.status}</span></div>
                        <button onClick={() => setShowWebsiteModal(p)} style={{ background: 'none', border: 'none', color: '#0866ff', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>View Website</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Investor Dashboard View */}
            {userRole === 'Investor' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#0866ff' }}>💼 Investor Deal Pipeline</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Browse vetted opportunities matching your ticket size.</p>
                  <button onClick={() => setActiveTab('projects')} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Browse Vetted Deals
                  </button>
                </div>
              </div>
            )}

            {/* Advisor Dashboard View */}
            {userRole === 'Advisor' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', color: '#0866ff' }}>🤝 Junior Advisory CRM</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Manage your structuring missions and client intros.</p>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modal: Submit Project & Select Pricing Package */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>{t.btnSubmitProject}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '700' }}>✕</button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: '1.4' }}>
              {t.advisoryNotice}
            </p>

            {moderationNotice && (
              <div style={{ backgroundColor: moderationNotice.includes('⚠️') ? '#fef2f2' : '#eff6ff', color: moderationNotice.includes('⚠️') ? '#991b1b' : '#1e40af', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600' }}>
                {moderationNotice}
              </div>
            )}

            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '0.9rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Project Title:</label>
                <input required type="text" placeholder="e.g. Green Transit Logistics" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
              </div>

              <div style={{ marginBottom: '0.9rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Summary / Value Proposition:</label>
                <textarea required rows="3" placeholder="Briefly describe your scalable venture..." value={newProject.summary} onChange={e => setNewProject({...newProject, summary: e.target.value})} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.9rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Category:</label>
                  <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                    <option>Technology</option>
                    <option>Mobility & Logistics</option>
                    <option>Media & Education</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Target Goal (USD):</label>
                  <input required type="number" placeholder="50000" value={newProject.funding_goal} onChange={e => setNewProject({...newProject, funding_goal: e.target.value})} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Equity Offered (%):</label>
                <input required type="number" placeholder="10" value={newProject.equity_offered} onChange={e => setNewProject({...newProject, equity_offered: e.target.value})} style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
              </div>

              {/* Pricing Package Selection */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>Select Submission & Advisory Package:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div 
                    onClick={() => setNewProject({...newProject, package: 'Standard'})} 
                    style={{ border: newProject.package === 'Standard' ? '2px solid #0866ff' : '1px solid #cbd5e1', borderRadius: '10px', padding: '0.75rem', cursor: 'pointer', backgroundColor: newProject.package === 'Standard' ? '#eff6ff' : '#ffffff' }}
                  >
                    <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0866ff' }}>{t.pkgStandardTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.3rem' }}>{t.pkgStandardDesc}</div>
                  </div>

                  <div 
                    onClick={() => setNewProject({...newProject, package: 'Premium'})} 
                    style={{ border: newProject.package === 'Premium' ? '2px solid #0866ff' : '1px solid #cbd5e1', borderRadius: '10px', padding: '0.75rem', cursor: 'pointer', backgroundColor: newProject.package === 'Premium' ? '#eff6ff' : '#ffffff' }}
                  >
                    <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0866ff' }}>{t.pkgPremiumTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.3rem' }}>{t.pkgPremiumDesc}</div>
                  </div>
                </div>
              </div>

              <button type="submit" style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' }}>
                Submit & Pay Fee
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Immersive Pro Vibecoder Website Preview */}
      {showWebsiteModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#090d16', color: '#f8fafc', borderRadius: '20px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            {/* Browser Header Bar */}
            <div style={{ backgroundColor: '#0f172a', padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.5rem', fontFamily: 'monospace' }}>https://{showWebsiteModal.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.nexushubglobal.com</span>
              </div>
              <button onClick={() => setShowWebsiteModal(null
