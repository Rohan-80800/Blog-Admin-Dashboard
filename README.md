# 📝 Blog Admin Dashboard

### 🚀 A Modern Frontend Blog Management System

**Blog Admin Dashboard** is a production-style 🧑‍💻 admin panel built to manage blog content efficiently using modern frontend engineering principles.
It demonstrates **clean UI/UX**, **scalable component architecture**, **state management**, **local persistence**, and **real-world problem solving** — exactly aligned with the Frontend Developer Assessment goals 🎯.

---
<img width="1919" height="907" alt="Screenshot 2025-12-17 110741" src="https://github.com/user-attachments/assets/fc12a9ac-f77a-41ae-8743-8d875ce1b6a2" />
<img width="1918" height="910" alt="Screenshot 2025-12-17 110801" src="https://github.com/user-attachments/assets/8d06da6f-3123-460a-80c6-96cddb3abde4" />
<img width="1919" height="905" alt="Screenshot 2025-12-17 110835" src="https://github.com/user-attachments/assets/30220a73-3a46-471e-91c5-61dca49e602a" />
<img width="1919" height="903" alt="Screenshot 2025-12-17 111016" src="https://github.com/user-attachments/assets/46e12693-7d06-445e-abc0-c4793bb33a91" />


--- 

## ✨ Features

📱 Fully responsive admin layout (Sidebar + Navbar + Content)

📝 Create, Read, Update, Delete (CRUD) blogs

🔍 Search blogs by title & author

🧰 Filter by category & status

📄 Pagination (5 items per page)

🖼️ Image upload with validation (JPG / PNG, max 1MB)

👁️ Instant image preview before save

💾 Persistent data using LocalStorage

⚡ Optimized renders with memoization

🧠 Clean UX with proper form validation

---

## 🧩 Medium Brain Task Selected

### 🗑️ **Soft Delete + Auto Purge**

**Why this approach?**
Instead of permanently deleting blogs, they are first moved to a **Trash** state. This mirrors real-world CMS systems and improves data safety.

**How it works:**
🗑️ Blog is soft-deleted and moved to Trash
⏳ Trash items store `deletedAt` timestamp
🧹 Auto-purge runs after **30 days**
📣 Toast notification shown when items are purged
✔ Demonstrates state management
✔ Shows lifecycle handling
✔ Reflects production-grade logic

---

## ⚡ Quick Logic Task Selected

### 📊 **Derived Count Display**

The dashboard dynamically displays:
📌 Total Blogs
📌 Published Blogs
📌 Draft Blogs
📌 Trashed Blogs

All counts are **derived from state**, not stored — ensuring accuracy and performance ⚙️.

---

## 🧠 Tech Stack Overview

| 🧱 Layer         | 💡 Technologies Used   |
| ---------------- | ---------------------- |
| 💻 Frontend      | React ⚛️, Vite ⚡       |
| 🎨 Styling       | Tailwind CSS 💅        |
| 🧠 State         | React Context + Hooks  |
| 🧭 Routing       | React Router DOM       |
| 🎞️ Animations   | Framer Motion          |
| 🔔 Notifications | Sonner                 |
| 💾 Persistence   | LocalStorage           |
| 🛠️ Tools        | VS Code 🖥️, GitHub 🌐 |

---

## 🖼️ Blog Fields

Each blog contains:

📝 Title

📄 Description

🏷️ Category

✍️ Author

🖼️ Image (validated + preview)

📅 Publish Date

📌 Status (Draft / Published)

---

## 🧾 Folder Structure

```
blog-admin-dashboard/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # Blog & Theme Context
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Helpers & constants
│   ├── styles/            # Global styles
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

✔ Scalable
✔ Maintainable
✔ Easy to understand

---

## 🚀 Getting Started

### 📥 Clone the Repository

```bash
git clone https://github.com/Rohan-80800/Blog-Admin-Dashboard.git
cd blog-admin-dashboard
```

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Run Development Server

```bash
npm run dev
```
## 🏗️ Build for Production

```bash
npm run build
```

✔ Optimized build
✔ Ready for deployment on **Vercel**

---

## 🎯 Assessment Alignment Checklist

✅ Scalable component architecture

✅ Clean & responsive UI/UX

✅ CRUD operations

✅ State management with Context

✅ Local persistence

✅ Search, filter & pagination

✅ Medium brain task implemented

✅ Quick logic task implemented

✅ Production-ready folder structure

✅ Clear documentation

---

## 🚀 Future Enhancements

📊 Analytics dashboard
🔐 Role-based access (Admin / Editor)
☁️ Firebase / Backend API integration
📥 Export blogs (CSV / PDF)
🌙 Advanced theme customization

---

## 👨‍💻 Author

**Rohan Shete**
Frontend Developer ⚛️

📧 Email: **[rohandshete2003@gmail.com](mailto:rohandshete2003@gmail.com)**
🔗 GitHub: **[https://github.com/Rohan-80800](https://github.com/Rohan-80800)**

> *“Built with ❤️, React ⚛️, Tailwind 🎨, and real-world frontend principles.”*

---
