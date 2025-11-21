## 401k Contribution Calculator
A Next.js application for managing 401k retirement contributions with real-time projections and employer match calculations.


## Features
- Toggle between percentage-based or fixed dollar amount contributions
- Interactive slider with visual feedback for employer match optimization
- Real-time 10-year growth projections with interactive charts
- Backend API for saving and retrieving contribution preferences
- Smart alerts when missing out on maximum employer match

Tech Stack
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Recharts
- Backend: Next.js API Routes with in-memory storage


Quick Start
Prerequisites

- Node.js 20.9.0 or higher

## [Installation & Setup]

Clone the repository:

bashgit clone https://github.com/davidthai4/401k.git
cd 401k-app

Install dependencies

run:

bashnpm install

Start the development server

run: 

bashnpm run dev

Open http://localhost:3000 in your browser

That's it! The application should now be running locally.
API Endpoints
GET /api/contribution
Retrieves current contribution settings
POST /api/contribution
Updates contribution settings
Request body:
json{
  "contributionType": "percent",
  "contributionValue": 8
}
```

## Mock Data

The application uses the following hardcoded values:

- Annual Salary: $120,000
- YTD Contributions: $7,200
- Current Balance: $142,893
- Employer Match: 50% up to 6% of salary
- Projected Return: 7% annually

```

## Project Structure
Available Scripts
bashnpm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint