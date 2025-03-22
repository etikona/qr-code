# Subscription QR Code App

🚀 Live Demo: [QR Code Generator](https://qr-code-nine-beryl.vercel.app/)

## 📌 Overview

The **Subscription QR Code App** allows users to enter their phone number and generate a **unique QR code** containing both the number and a randomly generated verification code. When scanned, the QR code reveals this information, making it useful for authentication and user verification purposes.

## 🛠 Technology Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Shadcn/ui
- **Components:** Lucide-react icons, QR Code Generator
- **Deployment:** Vercel

## 🚀 Features

- 📱 **Phone Number Input**: Users can enter their phone number.
- ✅ **Validation**: Ensures the number is in a valid international format.
- 🔄 **Unique Verification Code**: Generates a 6-digit random code.
- 📸 **QR Code Generation**: Creates a QR code with phone number + verification code.
- 🎨 **Fully Responsive**: Optimized for all screen sizes using Tailwind CSS.
- 🚀 **Live Hosting on Vercel**.

## 🛠 Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:3000/
   ```

## 📸 Scanning QR Code

When scanned, the QR code will contain a JSON object:

```json
{
  "phone": "+123456789",
  "code": "123456"
}
```

## 🚀 Deployment on Vercel

This project is deployed live on **Vercel**:

- **Live URL**: [QR Code Generator](https://qr-code-nine-beryl.vercel.app/)

To deploy manually, run:

```sh
vercel --prod
```
