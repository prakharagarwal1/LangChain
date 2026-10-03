import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { recommendRouter } from './routes';
import config from './config';
const app: express.Express = express();

app.use(cors());
app.use(express.json());
dotenv.config();
app.get('/health', (req: Request, res: Response) => {
  res.send('Langchain server is healthy and running!');
});

app.use("/api/recommend",recommendRouter);
app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});