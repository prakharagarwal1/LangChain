import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecommendedMovies, recommendedMoviesSchema } from "../schema";
import {
  MOVIE_RECOMMENDATION_SYSTEM_PROMPT,
  MOVIE_RECOMMENDATION_USER_PROMPT,
} from "../utils/prompts";
import config from "../config";

const llm = new ChatOpenAI({
  model: config.openai.model,
  temperature: config.openai.temperature,
  configuration: {
    baseURL: config.openai.baseURL,
    apiKey: config.openai.apiKey,
  },
});
const promptTemplate = ChatPromptTemplate.fromMessages([
  {
    role: "system",
    content: MOVIE_RECOMMENDATION_SYSTEM_PROMPT,
  },
  {
    role: "user",
    content: MOVIE_RECOMMENDATION_USER_PROMPT,
  },
]);

export const getMovieRecommendations = async (
  prompt: string,
  genre: string,
  mood: string,
  count: number,
): Promise<RecommendedMovies> => {
  const getStructuredResponseLLM = llm.withStructuredOutput(
    recommendedMoviesSchema,
  );
  try {
    const messages = await promptTemplate.pipe(getStructuredResponseLLM);
    const response = await messages.invoke({
      userPrompt: prompt,
      genre: genre,
      mood: mood,
      count: count,
    });
    console.log("Structured response:", response);
    return response;
  } catch (error) {
    console.error("Error getting movie recommendations:", error);
    throw error;
  }
};
