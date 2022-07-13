// Import express and create api
// module
import express, { Request, Response } from 'express';
const api = express();

// Import badge api
import { makeBadge, ValidationError } from 'badge-maker'

// Import functions
import Reply from "./Reply";
import { CalculateScore } from "./CalculateScore";
import { CalculateUserScore } from "./CalculateUserScore";

// Serve api root page
api.get("/", (req: Request, res: Response) => {
    Reply(req, res, 200, {
        title: "🔥RepoRank Public API",
        version: process.env.VERSION,
        github: "https://github.com/jackdevey/reporank",
        docs: "https://github.com/jackdevey/reporank/wiki/RepoRank-API",
        frontend: "https://" + process.env.DOMAIN + "/"
    });
});

// Dynamic user route
api.get("/:user", (req, res) => {
    if(req.params.user == "favicon.ico") return;
    CalculateUserScore(req.params.user).then(response => {
        Reply(req, res, 200, response);
    }).catch(e => {
        Reply(req, res, 404, e);
    });
});

// Dynamic owner/repo route
api.get("/:owner/:repo", (req, res) => {
    CalculateScore(req.params.owner, req.params.repo, (err, response) => {
        // If error, reply with error
        if(err) Reply(req, res, err.status, err);
        else Reply(req, res, 200, response);
    });
});

// Badge for owner/repo route
api.get("/:owner/:repo/badge", async (req, res) => {
    CalculateScore(req.params.owner, req.params.repo, (err, response) => {
        // If error, reply with error
        if(err) {
            // Reply with error badge
            var svg = makeBadge({
                label: '🔥RepoRank',
                message: 'Error',
                color: 'inactive',
            });
            // Set headers
            res.setHeader('Content-Type', 'image/svg+xml');
            res.send(svg);
        } else {
            // Reply with reporank badge
            var svg = makeBadge({
                label: '🔥RepoRank',
                message: response.score.toString() + "pts",
                color: 'orange',
            });
            // Set headers
            res.setHeader('Content-Type', 'image/svg+xml');
            res.send(svg);
        }
    })
});

// Export as submodule
export default api;