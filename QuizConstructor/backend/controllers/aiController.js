import axios from 'axios';

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GOOGLE_GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1/models';
const DEMO_MODE = process.env.DEMO_MODE === 'true' || !GOOGLE_GEMINI_API_KEY;

// Helper to get full API URL based on model
const getApiUrl = (model) => {
  return `${GOOGLE_GEMINI_BASE_URL}/${model}:generateContent`;
};

// Mock quiz data for demo mode
const generateMockQuestions = (subject, numQuestions) => {
  const mockQuestions = {
    history: [
      {
        question: 'In what year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: 2
      },
      {
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
        correctAnswer: 1
      },
      {
        question: 'What was the main cause of the French Revolution?',
        options: ['Economic crisis', 'Religious conflict', 'Colonial disputes', 'Succession crisis'],
        correctAnswer: 0
      },
      {
        question: 'Which ancient wonder of the world still stands today?',
        options: ['Colossus of Rhodes', 'Great Pyramid of Giza', 'Hanging Gardens of Babylon', 'Lighthouse of Alexandria'],
        correctAnswer: 1
      },
      {
        question: 'In what year did the Titanic sink?',
        options: ['1910', '1911', '1912', '1913'],
        correctAnswer: 2
      }
    ],
    biology: [
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correctAnswer: 1
      },
      {
        question: 'How many chromosomes do humans have?',
        options: ['23', '46', '48', '52'],
        correctAnswer: 1
      },
      {
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
        correctAnswer: 1
      },
      {
        question: 'Which blood type is the universal donor?',
        options: ['A', 'B', 'AB', 'O'],
        correctAnswer: 3
      },
      {
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswer: 3
      }
    ],
    programming: [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        correctAnswer: 0
      },
      {
        question: 'Which of these is a server-side language?',
        options: ['JavaScript', 'Python', 'Java', 'All of the above'],
        correctAnswer: 3
      },
      {
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Coded Style Sheets'],
        correctAnswer: 1
      },
      {
        question: 'Which data structure uses LIFO?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1
      },
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        correctAnswer: 2
      }
    ]
  };

  // Get questions for the subject or use programming as default
  const questions = mockQuestions[subject.toLowerCase()] || mockQuestions.programming;
  
  // Return only the requested number of questions
  return questions.slice(0, Math.min(numQuestions, questions.length));
};

export const generateQuestionsFromSubject = async (subject, numQuestions, model = 'gemini-2.0-flash-lite') => {
  // Use demo mode if API key not configured or DEMO_MODE enabled
  if (DEMO_MODE) {
    console.log('📚 DEMO MODE - Generating mock questions for subject:', subject);
    return generateMockQuestions(subject, numQuestions);
  }

  if (!GOOGLE_GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured. Please add it to .env file');
  }

  const prompt = `Generate ${numQuestions} multiple choice quiz questions about "${subject}". 
  For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
  Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (0, 1, 2, or 3 as numeric index).
  Only return the JSON array, no additional text.`;

  try {
    console.log('🔍 Calling Google Gemini API for subject:', subject, '| Model:', model);
    const response = await axios.post(
      `${getApiUrl(model)}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('✅ Successfully generated', questions.length, 'questions from Gemini');
      return questions;
    }
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('❌ Error generating questions:', error.response?.data || error.message);
    throw error;
  }
};

export const generateQuestionsFromText = async (text, numQuestions, model = 'gemini-2.0-flash-lite') => {
  // Use demo mode if API key not configured or DEMO_MODE enabled
  if (DEMO_MODE) {
    console.log('📚 DEMO MODE - Generating mock questions from text');
    return generateMockQuestions('programming', numQuestions);
  }

  if (!GOOGLE_GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured. Please add it to .env file');
  }

  const prompt = `Based on the following text, generate ${numQuestions} multiple choice quiz questions.
  Text: "${text}"
  
  For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
  Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (0, 1, 2, or 3 as numeric index).
  Only return the JSON array, no additional text.`;

  try {
    console.log('🔍 Calling Google Gemini API for text input | Model:', model);
    const response = await axios.post(
      `${getApiUrl(model)}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('✅ Successfully generated', questions.length, 'questions from text');
      return questions;
    }
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('❌ Error generating questions from text:', error.response?.data || error.message);
    throw error;
  }
};

export const generateQuestionsFromUrl = async (url, numQuestions, model = 'gemini-2.0-flash-lite') => {
  // Use demo mode if API key not configured or DEMO_MODE enabled
  if (DEMO_MODE) {
    console.log('📚 DEMO MODE - Generating mock questions from URL');
    return generateMockQuestions('programming', numQuestions);
  }

  if (!GOOGLE_GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured. Please add it to .env file');
  }

  try {
    console.log('🌐 Fetching content from URL:', url);
    
    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    // Dynamically import cheerio
    const cheerio = await import('cheerio');
    const $ = cheerio.load(response.data);
    
    // Remove script, style, and other non-content elements
    $('script, style, nav, header, footer, aside, iframe, noscript').remove();
    
    // Extract text from main content areas
    let content = '';
    const mainSelectors = ['main', 'article', '[role="main"]', '.content', '#content', '.post', '.article'];
    
    for (const selector of mainSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text();
        break;
      }
    }
    
    // Fallback to body if no main content found
    if (!content) {
      content = $('body').text();
    }
    
    // Clean up the text
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()
      .substring(0, 10000); // Limit to 10k chars
    
    if (content.length < 100) {
      throw new Error('Not enough content extracted from the webpage');
    }
    
    console.log('✅ Extracted', content.length, 'characters from webpage');
    
    // Generate questions using the extracted content
    const prompt = `Based on the following web content, generate ${numQuestions} multiple choice quiz questions.
    Content: "${content}"
    
    For each question, provide 4 options (A, B, C, D) and indicate the correct answer.
    Return the result as a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (0, 1, 2, or 3 as numeric index).
    Only return the JSON array, no additional text.`;

    console.log('🔍 Calling Google Gemini API for web content | Model:', model);
    const aiResponse = await axios.post(
      `${getApiUrl(model)}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const aiContent = aiResponse.data.candidates[0].content.parts[0].text;
    const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      console.log('✅ Successfully generated', questions.length, 'questions from URL');
      return questions;
    }
    throw new Error('Failed to parse AI response');
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      throw new Error('Unable to reach the website. Please check the URL.');
    }
    if (error.response?.status === 403 || error.response?.status === 401) {
      throw new Error('Access denied to this website. Try a different URL.');
    }
    console.error('❌ Error generating questions from URL:', error.message);
    throw error;
  }
};
