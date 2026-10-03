import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RecommendedMovies, recommendedMoviesSchema } from "../schema";
import { PROMPT_TEMPLATES } from "../utils/prompts";

const llm = new ChatOpenAI({
  model: process.env.OPENAI_MODEL ?? "dots-studio/dots-3-note-preview:free",
  temperature: Number(process.env.OPENAI_TEMPERATURE ?? 0.3),
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL ?? "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
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