# Pastebin-Lite

A lightweight, secure, and ephemeral text-sharing application built with **Next.js** and **Redis**. This application mimics the classic Pastebin experience, allowing users to share code or text with optional expiration (TTL) and view limits ("Burn after reading").

## 🛠️ Tech Stack

* **Frontend:** Next.js 14+ (App Router), React
* **Styling:** Tailwind CSS (configured for the classic "Pastebin" look)
* **Database:** Redis (Upstash Serverless Redis)
* **Icons:** Lucide-React
* **Language:** JavaScript

## 📂 Project Structure

Here is the complete file structure of the application:

```text
pastebin-lite/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── pastes/
│   │   │       └── route.js      # API endpoint to create pastes
│   │   ├── p/
│   │   │   └── [id]/
│   │   │       └── page.js       # View Paste Page (Dynamic Route)
│   │   ├── globals.css           # Global styles (Tailwind imports & background)
│   │   ├── layout.js             # Root layout (loads fonts & CSS)
│   │   └── page.js               # Homepage (Create Paste Form)
│   ├── lib/
│   │   ├── redis.js              # Redis connection client
│   │   ├── pasteService.js       # Logic for saving/fetching pastes
│   │   └── utils.js              # Utility functions
├── .env.local                    # Environment variables (API Keys)
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies list
├── tailwind.config.js            # Tailwind configuration
└── README.md                     # Project documentation


🚀 How to Run Locally

1. Prerequisites
    Node.js (v18 or higher)
    An Upstash Redis database (Freetier is sufficient).

2. Clone and Install
    Open your terminal in the project folder and run:
    BASH : npm install

3. Configure Environment Variables
    Create a file named .env.local in the root directory : 
    Bash : touch .env.local

Open .env.local and add your Redis connection string (get this from your Upstash dashboard):

Code snippet : Example format (replace with your actual URL and Token)
    REDIS_URL=rediss://default:your_password@your-database-name.upstash.io:6379


4. Start the Server
    Run the development server:Bash : npm run dev
    Open your browser and visit: http://localhost:3000
    
📡 API DocumentationThe application exposes the following API endpoints:

1. Create a Paste
    Endpoint : POST /api/pastes
    Description : Saves a new paste to Redis with optional constraints.
    Headers : Content-Type : application/json

Body Parameters : 
    Parameter Type Required Description content string Yes The text or code to be saved.
    ttl_seconds number No Time in seconds before auto-deletion (e.g., 3600 for 1 hour).
    max_views number No Maximum number of times the paste can be viewed before deletion.
    
    Example Request:JSON{
        "content": "console.log('Hello World');",
        "ttl_seconds": 3600,
        "max_views": 5
    }
    Example Response:JSON{
        "id": "abc-123-xyz",
        "url": "http://localhost:3000/p/abc-123-xyz"
    }

💾 Database Information : 
    This project uses Redis as its primary database.
    Why Redis?
    Performance: Redis is an in-memory key-value store, making read/write operations extremely fast.
    TTL (Time-To-Live): Redis supports native expiration. 
    We use the EXPIRE command to automatically delete pastes after the user-specified time (ttl_seconds), so no cron jobs or manual cleanup is needed.
    Atomic Counters: We use Redis atomic increments (INCR) to handle the "Max Views" feature accurately, ensuring a paste is deleted exactly when the view limit is reached.
    
🎨 Design Features
    Classic Layout: Replicates the clean, functional design of the original Pastebin.
    Responsive: Works on desktop and mobile.
    Feedback: Provides instant success/error messages and one-click URL copying.
    









☁️ Version Control & Deployment
Follow these steps to push your code to GitHub and host it live on Vercel.

1. Push to GitHub
Create a new repository on GitHub. Do not initialize it with a README.

Open your project terminal and run these commands:

Bash

# Initialize Git
git init

# Add all files to staging
git add .

# Commit your changes
git commit -m "Initial commit"

# Rename branch to main
git branch -M main

# Link your local project to GitHub (Replace URL with your repo URL)
git remote add origin [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)

# Push the code
git push -u origin main

2. Host on Vercel (Recommended)
Since this is a Next.js application, Vercel is the best hosting platform.

Go to Vercel and sign up/login.

Click "Add New..." -> "Project".

Select your GitHub repository and click Import.

Important: In the "Environment Variables" section, add your Redis URL:

Key: REDIS_URL

Value: (Paste your connection string starting with rediss://...)

Click Deploy.

Your application will be live in 1-2 minutes!

💾 Database Information
This project uses Redis as its primary database.

Why Redis?

Performance: Redis is an in-memory key-value store, making read/write operations extremely fast.

TTL (Time-To-Live): Redis supports native expiration. We use the EXPIRE command to automatically delete pastes after the user-specified time (ttl_seconds), so no cron jobs or manual cleanup is needed.

Atomic Counters: We use Redis atomic increments (INCR) to handle the "Max Views" feature accurately, ensuring a paste is deleted exactly when the view limit is reached.

** Vercel Deployment **
<img width="1920" height="1080" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/5b81d746-ef17-4d40-b52f-58581d559403" />

**
<img width="1920" height="1080" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/bd4faf5d-6cba-4863-bf43-2cca19d74084" />


<img width="1920" height="1080" alt="Screenshot (23)" src="https://github.com/user-attachments/assets/779caa98-c49b-47f1-aa1e-9d175f47a7c7" />



