-- Seed materials from Materials.md
-- Woods (Category: 'wood')
INSERT INTO materials (name, category, rarity_id, spawn_chance, vendor_value) VALUES
('Ironwood', 'wood', 1, 0.60, 25),
('Silverwood', 'wood', 2, 0.25, 100),
('Goldwood', 'wood', 3, 0.10, 350),
('Mithrilwood', 'wood', 4, 0.04, 1200),
('Arcanewood', 'wood', 5, 0.01, 5000);

-- Metals (Category: 'metal')
INSERT INTO materials (name, category, rarity_id, spawn_chance, vendor_value) VALUES
('Iron Ore', 'metal', 1, 0.60, 30),
('Silver Ore', 'metal', 2, 0.25, 120),
('Gold Ore', 'metal', 3, 0.10, 400),
('Mithril Ore', 'metal', 4, 0.04, 1500),
('Truesilver Ore', 'metal', 5, 0.01, 6000);

-- Fish (Category: 'fish')
INSERT INTO materials (name, category, rarity_id, spawn_chance, vendor_value) VALUES
('Raw Perch', 'fish', 1, 0.60, 20),
('Raw Salmon', 'fish', 2, 0.25, 80),
('Raw Tuna', 'fish', 3, 0.10, 300),
('Raw Swordfish', 'fish', 4, 0.04, 1000),
('Raw Beluga', 'fish', 5, 0.01, 4500);

-- Herbs (Category: 'herb')
INSERT INTO materials (name, category, rarity_id, spawn_chance, vendor_value) VALUES
('Lavender', 'herb', 1, 0.60, 15),
('Sage', 'herb', 2, 0.25, 60),
('Ginseng', 'herb', 3, 0.10, 250),
('Mandrake', 'herb', 4, 0.04, 900),
('Dragon''s Blood', 'herb', 5, 0.01, 3500);
