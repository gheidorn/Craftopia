# Craftopia

A time-based crafting game where players farm for materials, craft components, and create items.

## Project Structure

This is a monorepo containing both the React frontend and Node.js backend:

- `/client` - React frontend application
- `/server` - Express backend API
- `/docs` - Game design documentation (Materials.md, Components.md)

## Technology Stack

- **Frontend:** React 18, React Router, Axios, Context API
- **Backend:** Node.js, Express, PostgreSQL
- **Authentication:** JWT tokens
- **Database:** PostgreSQL with pg driver

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- PostgreSQL 14+ installed and running

### Database Setup

1. Create a PostgreSQL database and user:

```sql
CREATE DATABASE craftopia;
CREATE USER craftopia_user WITH PASSWORD 'craftopia123';
GRANT ALL PRIVILEGES ON DATABASE craftopia TO craftopia_user;
```

2. Grant schema privileges (connect to the craftopia database first):

```sql
\c craftopia
GRANT USAGE, CREATE ON SCHEMA public TO craftopia_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO craftopia_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO craftopia_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO craftopia_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO craftopia_user;
```

3. Update server/.env with your database credentials (already configured for local development)

4. Run migrations to create tables:

```bash
cd server
npm install
npm run db:migrate
```

5. Seed the database with game data (20 materials, 25 components, tools, consumables):

```bash
npm run db:seed
```

### Installation

Install all dependencies:

```bash
npm run install:all
```

Or install manually:

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### Running the Application

#### Development Mode (Concurrent)

Run both client and server simultaneously:

```bash
npm run dev
```

This will start:
- Server on http://localhost:5000
- Client on http://localhost:3000

#### Individual Services

Run server only:

```bash
npm run dev:server
# or
cd server && npm run dev
```

Run client only:

```bash
npm run dev:client
# or
cd client && npm start
```

## Game Flow

1. **Account Creation** - Register and login
2. **Farming** - Select material category (wood/metal/fish/herb) and duration
3. **Collect Materials** - After time passes, collect materials with rarity rolls
4. **Bank** - Store materials, components, and items
5. **Crafting** - Use materials to craft components
6. **Items** - Combine components to create items (coming soon)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (authenticated)

### Health Check
- `GET /api/health` - Server health check

## Development Status

### Phase 1: Foundation ✅ COMPLETE
- Project structure and setup (monorepo)
- Authentication system (register, login, JWT)
- Database configuration (PostgreSQL with connection pooling)
- React frontend with routing
- Protected routes
- Landing, Login, Register, and Dashboard pages

### Phase 2: Database Schema & Game Data ✅ COMPLETE
- 11 database migrations created
- Materials table with 20 materials (5 woods, 5 metals, 5 fish, 5 herbs)
- Components table with 25 components (5 planks, 5 ingots, 5 fillets, 5 extracts, 5 ropes)
- Tools table with 18 crafting tools and stations
- Consumables table with 19 consumable items
- Component requirements table linking components to their crafting needs
- Player banks table for inventory management
- Farming and crafting sessions tables for time-based gameplay
- Items table structure (ready for future expansion)

### Phase 3: Bank System 🚧 NEXT
- Bank API endpoints
- Inventory viewing and management
- Starter inventory for new players

### Planned 📋
- Farming system (time-based material gathering)
- Crafting system (component creation)
- Items system
- Session management and polling
- Enhanced UI/UX

## Environment Variables

### Server (.env)
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=craftopia
DB_USER=craftopia_user
DB_PASSWORD=craftopia123
JWT_SECRET=craftopia-secret-key-dev-only
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_POLLING_INTERVAL=5000
```

## License

ISC
