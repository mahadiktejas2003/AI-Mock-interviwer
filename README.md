# AI Interview Mocker: Automated Mock Interview Generator

AI Interview Mocker is a Next.js application that leverages AI to generate personalized mock interviews based on job positions, descriptions, and experience levels.

This innovative tool combines the power of Google's Generative AI with a user-friendly interface to create realistic interview scenarios. It's designed to help job seekers practice and prepare for their upcoming interviews by providing tailored questions and answers specific to their target roles.

## Repository Structure

```
.
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/
│   │   ├── _components/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   └── ui/
│       ├── button.jsx
│       ├── dialog.jsx
│       ├── input.jsx
│       └── textarea.jsx
├── lib/
│   └── utils.js
├── utils/
│   ├── db.js
│   ├── GeminiAIModal.js
│   └── schema.js
├── middleware.js
├── next.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

### Key Files:

- `app/dashboard/page.jsx`: Main dashboard component
- `app/dashboard/_components/AddNewInterview.jsx`: Component for creating new mock interviews
- `utils/GeminiAIModal.js`: Integration with Google's Generative AI
- `utils/db.js`: Database connection setup
- `utils/schema.js`: Database schema definition
- `middleware.js`: Authentication middleware

## Usage Instructions

### Installation

Prerequisites:
- Node.js (v14 or later)
- npm (v6 or later)

Steps:
1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-interview-mocker
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   DATABASE_URL=<your-neon-database-url>
   NEXT_PUBLIC_GEMINI_API_KEY=<your-gemini-api-key>
   NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=<number-of-questions>
   ```

### Getting Started

1. Run the development server:
   ```
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration Options

- Adjust the number of interview questions generated by modifying the `NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT` environment variable.

### Common Use Cases

1. Creating a new mock interview:
   - Navigate to the dashboard
   - Click on the "Add New" button
   - Fill in the job position, description, and years of experience
   - Submit the form to generate AI-powered interview questions and answers

2. Viewing past mock interviews:
   - Access the dashboard to see a list of previously generated interviews

### Integration Patterns

The application integrates with:
- Clerk for user authentication
- Google's Generative AI for question generation
- Neon Database for data storage

### Testing & Quality

To run linting:
```
npm run lint
```

### Troubleshooting

1. Issue: AI-generated questions are not relevant
   - Ensure the job description is detailed and specific
   - Check if the Gemini API key is valid and has necessary permissions

2. Issue: Database connection errors
   - Verify the `DATABASE_URL` in your `.env.local` file
   - Ensure the Neon database is accessible and running

3. Issue: Authentication not working
   - Check Clerk configuration in `middleware.js`
   - Verify Clerk API keys in your environment variables

For debugging:
- Enable verbose logging by setting `DEBUG=true` in your `.env.local` file
- Check the browser console and server logs for error messages

## Data Flow

The AI Interview Mocker application follows a request-response cycle for generating and storing mock interviews:

1. User submits interview details (job position, description, experience) via the UI
2. The application sends this data to the Google Generative AI service
3. AI generates interview questions and answers based on the input
4. The application stores the generated content in the Neon database
5. The dashboard retrieves and displays stored interviews for the user

```
[User] -> [UI Form] -> [Next.js API] -> [Google Generative AI]
                                     -> [Neon Database]
         [Dashboard] <- [Next.js API] <- [Neon Database]
```

Note: Ensure proper error handling and rate limiting when interacting with external services like Google Generative AI.

## Infrastructure

The application uses the following key infrastructure components:

- Database:
  - Type: PostgreSQL (Neon)
  - Connection: Serverless connection using `@neondatabase/serverless`
  - ORM: Drizzle ORM for database operations

- AI Service:
  - Provider: Google Generative AI
  - Model: "gemini-1.5-flash"
  - Integration: Direct API calls using `@google/generative-ai` package

- Authentication:
  - Provider: Clerk
  - Integration: Next.js middleware for route protection

Ensure all necessary API keys and connection strings are properly configured in your environment variables for seamless operation of these infrastructure components.