# 🚀 ChatGPT Clone

Welcome to the ChatGPT Clone, a sleek and responsive AI chatbot interface built with React. This project aims to replicate the core functionalities of popular AI chat applications, providing a seamless and interactive user experience.

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

![Home Page Screenshot](placeholder_home_page.png)

### Chat Interface (Signed In)

![Chat Interface Screenshot](placeholder_chat_interface.png)

### Responsive View

![Responsive View Screenshot](placeholder_responsive_view.png)

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