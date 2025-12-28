const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

const runSeeds = async () => {
  try {
    console.log('🌱 Seeding database with game data...\n');

    const seedsDir = path.join(__dirname, 'seeds');
    const seedFiles = fs.readdirSync(seedsDir).sort();

    for (const file of seedFiles) {
      if (file.endsWith('.sql')) {
        console.log(`   Seeding: ${file}`);
        const filePath = path.join(seedsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        await pool.query(sql);
        console.log(`   ✓ ${file} completed`);
      }
    }

    console.log('\n✅ All seeds completed successfully');
    console.log('\nDatabase Statistics:');

    const materialCount = await pool.query('SELECT COUNT(*) FROM materials');
    const componentCount = await pool.query('SELECT COUNT(*) FROM components');
    const toolCount = await pool.query('SELECT COUNT(*) FROM tools');
    const consumableCount = await pool.query('SELECT COUNT(*) FROM consumables');

    console.log(`   📦 Materials: ${materialCount.rows[0].count}`);
    console.log(`   🔧 Components: ${componentCount.rows[0].count}`);
    console.log(`   🛠️  Tools: ${toolCount.rows[0].count}`);
    console.log(`   💧 Consumables: ${consumableCount.rows[0].count}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
};

runSeeds();
