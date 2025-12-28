-- Seed placeholder items for future expansion

-- Ironwood Shield (Common item)
INSERT INTO items (name, category, rarity_id, description) VALUES
('Ironwood Shield', 'armor', 1, 'A sturdy shield crafted from ironwood planks. Provides basic protection.');

-- Insert requirements for Ironwood Shield
INSERT INTO item_requirements (item_id, component_id, quantity) VALUES
((SELECT id FROM items WHERE name = 'Ironwood Shield'),
 (SELECT id FROM components WHERE name = 'Ironwood Plank'),
 4);

-- Iron Sword (Uncommon item)
INSERT INTO items (name, category, rarity_id, description) VALUES
('Iron Sword', 'weapon', 2, 'A well-balanced sword forged from iron ingots. A reliable weapon for any adventurer.');

-- Insert requirements for Iron Sword
INSERT INTO item_requirements (item_id, component_id, quantity) VALUES
((SELECT id FROM items WHERE name = 'Iron Sword'),
 (SELECT id FROM components WHERE name = 'Iron Ingot'),
 3),
((SELECT id FROM items WHERE name = 'Iron Sword'),
 (SELECT id FROM components WHERE name = 'Hemp Rope'),
 1);

-- Golden Amulet (Rare item)
INSERT INTO items (name, category, rarity_id, description) VALUES
('Golden Amulet', 'accessory', 3, 'An elegant amulet crafted from gold ingots and ginseng extract. Said to bring good fortune.');

-- Insert requirements for Golden Amulet
INSERT INTO item_requirements (item_id, component_id, quantity) VALUES
((SELECT id FROM items WHERE name = 'Golden Amulet'),
 (SELECT id FROM components WHERE name = 'Gold Ingot'),
 2),
((SELECT id FROM items WHERE name = 'Golden Amulet'),
 (SELECT id FROM components WHERE name = 'Ginseng Extract'),
 1);
