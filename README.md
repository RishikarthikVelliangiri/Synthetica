# Synthetica - AI Synthetic Data Generator

Synthetica is a modern web application that generates synthetic data using AI. It provides a user-friendly interface for creating realistic test data in various formats like JSON, CSV, SQL, XML, and YAML.

![Synthetica App](https://i.imgur.com/your-screenshot-link.png)

## Features

- 🤖 AI-powered data generation using Google's Gemini 2.0 Pro API
- 📊 Support for multiple data formats (JSON, CSV, SQL, XML, YAML)
- 🎨 Beautiful, modern interface with animated UI elements
- 🚀 Fast data generation with batched processing for large datasets
- 📱 Fully responsive design for all devices
- 🔄 Download and copy functionality for generated data
- ✨ Syntax highlighting for better code readability
- 🧩 Intelligent formatting for each data type

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RishikarthikVelliangiri/Synthetica.git
   cd Synthetica
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Google Gemini API key:
   ```
   GOOGLE_API_KEY=your_google_gemini_api_key
   GOOGLE_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp:generateContent
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter the number of data entries you want to generate
2. Describe the synthetic data you need (e.g., "Generate user profiles with name, email, age, and location")
3. Select your preferred output format (JSON, CSV, SQL, XML, or YAML)
4. Click "Generate Data"
5. View, copy, or download the generated data

## Technologies Used

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Google Gemini API** - Advanced AI model integration
- **Shadcn UI** - Modern UI components

## Key Features in Detail

### Google Gemini 2.0 Pro Integration
Synthetica leverages Google's advanced Gemini 2.0 Pro experimental model to generate highly realistic synthetic data. The implementation uses the v1beta API endpoint for access to this cutting-edge AI technology.

### Smart Data Processing
The application includes intelligent processing for each data format:
- **JSON**: Proper formatting with consistent camelCase property names
- **CSV**: Header normalization and systematic ID generation
- **SQL**: Automatic schema creation with appropriate data types
- **XML**: Well-formed structure with proper nesting
- **YAML**: Clean, consistent formatting with proper indentation

### Batched Processing
For large data requests, Synthetica utilizes a batched processing approach to handle high volumes of data generation efficiently, enabling the creation of datasets with hundreds or thousands of entries.

## Deployment

The application can be deployed on platforms like Vercel or Netlify:

```bash
# Build for production
npm run build
# or
yarn build

# Start production server
npm run start
# or
yarn start
```

## Environment Variables

For the application to work correctly, you need to set up these environment variables:

| Variable | Description |
|----------|-------------|
| GOOGLE_API_KEY | Your Google Gemini API key |
| GOOGLE_API_URL | URL of the Gemini API endpoint |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Powered by [Google Gemini](https://ai.google.dev/) AI models
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)