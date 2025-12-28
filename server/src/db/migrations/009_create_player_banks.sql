-- Create player_banks table (player inventory storage)
CREATE TABLE IF NOT EXISTS player_banks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL,  -- 'material', 'component', 'item', 'tool', 'consumable'
    item_id INTEGER NOT NULL,        -- References materials/components/items/tools/consumables
    quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_type, item_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_player_banks_user ON player_banks(user_id);
CREATE INDEX IF NOT EXISTS idx_player_banks_item_type ON player_banks(item_type);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_player_banks_updated_at
    BEFORE UPDATE ON player_banks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraint to ensure quantity is non-negative
ALTER TABLE player_banks ADD CONSTRAINT check_quantity_positive CHECK (quantity >= 0);
