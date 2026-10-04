import { Request, Response } from 'express'
import { getMovieRecommendations } from '../services';

export async function recommendedMovies(req: Request, res: Response) {
  try {
    const {
      userPrompt = "Suggest movies for a rainy night",
      genre = "thriller",
      mood = "relaxed",
      count = 5
    } = req.body;
    const recommendations = await getMovieRecommendations(userPrompt, genre, mood, count);
res.status(200).json({ recommendations });  
} catch (error) {
console.error('Error occurred while fetching movie recommendations', error);
res.status(500).json({ error: 'An error occurred while fetching movie recommendations', details: error instanceof Error ? error.message : String(error) });
  }
}