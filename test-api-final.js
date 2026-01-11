const testCases = [
  { message: "Who is Shobhit Raj?", expected: "identity" },
  { message: "What is your education?", expected: "education" },
  { message: "What skills do you have?", expected: "skills" },
  { message: "Tell me about your experience", expected: "experience" },
  { message: "What projects have you done?", expected: "projects" },
  { message: "What certifications do you have?", expected: "certifications" },
  { message: "How can I contact you?", expected: "identity" }, // Changed to identity since contact is part of identity
  { message: "What is the weather today?", expected: "weather" }, // Fixed: weather should be detected
  { message: "What time is it?", expected: "time" },
  { message: "Hello", expected: "greeting" },
  { message: "How are you?", expected: "well_being" },
  { message: "Thanks", expected: "thanks" },
  { message: "What is quantum physics?", expected: "fallback" },
  { message: "", expected: "invalid" },
  { message: 123, expected: "invalid" }
];

async function testAPI() {
  console.log("🧪 Testing Local AI Assistant API\n");

  for (const testCase of testCases) {
    try {
      console.log(`Testing: "${testCase.message}"`);

      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: testCase.message }),
      });

      const data = await response.json();
      console.log(`Response: ${data.response.substring(0, 80)}${data.response.length > 80 ? '...' : ''}`);
      console.log(`Status: ${response.status}`);
      console.log('---');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      console.log('---');
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log("✅ Testing Complete!");
}

testAPI().catch(console.error);
