-- Create components table (reference data for craftable components)
CREATE TABLE IF NOT EXISTS components (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,  -- 'plank', 'ingot', 'fillet', 'extract', 'rope'
    rarity_id INTEGER NOT NULL,
    base_material_id INTEGER REFERENCES materials(id),
    base_material_quantity INTEGER NOT NULL,
    processing_time INTEGER NOT NULL,  -- In seconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_components_category ON components(category);
CREATE INDEX IF NOT EXISTS idx_components_rarity ON components(rarity_id);
CREATE INDEX IF NOT EXISTS idx_components_material ON components(base_material_id);

-- Add constraint to ensure rarity_id is valid
ALTER TABLE components ADD CONSTRAINT check_component_rarity_range CHECK (rarity_id >= 1 AND rarity_id <= 5);
