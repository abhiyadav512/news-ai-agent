// This shows LangChain JS usage with OpenAI — adapt if you use Google GenAI
import { LLMChain } from "langchain/chains";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.2,
  maxTokens: 250,
});

const prompt = new PromptTemplate({
  inputVariables: ["title", "description", "content", "url"],
  template: `You are a concise news summarizer. Given the article title, short description, and content, produce a 2-3 sentence summary suitable for WhatsApp, mentioning only the most important points. Do not include opinion or filler.

Title: {title}
Description: {description}
Content: {content}
URL: {url}

Summary:`,
});

export async function summarizeBatch(articles) {
  // returns array of summaries in same order
  const chain = new LLMChain({ llm: model, prompt });

  const results = [];
  for (const a of articles) {
    const input = {
      title: a.title ?? "",
      description: a.description ?? "",
      content: a.content ?? "",
      url: a.url ?? "",
    };
    const out = await chain.call(input);
    // out.text or out.output_text depending on LangChain version
    results.push(
      out.text?.trim?.() ?? out.output_text?.trim?.() ?? String(out)
    );
  }
  return results;
}
