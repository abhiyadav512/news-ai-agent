import dotenv from "dotenv";
dotenv.config();
import winston from "winston"; // loggin step
import cron from "node-cron";
import { runJob } from "./job.js";

const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
});

const SCHEDULE = process.env.SCHEDULE_CRON || "0 7 * * *"; // default every day 07:00 server time

logger.info("Starting News Summarizer agent...");

runJob().catch((err) => logger.error("Initial run failed", err));

cron.schedule(SCHEDULE, async () => {
  logger.info("Scheduled job started");
  try {
    await runJob();
    logger.info("Scheduled job finished");
  } catch (err) {
    logger.error("Scheduled job failed", err);
  }
});
