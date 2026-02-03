const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  advertiser: {
    type: String,
    required: [true, "L'annonceur est obligatoire"],
    trim: true,
    maxlength: [100, "Le nom de l'annonceur ne peut pas dépasser 100 caractères"]
  },
  budget: {
    type: Number,
    required: [true, 'Le budget est obligatoire'],
    min: [0, 'Le budget doit être positif ou nul']
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est obligatoire']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est obligatoire']
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'paused', 'finished'],
      message: 'Le statut doit être: active, paused ou finished'
    },
    default: 'active'
  },
  impressions: {
    type: Number,
    default: 0,
    min: [0, 'Les impressions ne peuvent pas être négatives']
  },
  clicks: {
    type: Number,
    default: 0,
    min: [0, 'Les clics ne peuvent pas être négatives']
  }
}, {
  timestamps: true
});

// Middleware pour mettre à jour le statut si la campagne est terminée
campaignSchema.pre('save', function(next) {
  if (this.endDate < new Date()) {
    this.status = 'finished';
  }
  next();
});

module.exports = mongoose.model('Campaign', campaignSchema);
