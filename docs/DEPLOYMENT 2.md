# Deployment Guide

This guide describes how to deploy the KBD Credit Solutions application.

## Vercel (Recommended)

Next.js is built by Vercel, making it the easiest platform for deployment.

1.  **Push to GitHub:** Ensure your project is pushed to a GitHub repository.
2.  **Create Vercel Account:** Log in to [Vercel](https://vercel.com).
3.  **Import Project:** Click "Add New..." -> "Project" and select your repository.
4.  **Configure:**
    -   **Framework Preset:** Next.js
    -   **Root Directory:** `./`
    -   **Build Command:** `next build`
    -   **Output Directory:** `.next`
    -   **Install Command:** `npm install`
5.  **Environment Variables:** Add keys from `.env.example` to the Environment Variables section.
6.  **Deploy:** Click "Deploy".

## Netlify

1.  **Push to GitHub.**
2.  **Log in to Netlify.**
3.  **New Site from Git:** Select your repository.
4.  **Build Settings:**
    -   **Build command:** `npm run build`
    -   **Publish directory:** `.next`
5.  **Environment:** Add environment variables.
6.  **Deploy Site.**

## Docker (Self-Hosted)

1.  Build the image:
    ```bash
    docker build -t kbd-credit-solutions .
    ```
2.  Run the container:
    ```bash
    docker run -p 3000:3000 kbd-credit-solutions
    ```

*(Note: A Dockerfile needs to be added to the project root for this method).*
