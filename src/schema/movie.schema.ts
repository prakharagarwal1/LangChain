import {z} from "zod";

export const movieSchema = z.object({
  title: z.string().describe("The title of the movie"),
  genre: z.array(z.string()).describe("The genre(s) of the movie"),
  mood: z.string().describe("The mood of the movie"),
  description: z.string().min(10).max(200).describe("A brief description of the movie"),
  rating: z.number().min(0).max(10).describe("The rating of the movie"),
  year: z.number().int().min(1900).max(new Date().getFullYear()).describe("The year the movie was released"),
  director: z.string().describe("The director of the movie"),
  cast: z.array(z.string()).describe("The cast of the movie"),
  duration: z.number().int().min(1).describe("The duration of the movie in minutes")
});

export const recommendedMoviesSchema = z.array(movieSchema).describe("An array of movie objects");
export type Movie = z.infer<typeof movieSchema>;
export type RecommendedMovies = z.infer<typeof recommendedMoviesSchema>;