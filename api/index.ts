// Import express and create api
// module
import express, { Request, Response } from 'express';
const api = express();

// Import functions
import Reply from "./core/Reply";
import CalculateScore from "./reporank/CalculateScore";

// Serve api root page
api.get("/", (req: Request, res: Response) => {
    Reply(res, 200, {
        title: "🔥reporank public api",
        version: process.env.VERSION,
        github: "https://github.com/jackdevey/reporank",
        docs: "https://github.com/jackdevey/reporank/wiki/api",
        frontend: "https://" + process.env.DOMAIN + "/"
    });
});

// Dynamic owner/repo route
api.get("/:owner/:repo", (req, res) => {
    CalculateScore(req.params.owner, req.params.repo).then(r => {
        // Reply with reporank score
        Reply(res, 200, r);
    }, e => {
        // Reply with error message
        Reply(res, 400, { message: e.message });
    });
});

// Export as submodule
export default api;