import { createServer } from './server';
import { NextFunction, Request, Response } from 'express';

const { app, start } = createServer();

app.get('*', (req: Request, res: Response, next: NextFunction): void => {
    console.log({
        method: req.method,
        path: req.path,
        host: req.hostname,
        headers: req.headers,
    });

    res.status(200).send('OK');
});

start();
