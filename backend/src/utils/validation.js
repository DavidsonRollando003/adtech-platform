const Joi = require('joi');

const createCampaignSchema = Joi.object({
    name: Joi.string().required().trim(),
    advertiser: Joi.string().required().trim(),
    budget: Joi.number().min(0).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required()
});

const updateStatusSchema = Joi.object({
    status: Joi.string().valid('active', 'paused', 'finished').required()
});

module.exports = {
    createCampaignSchema,
    updateStatusSchema
};
