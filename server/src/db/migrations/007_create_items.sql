-- Create items table (future item definitions)
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    rarity_id INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_items_rarity ON items(rarity_id);

-- Add constraint to ensure rarity_id is valid
ALTER TABLE items ADD CONSTRAINT check_item_rarity_range CHECK (rarity_id >= 1 AND rarity_id <= 5);
