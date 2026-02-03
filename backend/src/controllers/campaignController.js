const campaignService = require('../services/campaignService');
const { createCampaignSchema, updateStatusSchema } = require('../utils/validation');

const create = async (req, res) => {
    try {
        const { error } = createCampaignSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const campaign = await campaignService.createCampaign(req.body);
        res.status(201).json(campaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const list = async (req, res) => {
    try {
        const campaigns = await campaignService.getAllCampaigns();
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const get = async (req, res) => {
    try {
        const campaign = await campaignService.getCampaignById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { error } = updateStatusSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const campaign = await campaignService.updateCampaignStatus(req.params.id, req.body.status);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const stats = async (req, res) => {
    try {
        const statistics = await campaignService.getCampaignStats(req.params.id);
        if (!statistics) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(statistics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    create,
    list,
    get,
    updateStatus,
    stats
};
