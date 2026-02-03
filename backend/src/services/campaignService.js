const Campaign = require('../models/Campaign');

const createCampaign = async (data) => {
    const campaign = new Campaign(data);
    return await campaign.save();
};

const getAllCampaigns = async (filters = {}) => {
    return await Campaign.find(filters).sort({ createdAt: -1 });
};

const getCampaignById = async (id) => {
    return await Campaign.findById(id);
};

const updateCampaignStatus = async (id, status) => {
    return await Campaign.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
};

const getCampaignStats = async (id) => {
    const campaign = await Campaign.findById(id);
    if (!campaign) return null;

    const ctr = campaign.impressions > 0
        ? (campaign.clicks / campaign.impressions) * 100
        : 0;

    const cpc = campaign.clicks > 0
        ? campaign.budget / campaign.clicks
        : 0;

    return {
        ctr: parseFloat(ctr.toFixed(2)),
        cpc: parseFloat(cpc.toFixed(2)),
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        budget: campaign.budget
    };
};

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaignStatus,
    getCampaignStats
};
