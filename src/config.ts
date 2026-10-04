import dotenv from "dotenv";
dotenv.config();

export interface Config {
  openai: {
    apiKey: string;
    baseURL: string;
    model: string;
    temperature: number;
  };
  app: {
    port: number;
    url: string;
    name: string;
  };
}

const config: Config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? "",
    baseURL: process.env.OPENAI_BASE_URL ?? "https://openrouter.ai/api/v1",
    model: process.env.OPENAI_MODEL ?? "dots-studio/dots-3-note-preview:free",
    temperature: Number(process.env.OPENAI_TEMPERATURE ?? 0.3),
  },
  app: {
    port: parseInt(process.env.PORT ?? "3000", 10),
    url: process.env.APP_URL ?? "http://localhost:3000",
    name: process.env.APP_NAME ?? "LangChain App",
  },
};

export default config;
