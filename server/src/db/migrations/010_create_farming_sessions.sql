-- Create farming_sessions table (active and completed farming sessions)
CREATE TABLE IF NOT EXISTS farming_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    material_category VARCHAR(50) NOT NULL,  -- 'wood', 'metal', 'fish', 'herb'
    status VARCHAR(20) NOT NULL,  -- 'active', 'ready', 'collected', 'cancelled'
    started_at TIMESTAMP NOT NULL,
    duration_seconds INTEGER NOT NULL,  -- How long they chose to farm
    ready_at TIMESTAMP NOT NULL,  -- When materials are ready to collect
    collected_at TIMESTAMP,
    result_material_id INTEGER REFERENCES materials(id),  -- Determined when ready
    result_quantity INTEGER,      -- Random 1-5 materials
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_farming_user ON farming_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_farming_status ON farming_sessions(status);
CREATE INDEX IF NOT EXISTS idx_farming_ready_at ON farming_sessions(ready_at);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_farming_sessions_updated_at
    BEFORE UPDATE ON farming_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
