import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RecommendedMovies, recommendedMoviesSchema } from "../schema";
import { PROMPT_TEMPLATES } from "../utils/prompts";
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
    content: PROMPT_TEMPLATES.MOVIE_RECOMMENDATION.system,
  },
  {
    role: "user",
    content: PROMPT_TEMPLATES.MOVIE_RECOMMENDATION.user,
  },
]);


export const getMovieRecommendations = async( prompt:string,genre: string, mood: string, count: number):
Promise<RecommendedMovies> =>
  {

  const getStructuredResponseLLM= llm.withStructuredOutput(recommendedMoviesSchema)
  const messages = await promptTemplate.pipe(getStructuredResponseLLM);
  const response = await messages.invoke({
 userPrompt: prompt,
 genre: genre,
 mood: mood,
 count: count

  });
  console.log("Structured response:", response);
return response;
}