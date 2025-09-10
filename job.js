import { fetchTopHeadlines } from "./newsFetcher.js";
import { summarizeBatch } from "./summarizer.js";
import { sendWhatsappMessages } from "./whatsappSender.js";
import pRetry from "p-retry";
import Bottleneck from "bottleneck";
import winston from "winston";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Rate limiter to avoid hitting WhatsApp/Twilio limits
const limiter = new Bottleneck({ minTime: 250 }); // 4 req/sec max (tune to provider limits)

export async function runJob() {
  const articles = await fetchTopHeadlines();
  if (!articles || articles.length === 0) {
    logger.info("No articles fetched.");
    return;
  }

  // todo : scrape the full content from each article URL, clean it, then summarize it to much more accurate.

  // Summarize in batch - can be per article or combined digest
  // Use retries for flaky LLM calls

  const summaries = await pRetry(() => summarizeBatch(articles), {
    retries: 2,
  });

  // Send each summary
  for (let i = 0; i < summaries.length; i++) {
    const msg = formatWhatsAppMessage(summaries[i], articles[i]);
    // Use limiter.wrap to respect rate limits
    await limiter.schedule(() =>
      pRetry(() => sendWhatsappMessages(msg), { retries: 3 })
    );
  }

  logger.info(`Sent ${summaries.length} messages.`);
}

function formatWhatsAppMessage(summary, article) {
  return `*${article.source?.name || "News"}* — ${
    article.title
  }\n\n${summary.trim()}\n\nRead: ${article.url}`;
}
