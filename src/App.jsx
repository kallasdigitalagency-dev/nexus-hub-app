import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuration du client Supabase
const SUPABASE_URL = 'https://nuvzwidobettxbxmernr.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // À remplacer par votre clé publique
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
      owner: 'Willy B.'
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
      owner: 'Carlos K.'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    summary: '',
    category: 'Technologie',
    funding_goal: '',
    equity_offered: ''
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now().toString(),
      ...newProject,
      funding_goal: Number(newProject.funding_goal),
      equity_offered: Number(newProject.equity_offered),
      stage: 'Ébauche / Idée',
      currency: 'USD',
      owner: 'Entrepreneur'
    };
    setProjects([created, ...projects]);
    setShowModal(false);
    setNewProject({ title: '', summary: '', category: 'Technologie', funding_goal: '', equity_offered: '' });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      {/* HEADER / NAVIGATION */}
      <header style={{ backgroundColor: '#10345e', color: '#ffffff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: '#2563eb', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>N</div>
          <h1 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 'bold' }}>NEXUS HUB</h1>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => setActiveTab('projects')} style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? '#60a5fa' : '#ffffff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>Explorer les Projets</button>
          <button onClick={() => setActiveTab('providers')} style={{ background: 'none', border: 'none', color: activeTab === 'providers' ? '#60a5fa' : '#ffffff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>Prestataires & Experts</button>
          <button onClick={() => setActiveTab('investors')} style={{ background: 'none', border: 'none', color: activeTab === 'investors' ? '#60a5fa' : '#ffffff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>Investisseurs (Angels)</button>
        </nav>
        <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>+ Soumettre un Projet</button>
      </header>

      {/* BANNIÈRE PRINCIPALE */}
      <section style={{ backgroundColor: '#1e293b', color: '#ffffff', padding: '2.5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Connecter les idées au Capital et aux Compétences</h2>
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          La marketplace d'écosystème où les entrepreneurs vendent leurs idées/projets, trouvent des prestataires qualifiés et lèvent des fonds auprès d'investisseurs.
        </p>
      </section>

      {/* CONTENU PRINCIPAL */}
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Projets Récents & Opportunités d'Investissement</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Mobilité & Transport', 'Éducation / Média', 'Technologie'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  backgroundColor: selectedCategory === cat ? '#10345e' : '#e2e8f0', 
                  color: selectedCategory === cat ? '#ffffff' : '#334155',
                  border: 'none', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem',
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
              <div key={p.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb', backgroundColor: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{p.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Par {p.owner}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', color: '#0f172a' }}>{p.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.4', marginBottom: '1rem' }}>{p.summary}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ color: '#64748b' }}>Objectif :</div>
                      <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{p.funding_goal.toLocaleString()} {p.currency}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Actions offertes :</div>
                      <div style={{ fontWeight: 'bold', color: '#16a34a' }}>{p.equity_offered}%</div>
                    </div>
                  </div>
                  <button style={{ width: '100%', backgroundColor: '#10345e', color: '#ffffff', border: 'none', padding: '0.6rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
                    Investir / Proposer un service
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* MODALE POUR DEPOSER UN PROJET */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '10px', width: '90%', maxWidth: '500px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#10345e' }}>Soumettre un nouveau projet [FLASH]</h3>
            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Titre du projet :</label>
                <input required type="text" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Résumé du concept :</label>
                <textarea required rows="3" value={newProject.summary} onChange={e => setNewProject({...newProject, summary: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Recherche ($) :</label>
                  <input required type="number" value={newProject.funding_goal} onChange={e => setNewProject({...newProject, funding_goal: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>Capital offert (%) :</label>
                  <input required type="number" value={newProject.equity_offered} onChange={e => setNewProject({...newProject, equity_offered: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ backgroundColor: '#94a3b8', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Annuler</button>
                <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Publier l'idée</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
