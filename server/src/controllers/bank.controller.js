const bankModel = require('../models/bank.model');
const bankService = require('../services/bank.service');

// Get all user inventory
const getBank = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const inventory = await bankService.getUserInventory(userId);
    const summary = await bankModel.getBankSummary(userId);

    res.json({
      success: true,
      data: {
        inventory,
        summary,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user materials only
const getMaterials = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { category } = req.query;

    const materials = await bankModel.getUserMaterials(userId, category);

    res.json({
      success: true,
      data: {
        materials,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user components only
const getComponents = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { category } = req.query;

    const components = await bankModel.getUserComponents(userId, category);

    res.json({
      success: true,
      data: {
        components,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user items only
const getItems = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const items = await bankModel.getUserItems(userId);

    res.json({
      success: true,
      data: {
        items,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user tools
const getTools = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const tools = await bankModel.getUserTools(userId);

    res.json({
      success: true,
      data: {
        tools,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user consumables
const getConsumables = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const consumables = await bankModel.getUserConsumables(userId);

    res.json({
      success: true,
      data: {
        consumables,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get bank summary
const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const summary = await bankModel.getBankSummary(userId);

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBank,
  getMaterials,
  getComponents,
  getItems,
  getTools,
  getConsumables,
  getSummary,
};
