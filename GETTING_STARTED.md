# Getting Started with Craftopia

Welcome to Craftopia! This guide will help you get started with the game.

## Quick Start

### 1. Initial Setup

Make sure you have completed the installation steps in the main README.md:
- PostgreSQL database created and configured
- Dependencies installed (`npm run install:all`)
- Database migrations run (`npm run db:migrate`)
- Database seeded (`npm run db:seed`)

### 2. Start the Application

```bash
# From the root directory
npm run dev
```

This starts:
- **Server** on http://localhost:5000
- **Client** on http://localhost:3000

### 3. Create Your Account

1. Open http://localhost:3000 in your browser
2. Click "Register"
3. Enter username, email, and password
4. You'll automatically receive starter inventory:
   - **7 Basic Tools**: Workbench, Saw, Furnace, Cutting Board, Knife, Mortar and Pestle, Spinning Wheel
   - **Consumables**: 10x Coal, 10x Water, 5x Sandpaper
   - **Starter Materials**: 10x Ironwood, 10x Iron Ore

## Game Loop

### Step 1: Farming Materials

1. Go to the **Farming** page
2. Select a material category:
   - 🌲 **Wood** - Ironwood, Silverwood, Goldwood, Mithrilwood, Arcanewood
   - ⛏️ **Metal** - Iron Ore, Silver Ore, Gold Ore, Mithril Ore, Truesilver Ore
   - 🐟 **Fish** - Raw Perch, Salmon, Tuna, Swordfish, Beluga
   - 🌿 **Herb** - Lavender, Sage, Ginseng, Mandrake, Dragon's Blood

3. Choose duration (1-60 minutes)
   - **Longer sessions = Better rewards!**
   - See "Duration-Based Rewards" below
4. Click "Start Farming"
5. Wait for the countdown timer
6. Click "Collect Materials" when ready

**Duration-Based Rewards:**

Longer farming sessions provide significantly better rewards through:

**Quantity Multipliers:**
- 1-10 minutes: 1x (base: 1-5 materials)
- 11-20 minutes: 1.5x (1-7 materials)
- 21-30 minutes: 2x (2-10 materials)
- 31-45 minutes: 2.5x (2-12 materials)
- 46-60 minutes: 3x (3-15 materials)

**Rarity Chances:**

*Short Sessions (1-10 min):*
- Common 60% | Uncommon 25% | Rare 10% | Epic 4% | Legendary 1%

*Medium Sessions (11-30 min):*
- Common 50% | Uncommon 28% | Rare 14% | Epic 6% | Legendary 2%

*Long Sessions (31-60 min):*
- Common 35% | Uncommon 30% | Rare 20% | Epic 10% | Legendary 5%

**Example:** A 60-minute farming session has 5x better legendary odds and up to 3x more materials than a 5-minute session!

### Step 2: Check Your Bank

1. Go to the **Bank** page
2. Browse your inventory across 5 tabs:
   - **Materials** - Raw materials from farming
   - **Components** - Crafted items
   - **Items** - Finished products (coming soon)
   - **Tools** - Permanent crafting tools
   - **Consumables** - Materials consumed during crafting

### Step 3: Craft Components

1. Go to the **Crafting** page
2. Select a component category:
   - 🪵 **Planks** - Made from wood
   - ⚙️ **Ingots** - Made from metal ores
   - 🐟 **Fillets** - Made from fish
   - 🧪 **Extracts** - Made from herbs
   - 🪢 **Rope** - Made from wood

3. Find a component you can craft (green checkmark)
4. View requirements:
   - **Materials** - Consumed during crafting
   - **Tools** - Required but NOT consumed
   - **Consumables** - Consumed during crafting

5. Click "Craft" if you have all requirements
6. Wait for processing time (15s - 180s based on rarity)
7. Click "Collect Component" when ready

### Step 4: Repeat & Progress

- Farm more materials
- Craft higher rarity components
- Build up your inventory
- (Future) Craft items from components

## Tips & Tricks

### Farming Strategy

- **Short sessions (1-10 min)**: Quick materials (1x multiplier), base rarity odds
  - Good for: Testing, quick sessions, when you need just a few materials

- **Medium sessions (11-30 min)**: Better rewards (1.5-2x multiplier), improved rarity odds
  - Good for: Balanced play, moderate time investment, better chances at uncommon/rare

- **Long sessions (31-60 min)**: Best rewards (2.5-3x multiplier), excellent rarity odds
  - Good for: Maximum efficiency, hunting legendary materials, serious farming sessions
  - 5x better legendary chance than short sessions!

**Tip:** The time investment in long sessions pays off significantly with both quantity and quality!

### Crafting Strategy

- **Start with Common (Tier 1)**: Ironwood Planks, Iron Ingots
- **Requires basic tools only**: Workbench, Saw, Furnace
- **Use starter materials**: You have 10x Ironwood and 10x Iron Ore

### Your First Craft

**Ironwood Plank** (Common - 30 seconds):
- Requirements:
  - 2x Ironwood ✓ (you have 10)
  - 1x Workbench ✓ (starter tool)
  - 1x Saw ✓ (starter tool)
- Perfect first craft!

**Iron Ingot** (Common - 45 seconds):
- Requirements:
  - 3x Iron Ore ✓ (you have 10)
  - 1x Furnace ✓ (starter tool)
  - 1x Coal ✓ (you have 10)
- Another great starter craft!

### Resource Management

- **Tools are permanent** - Buy/obtain once, use forever
- **Materials are consumed** - Need to farm more
- **Consumables are consumed** - Stock up from farming/shops (future feature)

### Multiple Sessions

- **Farming**: Only 1 active session at a time
- **Crafting**: Multiple sessions can run simultaneously!
  - Start multiple crafts
  - Check back when timers are done
  - Collect all at once

## Understanding Rarities

Each material and component has a rarity level:

| Rarity | Color | Spawn Chance (Short/Medium/Long) | Example |
|--------|-------|----------------------------------|---------|
| Common | Gray | 60% / 50% / 35% | Ironwood, Iron Ore |
| Uncommon | Green | 25% / 28% / 30% | Silverwood, Silver Ore |
| Rare | Blue | 10% / 14% / 20% | Goldwood, Gold Ore |
| Epic | Purple | 4% / 6% / 10% | Mithrilwood, Mithril Ore |
| Legendary | Orange | 1% / 2% / 5% | Arcanewood, Truesilver Ore |

*Spawn chances based on farming duration: Short (1-10 min) / Medium (11-30 min) / Long (31-60 min)*

Higher rarities:
- Have better vendor values
- Require more complex crafting
- Take longer to process
- Need higher tier tools
- Much more common in long farming sessions!

## Game Features

### ✅ Implemented
- User registration and authentication
- Bank/inventory system (5 tabs)
- Farming system (4 categories)
- **Duration-based farming rewards** (longer sessions = better loot!)
- Crafting system (5 categories)
- 20 materials (4 categories × 5 rarities)
- 25 components (5 categories × 5 rarities)
- 18 tools and stations
- 19 consumables
- Multiple concurrent crafting sessions
- Live countdown timers
- Automatic bank updates
- Session management
- Notification system

### 🚧 Coming Soon
- Items system (craft items from components)
- Player trading
- Achievement system
- Quests
- Marketplace/Auction House
- More materials and components
- Enhanced UI features

## Troubleshooting

### Can't start farming
- Check if you already have an active farming session
- Only one farming session allowed at a time

### Can't craft
- Check requirements (red items are missing)
- Make sure you have enough materials
- Verify you have the required tools
- Ensure you have consumables

### Timer not updating
- Page polls every 5 seconds
- Refresh the page if needed
- Check browser console for errors

### Items not showing in bank
- Make sure you collected from farming/crafting
- Refresh the bank page
- Check the correct tab (Materials, Components, etc.)

## API Endpoints

For developers or testing:

### Health Check
```
GET http://localhost:5000/api/health
```

### Authentication
```
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login
GET http://localhost:5000/api/auth/me
```

### Bank
```
GET http://localhost:5000/api/bank
GET http://localhost:5000/api/bank/materials
GET http://localhost:5000/api/bank/components
```

### Farming
```
POST http://localhost:5000/api/farming/start
GET http://localhost:5000/api/farming/active
POST http://localhost:5000/api/farming/:id/collect
```

### Crafting
```
GET http://localhost:5000/api/crafting/components
POST http://localhost:5000/api/crafting/start
GET http://localhost:5000/api/crafting/active
POST http://localhost:5000/api/crafting/:id/collect
```

## Next Steps

1. **Farm materials** - Try all 4 categories
2. **Craft components** - Start with Common tier
3. **Build inventory** - Collect different rarities
4. **Experiment** - Try different farming durations
5. **Optimize** - Find your preferred gameplay style

Enjoy Craftopia! 🎮
