import React, { useState } from 'react';

export default function NexusHubApp() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState('All');
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
      owner: 'Willy B.',
      status: 'verified'
    },
    {
      id: '2',
      title: 'EduCraft Kids & Quiz Channel',
      summary: 'Plateforme et chaîne de contenu éducatif interactif pour enfants.',
      category: 'Éducation / Média',
      funding_goal: 5000,
      equity_offered: 10,
      stage: 'Lancement',
      currency: 'USD',
      owner: 'Carlos K.',
      status: 'verified'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [moderationNotice, setModerationNotice] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    summary: '',
    category: 'Technologie',
    funding_goal: '',
    equity_offered: ''
  });

  // Simulation de la modération automatique par IA
  const handleCreateProject = (e) => {
    e.preventDefault();
    setModerationNotice('Analyse du projet par le filtre de modération IA...');
    
    setTimeout(() => {
      // Mots interdits / test éthique simplifié
      const forbiddenTerms = ['spam', 'arnaque', 'casino', 'hack', 'illegal'];
      const isViolation = forbiddenTerms.some(term => 
        newProject.title.toLowerCase().includes(term) || 
        newProject.summary.toLowerCase().includes(term)
      );

      if (isViolation) {
        setModerationNotice('⚠️ Projet rejeté : Votre description contient des termes non conformes à la charte éthique.');
        return;
      }

      const created = {
        id: Date.now().toString(),
        ...newProject,
        funding_goal: Number(newProject.funding_goal),
        equity_offered: Number(newProject.equity_offered),
        stage: 'Ébauche / Idée',
        currency: 'USD',
        owner: 'Entrepreneur',
        status: 'verified'
      };

      setProjects([created, ...projects]);
      setShowModal(false);
      setModerationNotice('');
      setNewProject({ title: '', summary: '', category: 'Technologie', funding_goal: '', equity_offered: '' });
    }, 1000);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* HEADER / NAVIGATION (Inspiré Meta/Google) */}
      <header style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#0866ff', color: '#ffffff', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.3rem' }}>N</div>
          <h1 style={{ fontSize: '1.4rem', margin: 0, fontWeight: '800', color: '#0866ff', letterSpacing: '-0.5px' }}>NEXUS HUB</h1>
        </div>
        
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', borderBottom: activeTab === 'projects' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>Explorer les Projets</button>
          <button onClick={() => setActiveTab('providers')} style={{ background: 'none', border: 'none', color: activeTab === 'providers' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', borderBottom: activeTab === 'providers' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>Prestataires & Experts</button>
          <button onClick={() => setActiveTab('investors')} style={{ background: 'none', border: 'none', color: activeTab === 'investors' ? '#0866ff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', borderBottom: activeTab === 'investors' ? '2px solid #0866ff' : 'none', paddingBottom: '0.2rem' }}>Investisseurs (Angels)</button>
        </nav>

        {/* Bouton d'Action Orange Amazon */}
        <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#ff9900', color: '#131921', border: 'none', padding: '0.65rem 1.3rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(255,153,0,0.2)' }}>
          + Publier un Projet [FLASH]
        </button>
      </header>

      {/* BANNIÈRE HERO (Style Google Workspace) */}
      <section style={{ backgroundColor: '#131921', color: '#ffffff', padding: '3rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Connecter les idées au Capital et aux Compétences</h2>
        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '1.05rem', lineHeight: '1.5' }}>
          La marketplace d'écosystème sécurisée par IA où les entrepreneurs transforment leurs idées en entreprises avec le soutien d'investisseurs et d'experts.
        </p>
      </section>

      {/* CONTENU PRINCIPAL */}
      <main style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>Projets Vérifiés & Opportunités d'Investissement</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Mobilité & Transport', 'Éducation / Média', 'Technologie'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  backgroundColor: selectedCategory === cat ? '#0866ff' : '#e2e8f0', 
                  color: selectedCategory === cat ? '#ffffff' : '#475569',
                  border: 'none', 
                  padding: '0.45rem 0.9rem', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer' 
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLE DES PROJETS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {projects
            .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
            .map((p) => (
              <div key={p.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0866ff', backgroundColor: '#eff6ff', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>{p.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: '600', backgroundColor: '#f0fdf4', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>✓ Modéré IA</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', margin: '0.5rem 0', color: '#0f172a', fontWeight: '700' }}>{p.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '1.25rem' }}>{p.summary}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', padding: '0.85rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ color: '#64748b' }}>Objectif :</div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{p.funding_goal.toLocaleString()} {p.currency}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Capital offert :</div>
                      <div style={{ fontWeight: '700', color: '#16a34a' }}>{p.equity_offered}%</div>
                    </div>
                  </div>
                  <button style={{ width: '100%', backgroundColor: '#0866ff', color: '#ffffff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>
                    Investir / Offrir un Service
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* MODALE POUR DEPOSER UN PROJET AVEC MODERATION */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '520px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#0f172a', fontWeight: '800' }}>Soumettre une Idée [FLASH]</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>Chaque soumission est vérifiée automatiquement par notre filtre d'éthique IA avant publication.</p>
            
            {moderationNotice && (
              <div style={{ backgroundColor: moderationNotice.includes('⚠️') ? '#fef2f2' : '#eff6ff', color: moderationNotice.includes('⚠️') ? '#991b1b' : '#1e40af', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600' }}>
                {moderationNotice}
              </div>
            )}

            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Titre du projet :</label>
                <input required type="text" placeholder="Ex: Solution de recyclage urbain" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Résumé du concept :</label>
                <textarea required rows="3" placeholder="Décrivez la valeur de votre idée..." value={newProject.summary} onChange={e => setNewProject({...newProject, summary: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Recherche ($) :</label>
                  <input required type="number" placeholder="5000" value={newProject.funding_goal} onChange={e => setNewProject({...newProject, funding_goal: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Capital offert (%) :</label>
                  <input required type="number" placeholder="10" value={newProject.equity_offered} onChange={e => setNewProject({...newProject, equity_offered: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Annuler</button>
                <button type="submit" style={{ backgroundColor: '#ff9900', color: '#131921', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Soumettre à l'IA & Publier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
