// Import express and create api
// module
import express, { Request, Response } from 'express';
const api = express();

// Import badge api
import { makeBadge, ValidationError } from 'badge-maker'

// Import functions
import Reply from "./core/Reply";
import CalculateScore from "./reporank/CalculateScore";

// Serve api root page
api.get("/", (req: Request, res: Response) => {
    Reply(res, 200, {
        title: "🔥RepoRank Public API",
        version: process.env.VERSION,
        github: "https://github.com/jackdevey/reporank",
        docs: "https://github.com/jackdevey/reporank/wiki/RepoRank-API",
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

// Badge for owner/repo route
api.get("/:owner/:repo/badge", (req, res) => {
    CalculateScore(req.params.owner, req.params.repo).then(r => {
        // Reply with reporank badge
        var svg = makeBadge({
            label: '🔥RepoRank',
            message: r.score.toString() + "pts",
            color: 'orange',
        });
        // Set headers
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    }, e => {
        // Reply with reporank badge
        var svg = makeBadge({
            label: '🔥RepoRank',
            message: "Unknown",
            color: 'lightgrey',
        });
        // Set headers
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svg);
    });
});

// Export as submodule
export default api;