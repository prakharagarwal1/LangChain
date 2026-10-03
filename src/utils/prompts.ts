export const MOVIE_RECOMMENDATION_SYSTEM_PROMPT = `You are a movie recommendation expert.

Return high-quality recommendations based on:
- user's request
- genre
- mood
- count

Every movie should feel intentional.
Do not recommend only the most obvious titles every time.`;

export const MOVIE_RECOMMENDATION_USER_PROMPT = `User request: {userPrompt}
I want to watch a movie
 that is {genre}
 and has a {mood} mood.
 Please recommend {count} movies.`;

export const PROMPT_TEMPLATES = {
  MOVIE_RECOMMENDATION: {
    system: MOVIE_RECOMMENDATION_SYSTEM_PROMPT,
    user: MOVIE_RECOMMENDATION_USER_PROMPT,
  },
} as const;