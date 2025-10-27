# QuizConstructor

**Generate unlimited quizzes from any subject, text, or file using AI!**

A full-stack application that automatically generates quiz questions based on user input using OpenAI's API.

## Features

✨ **AI-Powered Quiz Generation**
- Generate quizzes from any subject
- Create quizzes from text content
- Upload and process documents (PDF, Word, PowerPoint, Text)

🎨 **Modern UI**
- Built with React 18 and Vite
- Styled with Tailwind CSS
- Interactive components with Lucide React icons

⚡ **Tech Stack**
- **Frontend**: React, Vite, Tailwind CSS, Lucide React, Context API
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **AI**: OpenAI API

## Project Structure

```
QuizConstructor/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context
│   │   ├── hooks/          # Custom hooks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                 # Node.js + Express server
│   ├── src/
│   │   └── index.js        # Main server file
│   ├── config/
│   │   └── database.js     # PostgreSQL connection
│   ├── controllers/        # Route handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── .env.example       # Environment variables template
│   └── package.json
│
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## Installation

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- OpenAI API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
OPENAI_API_KEY=your_api_key_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
NODE_ENV=development
```

5. Create PostgreSQL database:
```bash
createdb quizconstructor
```

6. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Choose one of three options:
   - **By Subject**: Enter any topic (e.g., "World War II History")
   - **By Text**: Paste content to generate questions from
   - **By File**: Upload PDF, Word, PowerPoint, or text files
3. Set the number of questions (1-100)
4. Click "Generate Quiz"
5. View, save, or export your quiz

## API Endpoints

### Quiz Management
- `POST /api/quizzes` - Create a quiz
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get a specific quiz
- `DELETE /api/quizzes/:id` - Delete a quiz

### Quiz Generation
- `POST /api/quizzes/generate/subject` - Generate from subject
- `POST /api/quizzes/generate/text` - Generate from text
- `POST /api/quizzes/generate/file` - Generate from file upload

## Database Schema

```sql
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  num_questions INTEGER NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quizconstructor
DB_USER=postgres
DB_PASSWORD=password
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Scripts

### Backend
```bash
npm start      # Run production server
npm run dev    # Run development server with hot reload
npm test       # Run tests
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Development

The project uses a feature branch approach for development:

```bash
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/feature-name
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please create an issue in the repository.

## Roadmap

- [ ] User authentication and accounts
- [ ] Quiz sharing and collaboration
- [ ] Advanced analytics and performance tracking
- [ ] Custom question types (essay, matching, etc.)
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Export to various formats (PDF, DOCX, etc.)
- [ ] Question bank management
