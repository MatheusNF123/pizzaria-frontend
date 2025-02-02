import express, { Request, Response } from "express";
import "express-async-errors";
import MiddleError from "./Middleware/ErrorMiddleware";
import routes from "./Routes";
import cors from "cors";
import path from "path";

class App {
  public app: express.Express;
  public router = routes;

  constructor() {
    this.app = express();
    this.config();
    this.routers();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
    // this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private routers(): void {
    this.app.get("/", (_req: Request, res: Response) =>
      res.status(200).json({ ok: true })
    );

    
    this.router(this.app);
    this.app.use(MiddleError.errorMiddleware);
  }
}

export default new App().app;
