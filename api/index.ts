// Import express and create api
// module
import express, { Request, Response } from 'express';
const api = express();

// Import reply function
import reply from './core/reply';

// Serve api root page
api.get("/", (req: Request, res: Response) => {
    reply(res, 200, {
        title: "🔥reporank public api",
        version: process.env.VERSION,
        github: "https://github.com/jackdevey/reporank",
        docs: "https://github.com/jackdevey/reporank/wiki/api",
        frontend: "https://" + process.env.DOMAIN + "/"
    });
});

// Dynamic owner/repo route
api.get("/:owner/:repo", (req, res) => {
    res.send(`Api: ${req.params.owner}/${req.params.repo}`);
});

// Export as submodule
export default api;