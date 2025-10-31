<h1 align="center">
  <br>
  <a href="https://findlabs.io"><img src="https://media.discordapp.net/attachments/1105128667404849212/1423290455063527485/image-removebg-preview.png?ex=69060187&is=6904b007&hm=8a4d12acdef995753c3b4266b7a739a404f052e350bcdfc628f2937da93e82d8&=&format=webp&quality=lossless&width=604&height=358" alt="Flash" width="200"></a>
  <br>
  Flash
  <br>
</h1>

<h4 align="center">
  The fastest way to build with Flow data — a next-generation blockchain data explorer powered by <a href="https://findlabs.io" target="_blank">Find Labs Simple API</a>.
</h4>

<p align="center">
  <a href="https://github.com/findlabs/flash">
    <img src="https://img.shields.io/badge/status-active-brightgreen.svg" alt="status">
  </a>
  <a href="https://x.com/mieayam_id/status/1984276421016236153">
    <img src="https://img.shields.io/badge/Follow%20on-X-blue.svg" alt="X link">
  </a>
  <a href="https://youtu.be/LBHKrrvw_MQ">
    <img src="https://img.shields.io/badge/🎥-Watch%20Demo-ff0000.svg" alt="demo">
  </a>
</p>

<p align="center">
  <a href="#vision">Vision</a> •
  <a href="#core-mvp-features">Core MVP Features</a> •
  <a href="#why-it-matters">Why It Matters</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#demo--links">Demo & Links</a> •
  <a href="#license">License</a>
</p>

---

![screenshot](https://media.discordapp.net/attachments/1105128667404849212/1433834181158240418/Screenshot_2025-10-30_230220.png?ex=690621a4&is=6904d024&hm=0ae9b94db646435bd540701d233a3d7e758445bf2e376cb45c5e5a0586c4fe32&=&format=webp&quality=lossless&width=1628&height=794)

## ⚡ Description

**Flash** is a next-generation blockchain data explorer built entirely on top of **Find Labs Simple API**, designed to make Flow blockchain data **instant**, **transparent**, and **developer-friendly**.

In a world where blockchain data is often locked behind complex RPCs, node management, or custom indexers — Flash breaks the barrier by giving developers, analysts, and enthusiasts a **real-time window into the Flow network with zero setup.**

Built using **Vite + React** for blazing-fast performance and a clean UI, Flash demonstrates the power of Find Labs’ APIs — transforming raw, technical blockchain data into meaningful, visual insights accessible to anyone.

---

## 💡 Vision

Blockchain shouldn’t feel like black magic.  
With **Flash**, we aim to make the Flow ecosystem as easy to understand as refreshing a webpage.

Whether you’re tracking new blocks, visualizing transactions, monitoring contract events, or analyzing staking rewards — Flash delivers all this data in real time through a **simple, beautiful dashboard.**

It’s built for **builders, analysts, and curious minds** who want to explore Flow without running nodes, managing infrastructure, or writing a single line of Cadence.

---

## 🚀 Core MVP Features

| Feature | Description |
|----------|--------------|
| 🧩 **Block Explorer** | Browse the latest Flow blocks with height, ID, timestamp, and transaction count in real time. |
| 🔍 **Transaction Viewer** | Search, filter, and view transaction details — including involved addresses, gas usage, and event logs. |
| ⚙️ **Event Feed** | Monitor contract events live via Find Labs’ `/events` endpoint, perfect for real-time analytics and dev debugging. |
| 💬 **Alert & Notification System** | Subscribe to events and receive off-chain notifications (Discord or webhook) when specific triggers occur. |
| 💰 **Staking Rewards Dashboard** | Visualize both delegated staking and node operator rewards with clear, readable analytics. |
| 📊 **Network Summary & Analytics** | Real-time charts showing block speed, transaction volume, and active addresses. |

---

## 🧠 Why It Matters

Most blockchain explorers are built for power users — slow, complex, and tied to low-level RPCs.  

**Flash** takes a different approach:  
It’s **developer-first**, **API-native**, and **real-time**, leveraging **Find Labs’ unified access layer** across Cadence and EVM on Flow.

It’s not just an explorer — it’s the foundation for:
- Developer dashboards  
- Data analytics tools  
- Real-time monitoring  
- On-chain automation systems  

All powered by **Find Labs Simple API**.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Data Layer** | Find Labs Simple API (Blocks, Transactions, Events, Staking) |
| **Backend (optional)** | Node.js / Express (for webhooks & alerts) |
| **Realtime** | WebSocket / Interval polling |
| **Visualization** | Recharts / Chart.js |

---

## 🧩 Getting Started

To run Flash locally:

```bash
# Clone the repository
$ git clone https://github.com/findlabs/flash

# Move into project directory
$ cd flash

# Install dependencies
$ npm install

# Start development server
$ npm run dev
