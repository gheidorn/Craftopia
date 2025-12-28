-- Create materials table (reference data for game materials)
CREATE TABLE IF NOT EXISTS materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,  -- 'wood', 'metal', 'fish', 'herb'
    rarity_id INTEGER NOT NULL,     -- 1-5 (Common to Legendary)
    spawn_chance DECIMAL(5,2) NOT NULL,  -- 0.01 to 0.60
    vendor_value INTEGER NOT NULL,  -- In copper
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_materials_category ON materials(category);
CREATE INDEX IF NOT EXISTS idx_materials_rarity ON materials(rarity_id);

-- Add constraint to ensure rarity_id is valid (1-5)
ALTER TABLE materials ADD CONSTRAINT check_rarity_range CHECK (rarity_id >= 1 AND rarity_id <= 5);

-- Add constraint to ensure spawn_chance is valid
ALTER TABLE materials ADD CONSTRAINT check_spawn_chance CHECK (spawn_chance >= 0 AND spawn_chance <= 1);
