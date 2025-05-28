import { config } from 'dotenv';
import { OpenAgentsBuilderClient, ChatMessage, TestCase } from "./src/index";
import { nanoid } from 'nanoid';
import * as fs from 'fs';

// Load environment variables from .env file
config();

// Validate required environment variables
const requiredEnvVars = {
  DATABASE_ID_HASH: process.env.DATABASE_ID_HASH,
  OPEN_AGENTS_BUILDER_API_KEY: process.env.OPEN_AGENTS_BUILDER_API_KEY,
  AGENT_ID: process.env.AGENT_ID
};

// Check if all required environment variables are present
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Initialize the client
const client = new OpenAgentsBuilderClient({
  baseUrl: "https://app.openagentsbuilder.com", // optional, defaults to this
  databaseIdHash: process.env.DATABASE_ID_HASH!,
  apiKey: process.env.OPEN_AGENTS_BUILDER_API_KEY!
});

// Example 1: Basic chat with streaming using async generator
async function example1() {
  const messages: ChatMessage[] = [
    { role: "user", content: "What is the capital of France?" }
  ];

  try {
    // Stream the response chunk by chunk
    for await (const chunk of client.chat.streamChat(messages, {
      agentId: process.env.AGENT_ID!
    })) {
      if (chunk.type === 'text') {
        process.stdout.write(chunk.content);
      } else {
        console.log('Custom chunk:',chunk);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 2: Chat with callbacks for updates, completion, and errors
async function example2() {
  const messages: ChatMessage[] = [
    { role: "user", content: "Tell me a short story about a robot." }
  ];

  try {
    let collectedText = "";
    for await (const chunk of client.chat.streamChat(messages, {
      agentId: process.env.AGENT_ID!
    })) {
      if (chunk.type === 'text') {
        collectedText += chunk.content;
        console.log("Stream token: ", chunk.content);
      }
    }
    console.log("Final response:", collectedText);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 3: Chat with attachments (URL and local file)
async function example3() {
  const messages: ChatMessage[] = [
    {
      role: "user",
      content: "What can you tell me about this image (URL) and this document (local file)?",
      experimental_attachments: [
        {
          name: "screenshot.png",
          contentType: "image/png",
          url: "https://github.com/CatchTheTornado/open-agents-builder/raw/main/.readme-assets/screenshot-oab-2.png"
        },
        {
          name: "sample.pdf",
          file: "./sample.pdf" // Local file path (will be encoded as base64)
        }
      ]
    }
  ];

  // Check if the local file exists before sending
  const localFile = messages[0].experimental_attachments?.find(att => att.file);
  if (localFile && !fs.existsSync(localFile.file)) {
    console.error(`Local file not found: ${localFile.file}`);
    return;
  }

  try {
    let collectedText = "";
    for await (const chunk of client.chat.streamChat(messages, {
      agentId: process.env.AGENT_ID!
    })) {
      if (chunk.type === 'text') {
        collectedText += chunk.content;
        process.stdout.write(chunk.content);
      } else {
        console.log('Custom chunk:', chunk);
      }
    }
    console.log("\nFinal response:", collectedText);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 4: Continuing a conversation with session ID
async function example4() {
  // First message
  const firstMessages: ChatMessage[] = [
    { role: "user", content: "Let's talk about space exploration." }
  ];

  try {
    const sessionId = nanoid();
    let collectedText = "";
    
    for await (const chunk of client.chat.streamChat(firstMessages, {
      agentId: process.env.AGENT_ID!,
      sessionId: sessionId
    })) {
      if (chunk.type === 'text') {
        collectedText += chunk.content;
        process.stdout.write(chunk.content);
      }
    }
    console.log("Final response:", collectedText);

    // Continue the conversation using the session ID
    const followUpMessages: ChatMessage[] = [
      { role: "user", content: "Tell me more about Mars missions." }
    ];

    collectedText = "";
    for await (const chunk of client.chat.streamChat(followUpMessages, {
      agentId: process.env.AGENT_ID!,
      sessionId: sessionId
    })) {
      if (chunk.type === 'text') {
        collectedText += chunk.content;
        process.stdout.write(chunk.content);
      }
    }
    console.log("Follow-up final response:", collectedText);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 5: Maintaining conversation history with collectMessages
async function example5() {
  // Start a new conversation
  let messages: ChatMessage[] = [
    { role: "user", content: "Let's talk about artificial intelligence." }
  ];

  try {
    // First exchange
    const firstResponse = await client.chat.collectMessages(messages, {
      agentId: process.env.AGENT_ID!
    });
    
    console.log("First response:", firstResponse.messages[firstResponse.messages.length - 1].content);
    
    // Continue the conversation using the collected messages
    messages = firstResponse.messages;
    messages.push({ role: "user", content: "What are the main types of machine learning?" });
    
    const secondResponse = await client.chat.collectMessages(messages, {
      agentId: process.env.AGENT_ID!,
      sessionId: firstResponse.sessionId || undefined
    });
    
    console.log("Second response:", secondResponse.messages[secondResponse.messages.length - 1].content);
    
    // Continue with another question
    messages = secondResponse.messages;
    messages.push({ role: "user", content: "Can you explain deep learning?" });
    
    const thirdResponse = await client.chat.collectMessages(messages, {
      agentId: process.env.AGENT_ID!,
      sessionId: secondResponse.sessionId || undefined
    });
    
    console.log("Third response:", thirdResponse.messages[thirdResponse.messages.length - 1].content);
    
    // Print the entire conversation history
    console.log("\nFull conversation history:");
    thirdResponse.messages.forEach((msg: ChatMessage, index: number) => {
      console.log(`\n${index + 1}. ${msg.role.toUpperCase()}:`);
      console.log(msg.content);
    });
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 6: Using the evaluation framework
async function example6() {
  try {
    // Generate test cases for an agent
    const { testCases } = await client.evals.generateTestCases(
      process.env.AGENT_ID!,
      "You are a helpful assistant that can answer questions about various topics."
    );

    console.log("Generated test cases:", testCases);

    // Run the test cases
    const stream = await client.evals.runTestCases(process.env.AGENT_ID!, testCases);
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);
        if (!line) continue;
        try {
          const update = JSON.parse(line);
          if (update.type === 'test_case_update') {
            const testCase = update.data;
            console.log(`\nTest case ${testCase.id}:`);
            console.log(`Status: ${testCase.status}`);
            if (testCase.evaluation) {
              console.log(`Score: ${testCase.evaluation.score}`);
              console.log(`Explanation: ${testCase.evaluation.explanation}`);
            }
            if (testCase.error) {
              console.error(`\x1b[31mError: ${testCase.error}\x1b[0m`); // Red color
            }
          } else if (update.type === 'error') {
            console.error(`\x1b[31mServer error: ${update.message || JSON.stringify(update)}\x1b[0m`);
          }
        } catch (e) {
          // If not valid JSON, buffer it for the next chunk
          // Only show error if buffer is empty (i.e., this is a real parse error, not a partial)
          if (buffer.length === 0) {
            console.error(`\x1b[31mError parsing update: ${e instanceof Error ? e.message : e}\x1b[0m`);
            console.error(`\x1b[33mRaw line: ${line}\x1b[0m`); // Yellow color for raw line
          } else {
            // Partial JSON, wait for more data
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    }

    // Adjust a test case if needed
    const testCaseToAdjust = testCases[0];
    const adjustedTestCase = await client.evals.adjustTestCase(
      process.env.AGENT_ID!,
      testCaseToAdjust.id,
      "This is the actual result we got"
    );

    console.log("\nAdjusted test case:", adjustedTestCase.testCase);
  } catch (error) {
    console.error("\x1b[41m\x1b[37m[EXAMPLE6 ERROR]\x1b[0m", error instanceof Error ? error.message : error);
    if (error && typeof error === 'object' && 'stack' in error) {
      console.error(error.stack);
    }
  }
}

// Run the examples
async function main() {
  console.log("Running Example 1...");
  await example1();
  
  console.log("Running Example 2...");
  await example2();
  
  console.log("Running Example 3...");
  await example3();

  console.log("Running Example 4...");
  await example4();

  console.log("Running Example 5...");
  await example5();

  console.log("Running Example 6...");
  await example6();
}

main().catch(console.error); 