# Naksh Jewels - E-Commerce Internship Assignment

A full-stack Mini E-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) and fully containerized using Docker.

## 🚀 Features
- **User Authentication**: Secure Login & Signup (JWT + Cookies).
- **Product Listing**: View products with dynamic data.
- **Shopping Cart**: Add items, update quantities, and calculate totals.
- **Order Management**: Place orders and view order history with "Track Order" status.
- **Dockerized**: One-command setup for the entire stack.
- **Responsive Design**: Mobile-friendly UI with a custom Navbar and Sidebar.

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas & Local Fallback)
- **DevOps**: Docker, Docker Compose

---

## ⚙️ Prerequisites
Before running the project, ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Required)
- [Git](https://git-scm.com/)

---

## 🔧 Quick Start (Docker Method)
The easiest way to run the application is using Docker. This will start the Frontend, Backend, and Database containers automatically.

### 1. Clone the Repository
```bash
git clone https://github.com/Vaibhavgoud7/Naksh_Jewels.git
cd Naksh_Jewels

### Docker command to setup
docker compose up --build