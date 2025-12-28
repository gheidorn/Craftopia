const pool = require('../config/database');

// Get all items
const getAllItems = async () => {
  const query = `
    SELECT
      id,
      name,
      category,
      rarity_id,
      description,
      created_at
    FROM items
    ORDER BY rarity_id DESC, name
  `;

  const result = await pool.query(query);
  return result.rows;
};

// Get item by ID
const getItemById = async (itemId) => {
  const query = `
    SELECT
      id,
      name,
      category,
      rarity_id,
      description,
      created_at
    FROM items
    WHERE id = $1
  `;

  const result = await pool.query(query, [itemId]);
  return result.rows[0] || null;
};

// Get item requirements (components needed to craft)
const getItemRequirements = async (itemId) => {
  const query = `
    SELECT
      ir.id,
      ir.quantity,
      c.id as component_id,
      c.name as component_name,
      c.category as component_category,
      c.rarity_id as component_rarity
    FROM item_requirements ir
    JOIN components c ON ir.component_id = c.id
    WHERE ir.item_id = $1
    ORDER BY c.rarity_id DESC
  `;

  const result = await pool.query(query, [itemId]);
  return result.rows;
};

module.exports = {
  getAllItems,
  getItemById,
  getItemRequirements,
};
