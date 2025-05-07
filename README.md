# Synthetica - AI Synthetic Data Generator

Synthetica is a modern web application that generates synthetic data using AI. It provides a user-friendly interface for creating realistic test data in various formats like JSON, CSV, SQL, XML, and YAML.


## Features

- 🤖 AI-powered data generation using advanced language models
- 📊 Support for multiple data formats (JSON, CSV, SQL, XML, YAML)
- 🎨 Beautiful, modern interface with animations
- 🚀 Fast data generation with batched processing
- 📱 Responsive design for all devices
- 🔄 Download and copy functionality for generated data
- ✨ Syntax highlighting for better readability

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/synthetica.git
   cd synthetica
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your API keys:
   ```
   HF_API_KEY=your_hugging_face_api_key
   HF_API_URL=https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1
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
- **Hugging Face API** - AI model integration
- **Shadcn UI** - UI components

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
| HF_API_KEY | Your Hugging Face API key |
| HF_API_URL | URL of the AI model (default is Mixtral-8x7B) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Powered by [Hugging Face](https://huggingface.co/) AI models
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)