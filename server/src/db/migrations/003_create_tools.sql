-- Create tools table (reference data for crafting stations and tools)
CREATE TABLE IF NOT EXISTS tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,  -- 'station', 'tool'
    tier INTEGER NOT NULL DEFAULT 1,  -- 1=basic, 2=advanced, 3=master
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
