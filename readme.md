# 📢 WhatsApp News Summarizer Bot

This project automatically:
1. Fetches the latest top news headlines.
2. Summarizes them using **LangChain + Google Generative AI**.
3. Sends concise summaries directly to WhatsApp via Twilio.

Built with **Node.js + Express**, it uses `LangChain` for LLM integration, `Bottleneck` for rate limiting, `p-retry` for resilient API calls, and `winston` for structured logging.

---

## 🚀 Features

- ✅ Fetches news from [NewsAPI](https://newsapi.org/).
- ✅ Summarizes articles using **LangChain + Google Generative AI**.
- ✅ Sends formatted digests to WhatsApp via Twilio.
- ✅ Robust error handling with retries.
- ✅ Rate-limited requests to respect provider limits.
- ✅ Easy configuration with `.env`.
- ✅ Express.js backend entrypoint for running jobs or triggering via API.

---

## 🛠️ Tech Stack

- **Node.js** – runtime environment.  
- **Express.js** – lightweight server and API handler.  
- **LangChain** – framework for summarization (Google Generative AI LLM).  
- **NewsAPI** – source for breaking news.  
- **Twilio WhatsApp API** – message delivery channel.  
- **Bottleneck** – rate limiting.  
- **p-retry** – retry mechanism for flaky API calls.  
- **winston** – structured logging.

---

## ⚙️ Prerequisites

- Node.js v18+  
- A [Google Generative AI API key](https://aistudio.google.com/app/prompts/new_chat)  
- A [NewsAPI key](https://newsapi.org/)  
- A [Twilio account](https://www.twilio.com/) with WhatsApp sandbox enabled  

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/abhiyadav512/news-ai-agent
npm install