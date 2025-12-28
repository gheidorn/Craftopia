-- Seed tools and crafting stations from Components.md

-- Crafting Stations
INSERT INTO tools (name, category, tier) VALUES
('Workbench', 'station', 1),
('Master Workbench', 'station', 3),
('Furnace', 'station', 1),
('Forge', 'station', 2),
('Master Forge', 'station', 3),
('Cutting Board', 'station', 1),
('Master Cutting Board', 'station', 3),
('Mortar and Pestle', 'station', 1),
('Alchemy Kit', 'station', 2),
('Master Alchemy Kit', 'station', 3),
('Spinning Wheel', 'station', 1),
('Master Spinning Wheel', 'station', 3);

-- Tools
INSERT INTO tools (name, category, tier) VALUES
('Saw', 'tool', 1),
('Fine Saw', 'tool', 2),
('Master Saw', 'tool', 3),
('Knife', 'tool', 1),
('Sharp Knife', 'tool', 2),
('Master Knife', 'tool', 3);
