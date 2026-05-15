import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).json({
        message: 'Internal Server Error'
    });
};

export default errorMiddleware;