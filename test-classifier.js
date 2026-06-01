// Simple test script for error classifier
const { classifyError, testClassifier } = require('./dist/lib/errorClassifier.js');

console.log('Testing Error Classifier...\n');

// Test cases
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
  },
  {
    original: "各行各业",
    translation: "all industries",
    expected: ['VocabularyError']
  }
];

testCases.forEach((testCase, index) => {
  console.log(`Test case ${index + 1}:`);
  console.log(`Original: ${testCase.original}`);
  console.log(`Translation: ${testCase.translation}`);
  
  try {
    const result = classifyError(testCase.original, testCase.translation);
    console.log(`Found errors: ${result.errors.map(e => e.type).join(', ')}`);
    console.log(`Overall score: ${result.overallScore}`);
    
    result.errors.forEach(error => {
      console.log(`\n${error.type}:`);
      console.log(`  Explanation: ${error.explanation}`);
      console.log(`  Examples: ${error.examples.join('; ')}`);
      console.log(`  Suggestions: ${error.suggestions.join('; ')}`);
    });
    
    console.log('---');
  } catch (error) {
    console.log('Error:', error.message);
    console.log('---');
  }
});