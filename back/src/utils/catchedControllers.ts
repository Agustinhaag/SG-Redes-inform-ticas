import { NextFunction, Request, Response } from "express";

export const catchedController = (controller: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    };
};