# 🎮 ValoCoach - Professional Valorant Analytics Dashboard

ValoCoach is a high-performance, dark-themed analytics dashboard
designed for Valorant players to track their lifetime stats, map
performance, and match history with a premium gaming aesthetic.

------------------------------------------------------------------------

## 🚀 Live Demo

Check out the live application here:\
🔗 https://valocoach-dashboard.vercel.app/

------------------------------------------------------------------------

## ✨ Features

### 📊 Interactive Stats Grid

Real-time rolling counters for: - Headshot % - K/D Ratio - Win Rate -
Average ACS

### 🗂️ Match History & Filtering

-   Advanced search functionality
-   Filter system (All / Won / Lost)
-   Smooth sliding animations
-   Staggered list entry effects

### 🗺️ Map Analytics

-   Visualized win rates per map
-   Animated progress bars triggered on scroll

### 🎯 Agent Proficiency

-   Radial progress indicators
-   Highlights top 3 most-played agents

### 🎨 Stunning UI/UX

-   **Gaming Dark Theme**: Deep obsidian palette (#0b0d12) with rose-red
    accents
-   **Spring Physics Animations** using Framer Motion
-   **Glassmorphism UI** with neon glow accents
-   **Match Detail Modals** with round-by-round breakdown and combat
    stats
-   Smooth entrance/exit "pop" animations

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **Framework:** Next.js 16 (App Router)
-   **Styling:** Tailwind CSS v4
-   **Animations:** Framer Motion
-   **Icons:** Lucide React
-   **Deployment:** Vercel




---------------------------------------------




## 🧠 Challenges & Solutions

### 1. Synchronizing Complex Animations
* **Challenge**: Coordinating the staggered entry of match cards while simultaneously handling the layout shifts from the search/filter logic.
* **Solution**: Utilized Framer Motion's `AnimatePresence` with `mode='popLayout'`. This allows filtered cards to glide into their new positions smoothly rather than snapping, maintaining the premium feel.

### 2. Spring-Physics Number Interpolation
* **Challenge**: Creating a rolling counter that felt natural and didn't look like a standard linear ticker.
* **Solution**: Implemented a custom `Counter` component using `useSpring` and `useMotionValue`. This allowed numbers to accelerate quickly and slow down with a `circOut` easing as they reached final values.

### 3. Circular Progress Synchronization
* **Challenge**: Calculating SVG `stroke-dashoffset` dynamically for radial bars based on varied agent win rates.
* **Solution**: Built a mathematical utility using the formula $circumference - (winRate / 100) * circumference$ to precisely map data to circular paths.

---

## ⏱️ Time Spent on Task

| Phase | Tasks | Time Spent |
| :--- | :--- | :--- |
| **Research & Setup** | Project setup and data structure planning. | 0.5 Hour |
| **Core UI & Layout** | Obsidian theme, glassmorphism, responsive grids. | 1.5 Hours |
| **Feature Implementation** | Search, filter logic, modal state, and map analytics. | 2.0 Hours |
| **Motion & Animation** | Spring physics, staggered lists, scroll-based fillers. | 1.5 Hours |
| **Polish & Deployment** | README, optimization, deployment, testing. | 0.75 Hour |
| **Total** |  | **~6.25 Hours** |


---

## ⚙️ Installation & Setup

### 1. Clone the repository

``` bash
git clone https://github.com/tm33976/valocoach-dashboard.git
cd valocoach-dashboard
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Run the development server

``` bash
npm run dev
```

### 4. Open in browser

Visit: http://localhost:3000

------------------------------------------------------------------------

## 📂 Project Structure

    ├── app/
    │   ├── globals.css
    │   └── page.tsx
    ├── components/
    │   ├── ProfileCard.tsx
    │   ├── StatsGrid.tsx
    │   ├── MatchCard.tsx
    │   ├── MapChart.tsx
    │   └── MatchModal.tsx
    ├── data/
    │   └── player.json
    └── public/

------------------------------------------------------------------------

## 👤 Author

**Tushar Mishra**
📧 tm3390782@gmail.com

