import { Response } from "express";
export interface IQueryHandler {
  handleRequest(req: any, res: Response): Promise<void>;
}
