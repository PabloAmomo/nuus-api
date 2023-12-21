import { NextFunction, Request, Response } from "express";
import httpMocks from 'node-mocks-http';

export interface ControllerParams {
  req: Request | any;
  res: Response | any;
  next?: NextFunction;
  onFinish?: CallableFunction;
}