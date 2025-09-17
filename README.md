# zb-assessment

A **Next.js 15 dashboard application** built with a focus on **mobile responsiveness**, **lazy-loaded content**, **Graph visualization**, and a clean, interactive UI.

This project includes:

* **Posts & Users Management** with lazy loading for infinite scroll.
* **Responsive sidebar and layout** for mobile and desktop.
* **Graphs & Analytics** using `react-chartjs-2`.
* **Modal details** for users.
* **Framer Motion animations** for smooth UI interactions.
* Built with **Next.js 15 App Router** (`app` directory structure) and **TypeScript**.

---

## Features

* **Responsive Design** – Works on all screen sizes with a mobile-friendly sidebar.
* **Lazy Loading / Infinite Scroll** – Only loads a few posts at a time as you scroll down.
* **Graphs / Analytics** – Displays posts vs users in a doughnut chart.
* **Interactive Tables** – Click a user to view more details in a modal.
* **Framer Motion Animations** – Smooth transitions and hover effects.
* **Clean UI** – TailwindCSS styling, modern dashboard layout.

---

## Getting Started

### Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard in your browser.

You can start editing the pages/components in the `app/` directory. Hot reload updates your changes instantly.

---

## Project Structure

```
app/
├── dashboard/         # Dashboard page with analytics and graph
├── posts/             # Posts page with lazy loading infinite scroll
├── users/             # Users page with responsive table and modal
├── components/        # Reusable UI components: Card, Modal, Spinner, Navbar, Sidebar
├── hooks/             # Custom hooks: useFetch, useIsMobile
├── lib/               # API endpoints and constants
├── types/             # TypeScript types for Post, User, etc.
└── globals.css        # Tailwind CSS styles
```

---

## Features Details

### 1. Mobile Responsive Sidebar

* Hidden by default on small screens.
* Toggle with a button.
* Overlay closes when clicked outside.
* Desktop view stays open by default.

### 2. Lazy Loading Posts

* Initially loads 10–12 posts.
* Loads more as you scroll.
* Smooth spinner animation during loading.

### 3. Users Modal

* Click on a user to view details.
* Smooth modal animation with Framer Motion.
* Mobile responsive table for better readability.

### 4. Graph & Analytics

* Doughnut chart shows **Posts vs Users**.
* Responsive and dynamic color themes using CSS variables.
* Built with `react-chartjs-2` and `chart.js`.

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Framer Motion](https://www.framer.com/motion/)
* [Chart.js & React Chart.js](https://react-chartjs-2.js.org/)

---

## Deploy on Vercel

Deploy your Zettabyte Dashboard with one click using **Vercel**:

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new?utm_source=github&utm_medium=readme&filter=next.js)

Check [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

---