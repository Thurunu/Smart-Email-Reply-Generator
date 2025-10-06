# 📧 Smart Email Reply Generator

An AI-powered email reply generator with both a web application and browser extension for seamless email composition assistance.

## 🌟 Features

- **AI-Powered Replies**: Generate intelligent email responses using advanced AI
- **Multiple Tones**: Choose from Professional, Casual, Friendly, and Formal tones
- **Dual Interface**: 
  - Web application for standalone use
  - Browser extension for direct Gmail/Outlook integration
- **Copy to Clipboard**: Easy copying of generated replies
- **Real-time Integration**: Direct integration with Gmail and Outlook compose windows

## 🏗️ Project Structure

```
Smart-Email-Reply-Generator/
├── Email-Writer/           # React Web Application
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Application entry point
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   ├── package.json       # Dependencies and scripts
│   └── vite.config.js     # Vite configuration
│
├── Emai-Writer-ext/       # Browser Extension
│   ├── manifest.json      # Extension manifest
│   ├── content.js         # Content script for email platforms
│   └── content.css        # Extension styling
│
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Web Application Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thurunu/Smart-Email-Reply-Generator.git
   cd Smart-Email-Reply-Generator/Email-Writer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Browser Extension Setup

1. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

2. **Load the extension**
   - Click "Load unpacked"
   - Select the `Emai-Writer-ext` folder from the project directory

3. **Verify installation**
   - The extension should appear in your extensions list
   - You'll see "Email Writer Assistant" with version 1.0

## 💻 Usage

### Web Application

1. **Open the web app** in your browser
2. **Paste the email content** you want to reply to in the text area
3. **Select a tone** (optional):
   - Professional: Formal business communication
   - Casual: Relaxed, informal responses
   - Friendly: Warm and approachable tone
4. **Click "Generate Reply"** to create your response
5. **Copy the generated reply** using the "Copy to Clipboard" button

### Browser Extension

1. **Open Gmail or Outlook** in your browser
2. **Start composing** an email or replying to one
3. **Look for the "Generate Reply" button** in the compose toolbar
4. **Select your preferred tone** from the dropdown
5. **Click "Generate Reply"** to automatically populate your email

## 🛠️ Technical Details

### Web Application Stack

- **Frontend**: React 19.1.1 with Vite
- **UI Framework**: Material-UI (MUI) 7.3.4
- **HTTP Client**: Axios 1.12.2
- **Styling**: Emotion React & Styled
- **Build Tool**: Vite 7.1.7
- **Linting**: ESLint with React plugins

### Browser Extension

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: 
  - `activetab`: Access current tab
  - `sidepannel`: Side panel functionality
- **Host Permissions**: Gmail and Outlook integration
- **Content Scripts**: Dynamic button injection and email content extraction

### API Integration

The application communicates with a backend API at `http://localhost:8080/api/email/generate` for AI reply generation.

## 🔧 Development

### Available Scripts (Web App)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Extension Development

1. Make changes to files in `Emai-Writer-ext/`
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test changes on Gmail/Outlook

## 🌐 Browser Support

### Web Application
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Browser Extension
- Chrome/Chromium-based browsers (primary support)
- Edge (Chromium-based)

## 📋 Supported Email Platforms

- **Gmail** (`mail.google.com`)
- **Outlook Web** (`outlook.office.com`)

## 🔑 API Requirements

This application requires a backend API server running on `http://localhost:8080` with the following endpoint:

- **POST** `/api/email/generate`
- **Request Body**: `{ emailContent: string, tone: string }`
- **Response**: Generated email reply as text

## 🚨 Troubleshooting

### Common Issues

1. **Extension not appearing in Gmail/Outlook**
   - Ensure the extension is enabled in `chrome://extensions/`
   - Refresh the Gmail/Outlook page
   - Check browser console for errors

2. **API connection errors**
   - Verify the backend server is running on port 8080
   - Check CORS configuration on the backend
   - Ensure the API endpoint matches the expected format

3. **Web app not loading**
   - Check if port 5173 is available
   - Clear browser cache and cookies
   - Verify all dependencies are installed



