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
    baseURL: process.env.OPENAI_BASE_URL ?? "",
    model: process.env.OPENAI_MODEL ?? "",
    temperature: Number(process.env.OPENAI_TEMPERATURE ?? 0.3),
  },
  app: {
    port: parseInt(process.env.PORT ?? "3000", 10),
    url: process.env.APP_URL ?? "",
    name: process.env.APP_NAME ?? "",
  },
};

export default config;
