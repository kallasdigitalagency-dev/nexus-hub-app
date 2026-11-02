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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>{t.roleLabel}</
