-- Seed components from Components.md

-- Planks (Category: 'plank')
-- Ironwood Plank (Common)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Ironwood Plank', 'plank', 1, (SELECT id FROM materials WHERE name = 'Ironwood'), 2, 30);

-- Silverwood Plank (Uncommon)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Silverwood Plank', 'plank', 2, (SELECT id FROM materials WHERE name = 'Silverwood'), 2, 45);

-- Goldwood Plank (Rare)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Goldwood Plank', 'plank', 3, (SELECT id FROM materials WHERE name = 'Goldwood'), 2, 60);

-- Mithrilwood Plank (Epic)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Mithrilwood Plank', 'plank', 4, (SELECT id FROM materials WHERE name = 'Mithrilwood'), 2, 90);

-- Arcanewood Plank (Legendary)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Arcanewood Plank', 'plank', 5, (SELECT id FROM materials WHERE name = 'Arcanewood'), 2, 120);

-- Ingots (Category: 'ingot')
-- Iron Ingot (Common)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Iron Ingot', 'ingot', 1, (SELECT id FROM materials WHERE name = 'Iron Ore'), 3, 45);

-- Silver Ingot (Uncommon)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Silver Ingot', 'ingot', 2, (SELECT id FROM materials WHERE name = 'Silver Ore'), 3, 60);

-- Gold Ingot (Rare)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Gold Ingot', 'ingot', 3, (SELECT id FROM materials WHERE name = 'Gold Ore'), 3, 90);

-- Mithril Ingot (Epic)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Mithril Ingot', 'ingot', 4, (SELECT id FROM materials WHERE name = 'Mithril Ore'), 3, 120);

-- Truesilver Ingot (Legendary)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Truesilver Ingot', 'ingot', 5, (SELECT id FROM materials WHERE name = 'Truesilver Ore'), 3, 180);

-- Filleted Fish (Category: 'fillet')
-- Perch Fillet (Common)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Perch Fillet', 'fillet', 1, (SELECT id FROM materials WHERE name = 'Raw Perch'), 1, 15);

-- Salmon Fillet (Uncommon)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Salmon Fillet', 'fillet', 2, (SELECT id FROM materials WHERE name = 'Raw Salmon'), 1, 20);

-- Tuna Fillet (Rare)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Tuna Fillet', 'fillet', 3, (SELECT id FROM materials WHERE name = 'Raw Tuna'), 1, 30);

-- Swordfish Fillet (Epic)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Swordfish Fillet', 'fillet', 4, (SELECT id FROM materials WHERE name = 'Raw Swordfish'), 1, 45);

-- Beluga Fillet (Legendary)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Beluga Fillet', 'fillet', 5, (SELECT id FROM materials WHERE name = 'Raw Beluga'), 1, 60);

-- Herbal Extracts (Category: 'extract')
-- Lavender Extract (Common)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Lavender Extract', 'extract', 1, (SELECT id FROM materials WHERE name = 'Lavender'), 3, 30);

-- Sage Extract (Uncommon)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Sage Extract', 'extract', 2, (SELECT id FROM materials WHERE name = 'Sage'), 3, 45);

-- Ginseng Extract (Rare)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Ginseng Extract', 'extract', 3, (SELECT id FROM materials WHERE name = 'Ginseng'), 3, 60);

-- Mandrake Extract (Epic)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Mandrake Extract', 'extract', 4, (SELECT id FROM materials WHERE name = 'Mandrake'), 3, 90);

-- Dragon's Blood Extract (Legendary)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Dragon''s Blood Extract', 'extract', 5, (SELECT id FROM materials WHERE name = 'Dragon''s Blood'), 3, 120);

-- Rope (Category: 'rope')
-- Hemp Rope (Common)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Hemp Rope', 'rope', 1, (SELECT id FROM materials WHERE name = 'Ironwood'), 5, 40);

-- Twisted Rope (Uncommon)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Twisted Rope', 'rope', 2, (SELECT id FROM materials WHERE name = 'Silverwood'), 5, 50);

-- Braided Rope (Rare)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Braided Rope', 'rope', 3, (SELECT id FROM materials WHERE name = 'Goldwood'), 5, 70);

-- Reinforced Rope (Epic)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Reinforced Rope', 'rope', 4, (SELECT id FROM materials WHERE name = 'Mithrilwood'), 5, 100);

-- Enchanted Rope (Legendary)
INSERT INTO components (name, category, rarity_id, base_material_id, base_material_quantity, processing_time)
VALUES ('Enchanted Rope', 'rope', 5, (SELECT id FROM materials WHERE name = 'Arcanewood'), 5, 150);
