const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// POST /campaigns - Créer une nouvelle campagne
router.post('/', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /campaigns - Lister toutes les campagnes avec pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = {};
    if (status && ['active', 'paused', 'finished'].includes(status)) {
      query.status = status;
    }
    
    const campaigns = await Campaign.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Campaign.countDocuments(query);
    
    res.json({
      data: campaigns,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /campaigns/:id - Détails d'une campagne
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campagne non trouvée' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /campaigns/:id/status - Mettre à jour le statut
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'paused', 'finished'].includes(status)) {
      return res.status(400).json({ error: 'Statut invalide. Doit être: active, paused ou finished' });
    }
    
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campagne non trouvée' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /campaigns/:id/stats - Obtenir les statistiques (CTR, CPC)
router.get('/:id/stats', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campagne non trouvée' });
    }
    
    // Calcul du CTR (Click-Through Rate)
    const ctr = campaign.impressions > 0 
      ? (campaign.clicks / campaign.impressions) * 100 
      : 0;
    
    // Calcul du CPC (Cost Per Click)
    const cpc = campaign.clicks > 0 
      ? campaign.budget / campaign.clicks 
      : 0;
    
    res.json({
      ctr: parseFloat(ctr.toFixed(2)),
      cpc: parseFloat(cpc.toFixed(2)),
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      budget: campaign.budget,
      campaignId: campaign._id,
      campaignName: campaign.name
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
