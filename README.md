# 🚀 Chatify

Welcome to Chatify, a sleek and responsive AI chatbot interface built with React. This project aims to provide a seamless and interactive chat experience with AI capabilities.

## ✨ Features

-   **Modern & Responsive UI**: Designed with Tailwind CSS for a beautiful and adaptive interface across all devices.
-   **Smooth Animations**: Utilizes `framer-motion` to bring delightful and fluid transitions to the chat experience.
-   **Authentication**: Secure user authentication powered by Clerk.
-   **Real-time AI Responses**: Integrates with a powerful AI model (e.g., Gemini-1.5-Flash) to generate instant chat responses.
-   **Chat History**: Keeps track of your conversations for easy review.
-   **Typing Indicator**: Provides visual feedback when the AI is generating a response.

## 🛠️ Technologies Used

-   **Frontend**: React.js
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Authentication**: Clerk
-   **AI Integration**: Google Generative AI (via `@google/generative-ai`)
-   **Build Tool**: Vite

## 📸 Screenshots

### Home Page (Signed Out)

![Home Page Screenshot]
![image](https://github.com/user-attachments/assets/cc862401-064d-4b03-acee-842fa2a078f0)

### Chat Interface (Signed In)

![image](https://github.com/user-attachments/assets/f360832d-8ac1-4a2c-96e4-f3eaa96f953c)



### Responsive View
  <div style="display: flex; justify-content: center; gap: 30px;">
  <img src="https://github.com/user-attachments/assets/c9c7a30f-eb03-40cd-8bfb-fcbf9c81b142" alt="Image 1" style="max-width: 48%;">
  <img src="https://github.com/user-attachments/assets/2577a785-370e-479e-bf6b-deac2e4d9c85" alt="Image 2" style="max-width: 48%;">
</div>

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/chatgpt-clone.git
    cd chatgpt-clone
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**

    Create a `.env` file in the root of your project and add the following:

    ```env
    VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    VITE_API_KEY="your_google_generative_ai_api_key"
    ```

    -   Get your Clerk Publishable Key from [Clerk Dashboard](https://clerk.com/dashboard).
    -   Get your Google Generative AI API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if you have one, otherwise remove this section).

---

Made with ❤️ by Your Name/Organization
