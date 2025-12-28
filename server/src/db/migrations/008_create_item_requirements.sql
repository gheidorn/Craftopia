-- Create item_requirements table (components needed to craft items)
CREATE TABLE IF NOT EXISTS item_requirements (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    component_id INTEGER REFERENCES components(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_item_req_item ON item_requirements(item_id);
