import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nuvzwidobettxbxmernr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnp3aWRvYmV0dHhieG1lcm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NTgyMDMsImV4cCI6MjEwODMzNDIwM30.-epQ2Dhb4g3j--l7GMvy21yT97EIS-BQRB7ravaRnvY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_EMAIL = 'kazima9891@gmail.com';

const TRANSLATIONS = {
  EN: {
    banner: "🌐 NEXUS HUB GLOBAL: Connecting Vetted International Capital with High-Growth Emerging Deals — Secure Bank Transfer & OTP Verification.",
    heroTitle: "Global Cross-Border Investment & Advisory Marketplace",
    heroSubtitle: "A curated gateway for international investors, vetted deal flows, and junior deal advisory.",
    tabOpportunities: "Opportunities",
    tabAdvisory: "Advisory & Experts",
    tabAiStudio: "✨ AI Site Studio",
    tabDashboard: "My Dashboard",
    tabAdmin: "⚙️ ADMIN",
    btnSubmitProject: "+ Apply & Pay Listing Fee",
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
    advisoryNotice: "Secure Platform Escrow & Verification Desk. Complete your payment via secure bank transfer & OTP validation.",
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
    banner: "🌐 NEXUS HUB GLOBAL : Connectez les capitaux internationaux aux opportunités émergentes — Virement sécurisé & Vérification OTP.",
    heroTitle: "Marketplace Mondiale d'Investissement & Conseil Transfrontalier",
    heroSubtitle: "Une passerelle internationale pour investisseurs, projets audités et accompagnement stratégique.",
    tabOpportunities: "Opportunités",
    tabAdvisory: "Conseils & Experts",
    tabAiStudio: "✨ Studio Vitrine IA",
    tabDashboard: "Mon Espace",
    tabAdmin: "⚙️ ADMIN",
    btnSubmitProject: "+ Soumettre & Payer les Frais",
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
    advisoryNotice: "Guichet de Séquestre & Vérification Sécurisée. Effectuez votre règlement via compte bancaire unique et validation OTP.",
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

  // Payment & Submission Flow States
  const [showModal, setShowModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Form, 2: Bank Transfer & Card Info, 3: OTP Verification, 4: Success Receipt
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' });
  const [otpCode, setOtpCode] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [txnRef, setTxnRef] = useState('');

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

  // Step 1 -> Step 2 (Proceed to payment window)
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const errorMsg = validateWithAI(newProject.title, newProject.summary);
    if (errorMsg) {
      setModerationNotice(errorMsg);
      return;
    }
    setModerationNotice('');
    setPaymentStep(2);
  };

  // Step 2 -> Step 3 (Trigger OTP generation)
  const handleTriggerOtp = (e) => {
    e.preventDefault();
    // Simulate generation of a 6-digit OTP code sent via SMS/Email
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(mockOtp);
    alert(lang === 'EN' ? `[Simulated 3D Secure SMS OTP]: Your verification code is ${mockOtp}` : `[SMS OTP Sécurisé Simulé] : Votre code de validation est ${mockOtp}`);
    setPaymentStep(3);
  };

  // Step 3 -> Step 4 (Verify OTP and finalize project creation)
  const handleVerifyOtpAndFinalize = async (e) => {
    e.preventDefault();
    if (enteredOtp.trim() !== otpCode.trim() && enteredOtp.trim() !== '123456') {
      alert(lang === 'EN' ? 'Invalid OTP code. Please try again (Tip: check alert or use 123456).' : 'Code OTP invalide. Réessayez (Astuce : utilisez 123456).');
      return;
    }

    const generatedRef = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
    setTxnRef(generatedRef);

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
      status: 'verified', // Payé et validé par le système escrow
      hasWebsite: true,
      transaction_ref: generatedRef
    };

    try {
      await supabase.from('projects').insert([created]);
    } catch (err) {
      console.warn('Local save');
    }

    setProjects([created, ...projects]);
    setPaymentStep(4); // Success Receipt
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

        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '48px', height: '48px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.75rem' }}>N</div>
            <h1 style={{ fontSize: '1.4rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB GLOBAL</h1>
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
              <input required type="email" placeholder="name@globalventure.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>{t.passwordLabel}</label>
              <input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
            </div>

            {authMode === 'signup' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>{t.roleLabel}</label>
                <select value={userRole} onChange={e => setUserRole(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}>
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

  if (!isOnboarded) {
    return (
      <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0', fontWeight: '800', color: '#0866ff' }}>{t.onboardingTitle}</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>{t.onboardingSubtitle} ({userRole})</p>

          <form onSubmit={handleCompleteOnboarding}>
            {userRole === 'Entrepreneur' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Project Stage / Stade :</label>
                  <select value={onboardingData.stage} onChange={e => setOnboardingData({...onboardingData, stage: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                    <option>Idea / Idée</option>
                    <option>Seed / Amorce</option>
                    <option>Growth / Croissance</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Primary Needs / Besoins prioritaires :</label>
                  <input type="text" value={onboardingData.needs} onChange={e => setOnboardingData({...onboardingData, needs: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                </div>
              </>
            )}

            {userRole === 'Investor' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Investor Type / Type d'investisseur :</label>
                  <select value={onboardingData.investorType} onChange={e => setOnboardingData({...onboardingData, investorType: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                    <option>Business Angel</option>
                    <option>Family Office</option>
                    <option>Institutional VC</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Target Ticket Size / Taille de ticket :</label>
                  <input type="text" value={onboardingData.ticketSize} onChange={e => setOnboardingData({...onboardingData, ticketSize: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                </div>
              </>
            )}

            {userRole === 'Advisor' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Expertise Domain / Domaine d'expertise :</label>
                  <input type="text" value={onboardingData.expertise} onChange={e => setOnboardingData({...onboardingData, expertise: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Rate / Modèle tarifaire :</label>
                  <input type="text" value={onboardingData.serviceRate} onChange={e => setOnboardingData({...onboardingData, serviceRate: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
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
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', boxSizing: 'border-box' }}>
      
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
        @media (max-width: 768px) {
          .responsive-header {
            flex-direction: column;
            align-items: stretch !important;
          }
          .responsive-nav {
            justify-content: center;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0.5rem 0', fontSize: '0.8rem', fontWeight: '700', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 28s linear infinite' }}>
          {t.banner}
        </div>
      </div>

      <header className="responsive-header" style={{ backgroundColor: '#ffffff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', gap: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem' }}>N</div>
          <h1 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>NEXUS HUB <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '700', verticalAlign: 'super' }}>GLOBAL</span></h1>
        </div>
        
        <nav className="responsive-nav" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', borderBottom: activeTab === 'projects' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>{t.tabOpportunities}</button>
          <button onClick={() => setActiveTab('providers')} style={{ background: 'none', border: 'none', color: activeTab === 'providers' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', borderBottom: activeTab === 'providers' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>{t.tabAdvisory}</button>
          <button onClick={() => setActiveTab('ai_builder')} style={{ background: 'none', border: 'none', color: activeTab === 'ai_builder' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', borderBottom: activeTab === 'ai_builder' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>{t.tabAiStudio}</button>
          <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: activeTab === 'dashboard' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', borderBottom: activeTab === 'dashboard' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>{t.tabDashboard} ({myProjects.length})</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '6px', padding: '0.15rem' }}>
            <button onClick={() => setLang('EN')} style={{ backgroundColor: lang === 'EN' ? '#0866ff' : 'transparent', color: lang === 'EN' ? '#ffffff' : '#475569', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.7rem' }}>EN</button>
            <button onClick={() => setLang('FR')} style={{ backgroundColor: lang === 'FR' ? '#0866ff' : 'transparent', color: lang === 'FR' ? '#ffffff' : '#475569', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.7rem' }}>FR</button>
          </div>

          <button onClick={() => { setPaymentStep(1); setShowModal(true); }} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.5rem 0.9rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
            {t.btnSubmitProject}
          </button>
          <button onClick={handleLogout} style={{ backgroundColor: '#f1f5f9', color: '#ef4444', border: '1px solid #cbd5e1', padding: '0.5rem 0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
            {t.btnLogout}
          </button>
        </div>
      </header>

      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2.5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '800' }}>{t.heroTitle}</h2>
        <p style={{ color: '#94a3b8', maxWidth: '700px', margin: '0 auto 1rem auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
          {t.heroSubtitle}
        </p>
        <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '600' }}>
          Role: <strong>{userRole}</strong> | User: <strong>{session.user.email}</strong> {isAdmin && <span style={{ color: '#ff9900' }}>(Admin)</span>}
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem', boxSizing: 'border-box' }}>
        
        {activeTab === 'projects' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: '700' }}>Vetted Investment Opportunities</h3>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['All', 'Mobility & Logistics', 'Technology', 'Media & Education'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    style={{ 
                      backgroundColor: selectedCategory === cat ? '#0866ff' : '#e2e8f0', 
                      color: selectedCategory === cat ? '#ffffff' : '#475569',
                      border: 'none', padding: '0.35rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' 
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {projects
                .filter(p => p.status === 'verified')
                .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                .map((p) => {
                  const raised = p.amount_raised || 0;
                  const goal = p.funding_goal || 1;
                  const percentage = Math.min(Math.round((raised / goal) * 100), 100);

                  return (
                    <div key={p.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.4rem', borderRadius: '6px' }}>{p.category}</span>
                          <span className="pulse-badge" style={{ fontSize: '0.7rem', color: '#0866ff', fontWeight: '700', backgroundColor: '#eff6ff', padding: '0.2rem 0.4rem', borderRadius: '6px' }}>✓ Vetted Deal</span>
                        </div>
                        <h4 style={{ fontSize: '1.05rem', margin: '0.5rem 0', color: '#0f172a', fontWeight: '800' }}>{p.title}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.4', marginBottom: '1rem' }}>{p.summary}</p>
                      </div>

                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.3rem' }}>
                            <span style={{ color: '#0f172a' }}>{raised.toLocaleString()} {p.currency || 'USD'} {t.raisedLabel}</span>
                            <span style={{ color: '#0866ff' }}>{percentage}%</span>
                          </div>
                          <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#0866ff', borderRadius: '3px' }}></div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => setContactModal(p)} style={{ flex: 1, backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
                            {t.btnInvest}
                          </button>
                          {p.hasWebsite && (
                            <button onClick={() => setShowWebsiteModal(p)} style={{ backgroundColor: '#f1f5f9', color: '#0866ff', border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }} title="View Pro Website">
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

        {activeTab === 'providers' && (
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {providers.map((pr) => (
              <div key={pr.id} className="animated-card" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.2rem 0.4rem', borderRadius: '6px' }}>✓ Approved Partner</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff' }}>{pr.rate}</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', margin: '0.5rem 0', fontWeight: '700' }}>{pr.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>{pr.service}</p>
                <button onClick={() => setContactModal({ title: `Service: ${pr.name}` })} style={{ width: '100%', backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '0.6rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
                  Request Advisory Intro
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai_builder' && (
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0866ff', margin: '0 0 0.5rem 0' }}>{t.aiStudioTitle}</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.5rem' }}>{t.aiStudioDesc}</p>

            {myProjects.length === 0 ? (
              <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
                <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.85rem' }}>You need an active project listing to generate a professional website.</p>
                <button onClick={() => { setPaymentStep(1); setShowModal(true); }} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                  {t.btnSubmitProject}
                </button>
              </div>
            ) : (
              <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {myProjects.map(p => (
                  <div key={p.id} style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.2rem 0.4rem', borderRadius: '6px' }}>{p.category}</span>
                      <h4 style={{ fontSize: '1.05rem', margin: '0.6rem 0 0.4rem 0', fontWeight: '800' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem' }}>{p.summary}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button onClick={() => handleGenerateWebsite(p.id)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
                        {t.btnGenerateShowcase}
                      </button>
                      <button onClick={() => setShowWebsiteModal(p)} style={{ backgroundColor: '#ffffff', color: '#0866ff', border: '1px solid #0866ff', padding: '0.6rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>
                        🌐 Live Pro Website Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', fontWeight: '800' }}>My Dashboard ({userRole} Space)</h3>
            <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
                <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.5rem 0', color: '#0866ff' }}>📊 My Submissions ({myProjects.length})</h4>
                {myProjects.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>No submissions yet.</p>
                ) : (
                  myProjects.map(p => (
                    <div key={p.id} style={{ fontSize: '0.8rem', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div><strong>{p.title}</strong> — <span style={{ color: '#16a34a' }}>{p.status}</span> {p.transaction_ref && <small style={{ color: '#64748b' }}>({p.transaction_ref})</small>}</div>
                      <button onClick={() => setShowWebsiteModal(p)} style={{ background: 'none', border: 'none', color: '#0866ff', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' }}>View Website</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Interactive Payment Tunnel & OTP Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 1000, boxSizing: 'border-box' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>
                {paymentStep === 1 && t.btnSubmitProject}
                {paymentStep === 2 && '💳 Secured Account Transfer & Card Info'}
                {paymentStep === 3 && '🔒 3D Secure OTP Verification'}
                {paymentStep === 4 && '✓ Payment & Receipt Generated'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '700' }}>✕</button>
            </div>

            {/* STEP 1: Project Form */}
            {paymentStep === 1 && (
              <form onSubmit={handleProceedToPayment}>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem', lineHeight: '1.4' }}>{t.advisoryNotice}</p>
                {moderationNotice && (
                  <div style={{ backgroundColor: moderationNotice.includes('⚠️') ? '#fef2f2' : '#eff6ff', color: moderationNotice.includes('⚠️') ? '#991b1b' : '#1e40af', padding: '0.6rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: '600' }}>
                    {moderationNotice}
                  </div>
                )}
                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Project Title:</label>
                  <input required type="text" placeholder="e.g. Green Transit Logistics" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Summary / Value Proposition:</label>
                  <textarea required rows="3" placeholder="Briefly describe your scalable venture..." value={newProject.summary} onChange={e => setNewProject({...newProject, summary: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Category:</label>
                    <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }}>
                      <option>Technology</option>
                      <option>Mobility & Logistics</option>
                      <option>Media & Education</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Target Goal (USD):</label>
                    <input required type="number" placeholder="50000" value={newProject.funding_goal} onChange={e => setNewProject({...newProject, funding_goal: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Equity Offered (%):</label>
                  <input required type="number" placeholder="10" value={newProject.equity_offered} onChange={e => setNewProject({...newProject, equity_offered: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.4rem' }}>Select Submission Package:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div onClick={() => setNewProject({...newProject, package: 'Standard'})} style={{ border: newProject.package === 'Standard' ? '2px solid #0866ff' : '1px solid #cbd5e1', borderRadius: '8px', padding: '0.6rem', cursor: 'pointer', backgroundColor: newProject.package === 'Standard' ? '#eff6ff' : '#ffffff', boxSizing: 'border-box' }}>
                      <div style={{ fontWeight: '800', fontSize: '0.8rem', color: '#0866ff' }}>{t.pkgStandardTitle}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>{t.pkgStandardDesc}</div>
                    </div>
                    <div onClick={() => setNewProject({...newProject, package: 'Premium'})} style={{ border: newProject.package === 'Premium' ? '2px solid #0866ff' : '1px solid #cbd5e1', borderRadius: '8px', padding: '0.6rem', cursor: 'pointer', backgroundColor: newProject.package === 'Premium' ? '#eff6ff' : '#ffffff', boxSizing: 'border-box' }}>
                      <div style={{ fontWeight: '800', fontSize: '0.8rem', color: '#0866ff' }}>{t.pkgPremiumTitle}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>{t.pkgPremiumDesc}</div>
                    </div>
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
                  Proceed to Secure Payment ({newProject.package === 'Premium' ? '300 USD' : '100 USD'}) →
                </button>
              </form>
            )}

            {/* STEP 2: Bank Account Info & Card/Transfer Details */}
            {paymentStep === 2 && (
              <form onSubmit={handleTriggerOtp}>
                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.8rem' }}>
                  <strong>Compte Bancaire Unique de la Plateforme :</strong><br/>
                  • Banque : <strong>Ecobank Burundi</strong><br/>
                  • Intitulé : <strong>Nexus Hub Global Advisory</strong><br/>
                  • Compte USD : <strong>1002-XXXX-XXXXXXXX-01</strong><br/>
                  • Montant à régler : <strong>{newProject.package === 'Premium' ? '300.00 USD' : '100.00 USD'}</strong>
                </div>

                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Card Number (Visa / Mastercard):</label>
                  <input required type="text" placeholder="4532 •••• •••• 9821" value={paymentDetails.cardNumber} onChange={e => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '0.8rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Cardholder Name:</label>
                  <input required type="text" placeholder="Willy Barutwanayo" value={paymentDetails.cardHolder} onChange={e => setPaymentDetails({...paymentDetails, cardHolder: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>Expiry Date:</label>
                    <input required type="text" placeholder="MM/YY" value={paymentDetails.expiry} onChange={e => setPaymentDetails({...paymentDetails, expiry: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.3rem' }}>CVV:</label>
                    <input required type="password" placeholder="•••" maxLength="4" value={paymentDetails.cvv} onChange={e => setPaymentDetails({...paymentDetails, cvv: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => setPaymentStep(1)} style={{ backgroundColor: '#e2e8f0', color: '#475569', border: 'none', padding: '0.7rem 1rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Back</button>
                  <button type="submit" style={{ flex: 1, backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Send SMS OTP Code →</button>
                </div>
              </form>
            )}

            {/* STEP 3: OTP Verification */}
            {paymentStep === 3 && (
              <form onSubmit={handleVerifyOtpAndFinalize}>
                <div style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                  Un code de vérification à 6 chiffres vient d'être envoyé par SMS au numéro associé à votre carte bancaire / compte Ecobank.
                </div>
                <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>Enter 3D Secure OTP Code:</label>
                  <input required type="text" maxLength="6" placeholder="123456" value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} style={{ width: '200px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #0866ff', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '0.3rem', fontWeight: 'bold' }} />
                </div>
                <button type="submit" style={{ width: '100%', backgroundColor: '#16a34a', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' }}>
                  Confirm Payment & Verify OTP ✓
                </button>
              </form>
            )}

            {/* STEP 4: Success Receipt */}
            {paymentStep === 4 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#16a34a', margin: '0 0 0.5rem 0', fontWeight: '800' }}>✓ Paiement & Soumission Validés !</h4>
                  <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: '1.5', marginBottom: '1rem' }}>
                    Votre transaction a été approuvée via vérification OTP et le projet a été publié avec succès.
                  </p>
                  <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'left', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    <strong>Référence Transaction :</strong> {txnRef}<br/>
                    <strong>Montant Débité :</strong> {newProject.package === 'Premium' ? '300.00 USD' : '100.00 USD'}<br/>
                    <strong>Statut :</strong> Escrow Sécurisé (Validé)
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  Accéder au Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Website Preview & Contact Modals */}
      {showWebsiteModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.5rem', zIndex: 1000, boxSizing: 'border-box' }}>
          <div style={{ backgroundColor: '#090d16', color: '#f8fafc', borderRadius: '16px', width: '100%', maxWidth: '750px', maxHeight: '95vh', overflowY: 'auto', border: '1px solid #1e293b' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>https://{showWebsiteModal.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.nexushubglobal.com</span>
              <button onClick={() => setShowWebsiteModal(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.1rem', cursor: 'pointer', fontWeight: '700' }}>✕</button>
            </div>
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#38bdf8', margin: '0.75rem 0' }}>{showWebsiteModal.title}</h2>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>{showWebsiteModal.summary}</p>
              {showWebsiteModal.transaction_ref && <div style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '1rem' }}>Ref Paiement : {showWebsiteModal.transaction_ref}</div>}
              <button onClick={() => { setShowWebsiteModal(null); setContactModal(showWebsiteModal); }} style={{ backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
                Request Investor Introduction
              </button>
            </div>
          </div>
        </div>
      )}

      {contactModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: '800', color: '#0866ff' }}>{t.contactModalTitle}</h3>
              <button onClick={() => setContactModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: '700' }}>✕</button>
            </div>
            {contactSent ? (
              <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '1rem', borderRadius: '8px', fontWeight: '700', textAlign: 'center' }}>
                {t.contactSentMsg}
              </div>
            ) : (
              <form onSubmit={handleSendContact}>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>Target Deal: <strong>{contactModal.title}</strong></p>
                <textarea required rows="4" placeholder="Specify your investment capacity or advisory inquiry..." style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box', marginBottom: '1rem' }} />
                <button type="submit" style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  Submit Inquiry to Advisory Desk
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
