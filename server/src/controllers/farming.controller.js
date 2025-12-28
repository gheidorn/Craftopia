const farmingService = require('../services/farming.service');

// Start a new farming session
const startFarming = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { materialCategory, durationMinutes } = req.body;

    if (!materialCategory || !durationMinutes) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'Material category and duration are required',
        },
      });
    }

    const session = await farmingService.startFarming(
      userId,
      materialCategory,
      durationMinutes
    );

    res.status(201).json({
      success: true,
      data: {
        session: {
          id: session.id,
          materialCategory: session.material_category,
          status: session.status,
          startedAt: session.started_at,
          readyAt: session.ready_at,
          durationSeconds: session.duration_seconds,
        },
      },
      message: 'Farming session started',
    });
  } catch (error) {
    if (error.message.includes('already have an active')) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'ACTIVE_SESSION_EXISTS',
          message: error.message,
        },
      });
    }

    if (error.message.includes('Invalid')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: error.message,
        },
      });
    }

    next(error);
  }
};

// Get active farming session
const getActiveSession = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const session = await farmingService.getActiveSession(userId);

    if (!session) {
      return res.json({
        success: true,
        data: {
          session: null,
        },
      });
    }

    // Calculate time remaining
    const now = new Date();
    const readyAt = new Date(session.ready_at);
    const timeRemaining = Math.max(0, Math.floor((readyAt - now) / 1000));

    res.json({
      success: true,
      data: {
        session: {
          id: session.id,
          materialCategory: session.material_category,
          status: session.status,
          startedAt: session.started_at,
          readyAt: session.ready_at,
          durationSeconds: session.duration_seconds,
          timeRemaining,
          resultMaterialId: session.result_material_id,
          resultQuantity: session.result_quantity,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Collect materials from farming session
const collectFarming = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sessionId } = req.params;

    const result = await farmingService.collectFarming(userId, parseInt(sessionId));

    res.json({
      success: true,
      data: {
        material: result.material,
        quantity: result.quantity,
      },
      message: `Collected ${result.quantity}x ${result.material.name}!`,
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

// Cancel farming session
const cancelFarming = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sessionId } = req.params;

    const result = await farmingService.cancelFarming(userId, parseInt(sessionId));

    res.json({
      success: true,
      data: result,
      message: 'Farming session cancelled',
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

// Get farming history
const getFarmingHistory = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const result = await farmingService.getFarmingHistory(userId, limit, offset);

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
  startFarming,
  getActiveSession,
  collectFarming,
  cancelFarming,
  getFarmingHistory,
};
