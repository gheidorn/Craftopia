-- Create crafting_sessions table (active and completed crafting sessions)
CREATE TABLE IF NOT EXISTS crafting_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    component_id INTEGER REFERENCES components(id),
    status VARCHAR(20) NOT NULL,  -- 'active', 'ready', 'collected', 'cancelled', 'failed'
    started_at TIMESTAMP NOT NULL,
    ready_at TIMESTAMP NOT NULL,
    collected_at TIMESTAMP,
    result_quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_crafting_user ON crafting_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_crafting_status ON crafting_sessions(status);
CREATE INDEX IF NOT EXISTS idx_crafting_ready_at ON crafting_sessions(ready_at);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_crafting_sessions_updated_at
    BEFORE UPDATE ON crafting_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
