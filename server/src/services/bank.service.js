const bankModel = require('../models/bank.model');
const pool = require('../config/database');

// Get all user inventory organized by type
const getUserInventory = async (userId) => {
  const [materials, components, items, tools, consumables] = await Promise.all([
    bankModel.getUserMaterials(userId),
    bankModel.getUserComponents(userId),
    bankModel.getUserItems(userId),
    bankModel.getUserTools(userId),
    bankModel.getUserConsumables(userId),
  ]);

  return {
    materials,
    components,
    items,
    tools,
    consumables,
  };
};

// Initialize starter inventory for new users
const initializeStarterInventory = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Give starter tools (basic tier 1 tools and stations)
    const starterTools = [
      { name: 'Workbench', quantity: 1 },
      { name: 'Saw', quantity: 1 },
      { name: 'Furnace', quantity: 1 },
      { name: 'Cutting Board', quantity: 1 },
      { name: 'Knife', quantity: 1 },
      { name: 'Mortar and Pestle', quantity: 1 },
      { name: 'Spinning Wheel', quantity: 1 },
    ];

    for (const tool of starterTools) {
      const toolResult = await client.query(
        'SELECT id FROM tools WHERE name = $1',
        [tool.name]
      );

      if (toolResult.rows.length > 0) {
        await client.query(
          `INSERT INTO player_banks (user_id, item_type, item_id, quantity)
           VALUES ($1, 'tool', $2, $3)
           ON CONFLICT (user_id, item_type, item_id) DO NOTHING`,
          [userId, toolResult.rows[0].id, tool.quantity]
        );
      }
    }

    // Give some starter consumables
    const starterConsumables = [
      { name: 'Coal', quantity: 10 },
      { name: 'Water', quantity: 10 },
      { name: 'Sandpaper', quantity: 5 },
    ];

    for (const consumable of starterConsumables) {
      const consumableResult = await client.query(
        'SELECT id FROM consumables WHERE name = $1',
        [consumable.name]
      );

      if (consumableResult.rows.length > 0) {
        await client.query(
          `INSERT INTO player_banks (user_id, item_type, item_id, quantity)
           VALUES ($1, 'consumable', $2, $3)
           ON CONFLICT (user_id, item_type, item_id) DO NOTHING`,
          [userId, consumableResult.rows[0].id, consumable.quantity]
        );
      }
    }

    // Optionally give some starter materials to test with
    const starterMaterials = [
      { name: 'Ironwood', quantity: 10 },
      { name: 'Iron Ore', quantity: 10 },
    ];

    for (const material of starterMaterials) {
      const materialResult = await client.query(
        'SELECT id FROM materials WHERE name = $1',
        [material.name]
      );

      if (materialResult.rows.length > 0) {
        await client.query(
          `INSERT INTO player_banks (user_id, item_type, item_id, quantity)
           VALUES ($1, 'material', $2, $3)
           ON CONFLICT (user_id, item_type, item_id) DO NOTHING`,
          [userId, materialResult.rows[0].id, material.quantity]
        );
      }
    }

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Add items to user's bank (used by farming/crafting)
const addItemsToBank = async (userId, items) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const item of items) {
      await bankModel.addItem(userId, item.type, item.id, item.quantity);
    }

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Remove items from user's bank (used by crafting)
const removeItemsFromBank = async (userId, items) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // First check if user has all required items
    for (const item of items) {
      const hasEnough = await bankModel.hasItem(userId, item.type, item.id, item.quantity);
      if (!hasEnough) {
        throw new Error(`Insufficient ${item.type}: ${item.name || item.id}`);
      }
    }

    // If all checks pass, remove the items
    for (const item of items) {
      await bankModel.removeItem(userId, item.type, item.id, item.quantity);
    }

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Check if user can craft a component (has all requirements)
const canCraftComponent = async (userId, componentId) => {
  // Get component requirements
  const requirementsQuery = `
    SELECT cr.requirement_type, cr.requirement_name, cr.quantity,
           c.base_material_id, c.base_material_quantity
    FROM component_requirements cr
    JOIN components c ON cr.component_id = c.id
    WHERE cr.component_id = $1
  `;

  const result = await pool.query(requirementsQuery, [componentId]);
  const requirements = result.rows;

  // Get base material requirement
  const componentQuery = `
    SELECT base_material_id, base_material_quantity
    FROM components
    WHERE id = $1
  `;

  const componentResult = await pool.query(componentQuery, [componentId]);
  const component = componentResult.rows[0];

  const missing = [];

  // Check base material
  const hasMaterial = await bankModel.hasItem(
    userId,
    'material',
    component.base_material_id,
    component.base_material_quantity
  );

  if (!hasMaterial) {
    const materialName = await pool.query(
      'SELECT name FROM materials WHERE id = $1',
      [component.base_material_id]
    );
    missing.push({
      type: 'material',
      name: materialName.rows[0].name,
      required: component.base_material_quantity,
      current: await bankModel.getItemQuantity(userId, 'material', component.base_material_id)
    });
  }

  // Check tools and consumables
  for (const req of requirements) {
    let itemId;

    if (req.requirement_type === 'tool') {
      const toolResult = await pool.query(
        'SELECT id FROM tools WHERE name = $1',
        [req.requirement_name]
      );
      itemId = toolResult.rows[0]?.id;
    } else {
      const consumableResult = await pool.query(
        'SELECT id FROM consumables WHERE name = $1',
        [req.requirement_name]
      );
      itemId = consumableResult.rows[0]?.id;
    }

    if (itemId) {
      const hasReq = await bankModel.hasItem(userId, req.requirement_type, itemId, req.quantity);
      if (!hasReq) {
        missing.push({
          type: req.requirement_type,
          name: req.requirement_name,
          required: req.quantity,
          current: await bankModel.getItemQuantity(userId, req.requirement_type, itemId)
        });
      }
    }
  }

  return {
    canCraft: missing.length === 0,
    missing,
  };
};

module.exports = {
  getUserInventory,
  initializeStarterInventory,
  addItemsToBank,
  removeItemsFromBank,
  canCraftComponent,
};
