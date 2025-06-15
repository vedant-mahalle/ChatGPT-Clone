const config = {
    // Authentication
    clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    
    // AI API
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
    
    // API URLs
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173',
    
    // Feature Flags
    enableFileUpload: import.meta.env.VITE_ENABLE_FILE_UPLOAD === 'true',
    enableCodeHighlighting: import.meta.env.VITE_ENABLE_CODE_HIGHLIGHTING === 'true',
};

// Validate required environment variables
const requiredEnvVars = [
    'pk_test_Y29tcG9zZWQtZXdlLTM5LmNsZXJrLmFjY291bnRzLmRldiQ',
    'AIzaSyCINwRrGw3NiT6kQWf4tWav-ZqM-Ezv7h0'
];

requiredEnvVars.forEach(envVar => {
    if (!import.meta.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
    }
});

export default config; 