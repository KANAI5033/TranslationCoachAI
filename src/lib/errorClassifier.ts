export type ErrorType = 'VocabularyError' | 'GrammarError' | 'Chinglish' | 'StyleError';

export interface ErrorAnalysis {
  type: ErrorType;
  confidence: number;
  explanation: string;
  examples: string[];
  suggestions: string[];
}

export interface ClassificationResult {
  errors: ErrorAnalysis[];
  overallScore: number;
}

// Vocabulary error patterns
const vocabularyPatterns = {
  incorrectWord: [
    'skill needs', // Should be "skill requirements"
    'all industries', // Should be "various industries"
    'work patterns', // Could be "work models" or "working patterns"
    'artificial intelligence', // Sometimes abbreviated incorrectly
  ],
  missingArticle: [
    'the',
    'a',
    'an'
  ],
  prepositionErrors: [
    'in',
    'on',
    'at',
    'to',
    'for',
    'with',
    'by'
  ]
};

// Grammar error patterns
const grammarPatterns = {
  tenseErrors: [
    'has bring', // Should be "has brought"
    'have bring', // Should be "have brought"
    'is require', // Should be "requires"
    'are require'  // Should be "require"
  ],
  subjectVerbAgreement: [
    'industries has', // Should be "industries have"
    'development have', // Should be "development has"
    'opportunities has' // Should be "opportunities have"
  ],
  sentenceStructure: [
    'requiring us', // Might need "which requires us"
    'which require', // Should be "which requires"
    'that require'   // Should be "that requires"
  ]
};

// Chinglish patterns (Chinese English direct translations)
const chinglishPatterns = {
  directTranslations: [
    'very much', // Overused in Chinglish
    'no problem', // Common Chinglish phrase
    'long time no see', // Classic Chinglish
    'you can you up', // Internet Chinglish
    'good good study', // Direct translation
    'day day up'       // Direct translation
  ],
  wordOrder: [
    'I very like', // Should be "I like very much"
    'you first go', // Should be "you go first"
    'this book I have read' // Should be "I have read this book"
  ],
  unnecessaryWords: [
    'the', // Often overused
    'very', // Overused
    'much', // Overused
    'so'    // Overused
  ]
};

// Style error patterns
const stylePatterns = {
  informalLanguage: [
    'gonna',
    'wanna',
    'gotta',
    'kinda',
    'sorta',
    'ain\'t'
  ],
  repetition: [
    'very very',
    'really really',
    'so so',
    'much much'
  ],
  awkwardPhrasing: [
    'in order to', // Often can be simplified to "to"
    'due to the fact that', // Can be "because"
    'at this point in time', // Can be "now"
    'with regard to' // Can be "about"
  ],
  politicalTerms: [
    'artificial intelligence', // Should be consistent
    'AI', // Abbreviation consistency
    'work patterns', // Formal vs informal
    'skill requirements' // Formal term
  ]
};

/**
 * Check for vocabulary errors
 */
function checkVocabularyErrors(text: string): ErrorAnalysis | null {
  const lowerText = text.toLowerCase();
  const foundErrors: string[] = [];
  
  // Check for incorrect word usage
  vocabularyPatterns.incorrectWord.forEach(word => {
    if (lowerText.includes(word)) {
      foundErrors.push(`Incorrect word usage: "${word}"`);
    }
  });
  
  // Check for missing articles (simple heuristic)
  const articleRegex = /\b([a-zA-Z]+)\s+([a-zA-Z]+)\b/g;
  let match;
  while ((match = articleRegex.exec(text)) !== null) {
    const word = match[2].toLowerCase();
    if (/^[aeiou]/i.test(word) && !vocabularyPatterns.missingArticle.includes(match[1].toLowerCase())) {
      foundErrors.push(`Possible missing article before "${word}"`);
    }
  }
  
  if (foundErrors.length > 0) {
    return {
      type: 'VocabularyError',
      confidence: Math.min(0.9, foundErrors.length * 0.2),
      explanation: '词汇使用不准确或存在语法小词错误',
      examples: foundErrors.slice(0, 3),
      suggestions: [
        '使用更准确的词汇表达',
        '检查冠词使用是否正确',
        '注意介词搭配'
      ]
    };
  }
  
  return null;
}

/**
 * Check for grammar errors
 */
function checkGrammarErrors(text: string): ErrorAnalysis | null {
  const lowerText = text.toLowerCase();
  const foundErrors: string[] = [];
  
  // Check tense errors
  grammarPatterns.tenseErrors.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Tense error: "${pattern}"`);
    }
  });
  
  // Check subject-verb agreement
  grammarPatterns.subjectVerbAgreement.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Subject-verb agreement: "${pattern}"`);
    }
  });
  
  // Check sentence structure issues
  grammarPatterns.sentenceStructure.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Sentence structure: "${pattern}"`);
    }
  });
  
  if (foundErrors.length > 0) {
    return {
      type: 'GrammarError',
      confidence: Math.min(0.95, foundErrors.length * 0.3),
      explanation: '句子结构存在语法问题',
      examples: foundErrors.slice(0, 3),
      suggestions: [
        '检查主谓一致',
        '确认时态使用正确',
        '优化句子结构'
      ]
    };
  }
  
  return null;
}

/**
 * Check for Chinglish patterns
 */
function checkChinglishErrors(text: string): ErrorAnalysis | null {
  const lowerText = text.toLowerCase();
  const foundErrors: string[] = [];
  
  // Check direct translations
  chinglishPatterns.directTranslations.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Chinglish expression: "${pattern}"`);
    }
  });
  
  // Check word order issues
  chinglishPatterns.wordOrder.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Word order issue: "${pattern}"`);
    }
  });
  
  // Check unnecessary words
  const wordCount = text.split(/\s+/).length;
  chinglishPatterns.unnecessaryWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches && matches.length > 3) {
      foundErrors.push(`Overuse of "${word}": used ${matches.length} times`);
    }
  });
  
  if (foundErrors.length > 0) {
    return {
      type: 'Chinglish',
      confidence: Math.min(0.85, foundErrors.length * 0.25),
      explanation: '翻译中出现了中式英语的表达方式',
      examples: foundErrors.slice(0, 3),
      suggestions: [
        '避免字面直译',
        '学习地道英语表达',
        '多阅读英文原文材料'
      ]
    };
  }
  
  return null;
}

/**
 * Check for style errors
 */
function checkStyleErrors(text: string): ErrorAnalysis | null {
  const lowerText = text.toLowerCase();
  const foundErrors: string[] = [];
  
  // Check informal language
  stylePatterns.informalLanguage.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Informal language: "${pattern}"`);
    }
  });
  
  // Check repetition
  stylePatterns.repetition.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Word repetition: "${pattern}"`);
    }
  });
  
  // Check awkward phrasing
  stylePatterns.awkwardPhrasing.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      foundErrors.push(`Awkward phrasing: "${pattern}"`);
    }
  });
  
  // Check political terms consistency
  stylePatterns.politicalTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      const abbreviated = term === 'artificial intelligence' && text.includes('AI');
      const fullForm = term === 'AI' && text.includes('artificial intelligence');
      if (abbreviated || fullForm) {
        foundErrors.push(`Terminology inconsistency: "${term}"`);
      }
    }
  });
  
  if (foundErrors.length > 0) {
    return {
      type: 'StyleError',
      confidence: Math.min(0.8, foundErrors.length * 0.2),
      explanation: '翻译风格不够自然或存在术语不一致',
      examples: foundErrors.slice(0, 3),
      suggestions: [
        '保持术语一致性',
        '避免口语化表达',
        '使用更自然的英语表达方式'
      ]
    };
  }
  
  return null;
}

/**
 * Main classification function
 * Analyzes the translated text and classifies errors
 */
export function classifyError(originalText: string, translatedText: string): ClassificationResult {
  const errors: ErrorAnalysis[] = [];
  
  // Check each type of error
  const vocabularyError = checkVocabularyErrors(translatedText);
  if (vocabularyError) errors.push(vocabularyError);
  
  const grammarError = checkGrammarErrors(translatedText);
  if (grammarError) errors.push(grammarError);
  
  const chinglishError = checkChinglishErrors(translatedText);
  if (chinglishError) errors.push(chinglishError);
  
  const styleError = checkStyleErrors(translatedText);
  if (styleError) errors.push(styleError);
  
  // Calculate overall score (0-100)
  const errorPenalty = errors.reduce((sum, error) => sum + error.confidence, 0);
  const overallScore = Math.max(0, 100 - (errorPenalty * 25));
  
  return {
    errors,
    overallScore: Math.round(overallScore)
  };
}

/**
 * Utility function to test the classifier
 */
export function testClassifier() {
  const testCases = [
    {
      original: "人工智能的快速发展",
      translation: "The rapid development of AI has bring opportunities",
      expected: ['GrammarError', 'VocabularyError']
    },
    {
      original: "我们需要重新思考",
      translation: "We need to rethink very much",
      expected: ['Chinglish']
    },
    {
      original: "技能要求",
      translation: "skill needs",
      expected: ['VocabularyError']
    }
  ];
  
  testCases.forEach((testCase, index) => {
    const result = classifyError(testCase.original, testCase.translation);
    console.log(`Test case ${index + 1}:`);
    console.log(`Original: ${testCase.original}`);
    console.log(`Translation: ${testCase.translation}`);
    console.log(`Expected: ${testCase.expected.join(', ')}`);
    console.log(`Found: ${result.errors.map(e => e.type).join(', ')}`);
    console.log(`Score: ${result.overallScore}`);
    console.log('---');
  });
}