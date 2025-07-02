# 🤖 Gemini Chatbot — PDF-Aware AI Assistant

A sleek, modern chatbot powered by Google's **Gemini Pro API** with advanced features like **PDF parsing**, **markdown rendering**, **dark mode**, and **ChatGPT-style typing effect**. Built with **Next.js 15**, **React**, and **Tailwind CSS**.

---

## ✨ Features

- 🧠 **Gemini 2.5 Pro Integration** – AI-powered replies using Google’s large language model
- 📄 **PDF Upload + Parsing** – Upload a PDF and ask questions about it
- 🎨 **Beautiful Chat UI** – Clean, responsive interface with avatars, bubbles, and transitions
- 🌙 **Dark Mode Toggle** – One-click light/dark switch
- 📝 **Markdown Rendering** – Supports bold, italics, lists, code blocks in replies
- ⌛ **Typing Animation** – ChatGPT-style character-by-character typing effect
- 🔄 **Auto Scroll** – Scrolls to latest message automatically
- 📱 **Mobile Friendly** – Looks great on any device

---

## 📸 Demo

> Coming soon: [https://gemini-chatbot-three-pi.vercel.app/](#)

---

## 📂 Project Structure
mychatbot/
├── app/
│ ├── page.jsx # Main chatbot UI
│ └── api/gemini-chat/ # Serverless API route to Gemini
├── components/ # UI components (Button, Card, etc.)
├── public/
├── .env.local # Gemini API Key (not pushed)
└── README.md


---

## 🧠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Markdown Rendering:** [`react-markdown`](https://github.com/remarkjs/react-markdown)
- **PDF Parsing:** [`pdf.js`](https://mozilla.github.io/pdf.js/) via CDN
- **AI API:** [Gemini Pro (Google Generative Language API)](https://ai.google.dev/)

---

## 🛠 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/ullassa/gemini-chatbot.git
cd gemini-chatbot

2.Install dependencies
npm install

3.Create .env.local
GEMINI_API_KEY=your_api_key_here

4.Run the app locally
npm run dev

5.goto
http://localhost:3000




🔐 Gemini API Key Setup
Go to https://makersuite.google.com/app/apikey

Create an API key

Paste it in .env.local as:
GEMINI_API_KEY=your_api_key_here


🚀 Deployment
We recommend Vercel for 1-click Next.js deployment.

Push your code to GitHub

Go to https://vercel.com/import

Select your repo → Add your GEMINI_API_KEY in Vercel Environment Variables

Deploy 🎉

🧠 Future Ideas
 Streaming responses (word-by-word)

 Chat history with localStorage

 Voice input (Web Speech API)

 Multi-file PDF support

 Gemini Vision (image-based AI)


🧑‍💻 Author
Made with 💙 by Ullas S A


📜 License
MIT — free for personal & commercial use.

---

### ✅ What To Do Now:

1. **Create a `README.md` file** in your project root
2. Paste this content
3. Commit & push:

```bash
git add README.md
git commit -m "📝 Add README with features and setup guide"
git push





