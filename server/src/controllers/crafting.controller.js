const craftingService = require('../services/crafting.service');

// Get all components
const getComponents = async (req, res, next) => {
  try {
    const { category } = req.query;

    const components = await craftingService.getAllComponents(category);

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

// Get component details with requirements
const getComponentDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { componentId } = req.params;

    const details = await craftingService.getComponentDetails(
      parseInt(componentId),
      userId
    );

    res.json({
      success: true,
      data: details,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COMPONENT_NOT_FOUND',
          message: error.message,
        },
      });
    }

    next(error);
  }
};

// Start crafting a component
const startCrafting = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { componentId } = req.body;

    if (!componentId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Component ID is required',
        },
      });
    }

    const session = await craftingService.startCrafting(userId, componentId);

    res.status(201).json({
      success: true,
      data: {
        session: {
          id: session.id,
          componentId: session.component_id,
          status: session.status,
          startedAt: session.started_at,
          readyAt: session.ready_at,
          resultQuantity: session.result_quantity,
        },
      },
      message: 'Crafting started',
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COMPONENT_NOT_FOUND',
          message: error.message,
        },
      });
    }

    if (error.message.includes('Missing requirements')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_REQUIREMENTS',
          message: error.message,
        },
      });
    }

    next(error);
  }
};

// Get active crafting sessions
const getActiveSessions = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const sessions = await craftingService.getActiveSessions(userId);

    res.json({
      success: true,
      data: {
        sessions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Collect component from crafting session
const collectCrafting = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sessionId } = req.params;

    const result = await craftingService.collectCrafting(userId, parseInt(sessionId));

    res.json({
      success: true,
      data: {
        component: result.component,
        quantity: result.quantity,
      },
      message: `Crafted ${result.quantity}x ${result.component.name}!`,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: error.message,
        },
      });
    }

    if (error.message.includes('not your') || error.message.includes('not ready')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ACTION',
          message: error.message,
        },
      });
    }

    next(error);
  }
};

// Cancel crafting session
const cancelCrafting = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sessionId } = req.params;

    const result = await craftingService.cancelCrafting(userId, parseInt(sessionId));

    res.json({
      success: true,
      data: result,
      message: 'Crafting session cancelled',
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: error.message,
        },
      });
    }

    if (error.message.includes('Cannot cancel') || error.message.includes('not your')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ACTION',
          message: error.message,
        },
      });
    }

    next(error);
  }
};

// Get crafting history
const getCraftingHistory = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const result = await craftingService.getCraftingHistory(userId, limit, offset);

    res.json({
      success: true,
      data: {
        sessions: result.sessions,
        total: result.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getComponents,
  getComponentDetails,
  startCrafting,
  getActiveSessions,
  collectCrafting,
  cancelCrafting,
  getCraftingHistory,
};
