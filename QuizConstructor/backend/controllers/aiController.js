import axios from 'axios';

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GOOGLE_GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1/models';
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
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
        correctAnswer: 2,
        explanation: 'World War II ended in 1945 with the surrender of Japan in September, following the atomic bombings of Hiroshima and Nagasaki.'
      },
      {
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
        correctAnswer: 1,
        explanation: 'George Washington served as the first President from 1789 to 1797 and is often called the "Father of His Country".'
      },
      {
        question: 'What was the main cause of the French Revolution?',
        options: ['Economic crisis', 'Religious conflict', 'Colonial disputes', 'Succession crisis'],
        correctAnswer: 0,
        explanation: 'The French Revolution was primarily triggered by severe economic crises, including bankruptcy, unfair taxation, and food shortages.'
      },
      {
        question: 'Which ancient wonder of the world still stands today?',
        options: ['Colossus of Rhodes', 'Great Pyramid of Giza', 'Hanging Gardens of Babylon', 'Lighthouse of Alexandria'],
        correctAnswer: 1,
        explanation: 'The Great Pyramid of Giza is the only one of the Seven Ancient Wonders still standing, built around 2560 BCE.'
      },
      {
        question: 'In what year did the Titanic sink?',
        options: ['1910', '1911', '1912', '1913'],
        correctAnswer: 2,
        explanation: 'The RMS Titanic sank on April 15, 1912, after hitting an iceberg during its maiden voyage from Southampton to New York.'
      }
    ],
    biology: [
      {
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correctAnswer: 1,
        explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for cellular processes.'
      },
      {
        question: 'How many chromosomes do humans have?',
        options: ['23', '46', '48', '52'],
        correctAnswer: 1,
        explanation: 'Humans have 46 chromosomes arranged in 23 pairs - one set inherited from each parent.'
      },
      {
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
        correctAnswer: 1,
        explanation: 'Photosynthesis converts light energy, CO₂, and water into glucose and oxygen, occurring in chloroplasts.'
      },
      {
        question: 'Which blood type is the universal donor?',
        options: ['A', 'B', 'AB', 'O'],
        correctAnswer: 3,
        explanation: 'Type O negative blood has no antigens and can be donated to any blood type, making it the universal donor.'
      },
      {
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Brain', 'Liver', 'Skin'],
        correctAnswer: 3,
        explanation: 'The skin is the largest organ, weighing about 8 pounds and covering approximately 22 square feet in adults.'
      }
    ],
    programming: [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        correctAnswer: 0,
        explanation: 'HTML (Hyper Text Markup Language) is the standard markup language for creating web pages and web applications.'
      },
      {
        question: 'Which of these is a server-side language?',
        options: ['JavaScript', 'Python', 'Java', 'All of the above'],
        correctAnswer: 3,
        explanation: 'JavaScript (Node.js), Python, and Java can all be used for server-side programming to handle backend logic.'
      },
      {
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Coded Style Sheets'],
        correctAnswer: 1,
        explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages, controlling colors, fonts, spacing, and more.'
      },
      {
        question: 'Which data structure uses LIFO?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'A Stack uses LIFO (Last In, First Out) - the last element added is the first one to be removed.'
      },
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
        correctAnswer: 2,
        explanation: 'Binary search has O(log n) complexity because it divides the search space in half with each iteration.'
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
  For each question, provide 4 options (A, B, C, D), indicate the correct answer, and provide a brief explanation (1-2 sentences) of why the answer is correct.
  Return the result as a JSON array with objects containing: question, options (array of 4 strings), correctAnswer (0, 1, 2, or 3 as numeric index), and explanation (string).
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
  
  For each question, provide 4 options (A, B, C, D), indicate the correct answer, and provide a brief explanation (1-2 sentences) of why the answer is correct.
  Return the result as a JSON array with objects containing: question, options (array of 4 strings), correctAnswer (0, 1, 2, or 3 as numeric index), and explanation (string).
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

export const generateQuestionsFromWebSearch = async (searchQuery, numQuestions) => {
  // Use demo mode if API key not configured or DEMO_MODE enabled
  if (DEMO_MODE) {
    console.log('📚 DEMO MODE - Generating mock questions from web search');
    return generateMockQuestions('programming', numQuestions);
  }

  if (!PERPLEXITY_API_KEY) {
    throw new Error('PERPLEXITY_API_KEY is not configured. Please add it to .env file or contact support.');
  }

  try {
    console.log('🔍 Searching the web with Perplexity for:', searchQuery);
    
    // First, use Perplexity to search and gather information
    const searchPrompt = `Search the web for comprehensive information about: "${searchQuery}". 
    Provide detailed, accurate information from reliable sources that can be used to create educational quiz questions.`;

    const searchResponse = await axios.post(
      PERPLEXITY_API_URL,
      {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful research assistant that provides accurate, well-sourced information from the web.'
          },
          {
            role: 'user',
            content: searchPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const researchContent = searchResponse.data.choices[0].message.content;
    const citations = searchResponse.data.citations || [];
    
    console.log('✅ Received research content from Perplexity');
    console.log('📚 Citations:', citations.length, 'sources found');

    // Now generate quiz questions based on the research
    const quizPrompt = `Based on the following web research about "${searchQuery}", generate ${numQuestions} multiple choice quiz questions.

    Research Content:
    ${researchContent}

    Requirements:
    - Create educational, fact-based questions
    - Ensure questions are accurate and verifiable
    - Each question should have 4 options (A, B, C, D)
    - Indicate the correct answer as a numeric index (0, 1, 2, or 3)
    - Questions should cover different aspects of the topic
    - Difficulty should be appropriate for learners

    Return ONLY a JSON array with objects containing: question, options (array of 4 strings), and correctAnswer (numeric index 0-3).
    No additional text or explanation.`;

    const quizResponse = await axios.post(
      PERPLEXITY_API_URL,
      {
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert quiz creator. Generate only valid JSON arrays of quiz questions.'
          },
          {
            role: 'user',
            content: quizPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const quizContent = quizResponse.data.choices[0].message.content;
    
    // Extract JSON array from response
    const jsonMatch = quizContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      
      // Add source citations to the response
      console.log('✅ Successfully generated', questions.length, 'questions from web search');
      console.log('📖 Sources used:', citations.slice(0, 5).join(', '));
      
      return {
        questions,
        sources: citations.slice(0, 10), // Return top 10 sources
        searchQuery
      };
    }
    throw new Error('Failed to parse AI response into quiz questions');
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid Perplexity API key. Please check your configuration.');
    }
    if (error.response?.status === 429) {
      throw new Error('Rate limit reached. Please try again in a few moments.');
    }
    console.error('❌ Error generating questions from web search:', error.response?.data || error.message);
    throw error;
  }
};
