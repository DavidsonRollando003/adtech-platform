const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/', campaignController.create);
router.get('/', campaignController.list);
router.get('/:id', campaignController.get);
router.patch('/:id/status', campaignController.updateStatus);
router.get('/:id/stats', campaignController.stats);

module.exports = router;
