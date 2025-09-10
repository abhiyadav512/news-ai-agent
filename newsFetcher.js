import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
const NEWSAPI_ENDPOINT = "https://newsapi.org/v2/top-headlines";

if (!NEWSAPI_KEY) {
  throw new Error("NEWSAPI_KEY is missing in your environment variables");
}

export async function fetchTopHeadlines({
  // country = "in",
  // category = "sport",
  language = "en",

  pageSize = 3,
} = {}) {
  try {
    console.log("Fetching top headlines with:", {
      // country,
      // category,
      language: "en",
      pageSize,
    });

    const res = await axios.get(NEWSAPI_ENDPOINT, {
      params: {
        apiKey: NEWSAPI_KEY,
        // country,
        // category,
        language,
        pageSize,
      },
    });

    if (res.data && res.data.articles && res.data.articles.length > 0) {
      return res.data.articles.map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        content: a.content,
        source: { name: a.source.name },
        publishedAt: a.publishedAt,
      }));
    } else {
      console.log(
        "No articles fetched. Check your country/category or API limits."
      );
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch top headlines:", err.message, err);
    return [];
  }
}
