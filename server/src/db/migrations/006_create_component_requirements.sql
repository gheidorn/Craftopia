-- Create component_requirements table (additional tools/consumables needed for crafting)
CREATE TABLE IF NOT EXISTS component_requirements (
    id SERIAL PRIMARY KEY,
    component_id INTEGER REFERENCES components(id) ON DELETE CASCADE,
    requirement_type VARCHAR(50) NOT NULL,  -- 'tool', 'consumable'
    requirement_name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_component_req_component ON component_requirements(component_id);
