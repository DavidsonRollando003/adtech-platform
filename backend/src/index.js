const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const campaignRoutes = require('./routes/campaigns');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB connecté avec succès'))
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB:', err.message);
  process.exit(1);
});

// Routes de base
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes des campagnes
app.use('/api/campaigns', campaignRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('🔥 Erreur:', err.stack);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en cours d'exécution sur http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
