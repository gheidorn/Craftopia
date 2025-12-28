-- Seed component requirements from Components.md

-- Planks Requirements
-- Ironwood Plank
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Ironwood Plank'), 'tool', 'Workbench', 1),
((SELECT id FROM components WHERE name = 'Ironwood Plank'), 'tool', 'Saw', 1);

-- Silverwood Plank
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Silverwood Plank'), 'tool', 'Workbench', 1),
((SELECT id FROM components WHERE name = 'Silverwood Plank'), 'tool', 'Saw', 1),
((SELECT id FROM components WHERE name = 'Silverwood Plank'), 'consumable', 'Sandpaper', 1);

-- Goldwood Plank
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Goldwood Plank'), 'tool', 'Workbench', 1),
((SELECT id FROM components WHERE name = 'Goldwood Plank'), 'tool', 'Fine Saw', 1),
((SELECT id FROM components WHERE name = 'Goldwood Plank'), 'consumable', 'Sandpaper', 1);

-- Mithrilwood Plank
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Mithrilwood Plank'), 'tool', 'Master Workbench', 1),
((SELECT id FROM components WHERE name = 'Mithrilwood Plank'), 'tool', 'Fine Saw', 1),
((SELECT id FROM components WHERE name = 'Mithrilwood Plank'), 'consumable', 'Sandpaper', 2);

-- Arcanewood Plank
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Arcanewood Plank'), 'tool', 'Master Workbench', 1),
((SELECT id FROM components WHERE name = 'Arcanewood Plank'), 'tool', 'Master Saw', 1),
((SELECT id FROM components WHERE name = 'Arcanewood Plank'), 'consumable', 'Sandpaper', 2),
((SELECT id FROM components WHERE name = 'Arcanewood Plank'), 'consumable', 'Enchanted Oil', 1);

-- Ingots Requirements
-- Iron Ingot
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Iron Ingot'), 'tool', 'Furnace', 1),
((SELECT id FROM components WHERE name = 'Iron Ingot'), 'consumable', 'Coal', 1);

-- Silver Ingot
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Silver Ingot'), 'tool', 'Furnace', 1),
((SELECT id FROM components WHERE name = 'Silver Ingot'), 'consumable', 'Coal', 2);

-- Gold Ingot
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Gold Ingot'), 'tool', 'Forge', 1),
((SELECT id FROM components WHERE name = 'Gold Ingot'), 'consumable', 'Coal', 2),
((SELECT id FROM components WHERE name = 'Gold Ingot'), 'consumable', 'Flux', 1);

-- Mithril Ingot
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Mithril Ingot'), 'tool', 'Master Forge', 1),
((SELECT id FROM components WHERE name = 'Mithril Ingot'), 'consumable', 'Coal', 3),
((SELECT id FROM components WHERE name = 'Mithril Ingot'), 'consumable', 'Flux', 2),
((SELECT id FROM components WHERE name = 'Mithril Ingot'), 'consumable', 'Quenching Oil', 1);

-- Truesilver Ingot
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Truesilver Ingot'), 'tool', 'Master Forge', 1),
((SELECT id FROM components WHERE name = 'Truesilver Ingot'), 'consumable', 'Coal', 4),
((SELECT id FROM components WHERE name = 'Truesilver Ingot'), 'consumable', 'Flux', 3),
((SELECT id FROM components WHERE name = 'Truesilver Ingot'), 'consumable', 'Quenching Oil', 2),
((SELECT id FROM components WHERE name = 'Truesilver Ingot'), 'consumable', 'Arcane Crystal', 1);

-- Filleted Fish Requirements
-- Perch Fillet
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Perch Fillet'), 'tool', 'Cutting Board', 1),
((SELECT id FROM components WHERE name = 'Perch Fillet'), 'tool', 'Knife', 1);

-- Salmon Fillet
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Salmon Fillet'), 'tool', 'Cutting Board', 1),
((SELECT id FROM components WHERE name = 'Salmon Fillet'), 'tool', 'Sharp Knife', 1);

-- Tuna Fillet
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Tuna Fillet'), 'tool', 'Cutting Board', 1),
((SELECT id FROM components WHERE name = 'Tuna Fillet'), 'tool', 'Sharp Knife', 1),
((SELECT id FROM components WHERE name = 'Tuna Fillet'), 'consumable', 'Ice', 1);

-- Swordfish Fillet
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Swordfish Fillet'), 'tool', 'Master Cutting Board', 1),
((SELECT id FROM components WHERE name = 'Swordfish Fillet'), 'tool', 'Master Knife', 1),
((SELECT id FROM components WHERE name = 'Swordfish Fillet'), 'consumable', 'Ice', 2);

-- Beluga Fillet
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Beluga Fillet'), 'tool', 'Master Cutting Board', 1),
((SELECT id FROM components WHERE name = 'Beluga Fillet'), 'tool', 'Master Knife', 1),
((SELECT id FROM components WHERE name = 'Beluga Fillet'), 'consumable', 'Ice', 3),
((SELECT id FROM components WHERE name = 'Beluga Fillet'), 'consumable', 'Preservative Salt', 1);

-- Herbal Extracts Requirements
-- Lavender Extract
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Lavender Extract'), 'tool', 'Mortar and Pestle', 1),
((SELECT id FROM components WHERE name = 'Lavender Extract'), 'consumable', 'Water', 1);

-- Sage Extract
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Sage Extract'), 'tool', 'Mortar and Pestle', 1),
((SELECT id FROM components WHERE name = 'Sage Extract'), 'consumable', 'Purified Water', 1);

-- Ginseng Extract
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Ginseng Extract'), 'tool', 'Alchemy Kit', 1),
((SELECT id FROM components WHERE name = 'Ginseng Extract'), 'consumable', 'Purified Water', 1),
((SELECT id FROM components WHERE name = 'Ginseng Extract'), 'consumable', 'Alcohol', 1);

-- Mandrake Extract
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Mandrake Extract'), 'tool', 'Master Alchemy Kit', 1),
((SELECT id FROM components WHERE name = 'Mandrake Extract'), 'consumable', 'Distilled Water', 1),
((SELECT id FROM components WHERE name = 'Mandrake Extract'), 'consumable', 'High-Grade Alcohol', 1),
((SELECT id FROM components WHERE name = 'Mandrake Extract'), 'consumable', 'Glass Vial', 1);

-- Dragon's Blood Extract
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Dragon''s Blood Extract'), 'tool', 'Master Alchemy Kit', 1),
((SELECT id FROM components WHERE name = 'Dragon''s Blood Extract'), 'consumable', 'Distilled Water', 1),
((SELECT id FROM components WHERE name = 'Dragon''s Blood Extract'), 'consumable', 'High-Grade Alcohol', 1),
((SELECT id FROM components WHERE name = 'Dragon''s Blood Extract'), 'consumable', 'Glass Vial', 2),
((SELECT id FROM components WHERE name = 'Dragon''s Blood Extract'), 'consumable', 'Enchanted Catalyst', 1);

-- Rope Requirements
-- Hemp Rope
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Hemp Rope'), 'tool', 'Spinning Wheel', 1);

-- Twisted Rope
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Twisted Rope'), 'tool', 'Spinning Wheel', 1),
((SELECT id FROM components WHERE name = 'Twisted Rope'), 'consumable', 'Wax', 1);

-- Braided Rope
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Braided Rope'), 'tool', 'Master Spinning Wheel', 1),
((SELECT id FROM components WHERE name = 'Braided Rope'), 'consumable', 'Wax', 1),
((SELECT id FROM components WHERE name = 'Braided Rope'), 'consumable', 'Resin', 1);

-- Reinforced Rope
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Reinforced Rope'), 'tool', 'Master Spinning Wheel', 1),
((SELECT id FROM components WHERE name = 'Reinforced Rope'), 'consumable', 'Wax', 2),
((SELECT id FROM components WHERE name = 'Reinforced Rope'), 'consumable', 'Resin', 2),
((SELECT id FROM components WHERE name = 'Reinforced Rope'), 'consumable', 'Metal Wire', 1);

-- Enchanted Rope
INSERT INTO component_requirements (component_id, requirement_type, requirement_name, quantity)
VALUES
((SELECT id FROM components WHERE name = 'Enchanted Rope'), 'tool', 'Master Spinning Wheel', 1),
((SELECT id FROM components WHERE name = 'Enchanted Rope'), 'consumable', 'Wax', 3),
((SELECT id FROM components WHERE name = 'Enchanted Rope'), 'consumable', 'Resin', 3),
((SELECT id FROM components WHERE name = 'Enchanted Rope'), 'consumable', 'Metal Wire', 2),
((SELECT id FROM components WHERE name = 'Enchanted Rope'), 'consumable', 'Enchanted Thread', 1);
