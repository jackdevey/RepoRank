// Import environment vars
// from dotenv
import dotenv from 'dotenv';
dotenv.config();

// Import express and vhost
// & create express app
import express from 'express';
const app = express();

// Manage server cache
import Cache from 'cache';
const cache = new Cache();

// Import & use rateLimiter
import { rateLimiter } from "./rateLimiter"
app.use(rateLimiter);

// Import functions
import Reply from "./src/Reply";
import { CalculateScore } from "./src/repos/CalculateScore";
import { CalculateUserScore } from "./src/users/CalculateUserScore";
import { Repo404Error, User404Error } from './src/ErrorResponses';
import Trending from './src/trending/Index';
import { ReplyShield, ReplyShieldError } from './src/shields';

// Serve api root page
app.get("/", (req, res) => {
    Reply(req, res, 200, {
        title: "🔥RepoRank Public API",
        version: process.env.VERSION,
        github: "https://github.com/jackdevey/reporank",
        docs: "https://github.com/jackdevey/reporank/wiki/RepoRank-API",
        frontend: "https://" + process.env.DOMAIN + "/"
    });
});

// Shields for users
app.get("/shields/:user", async (req, res) => {
    CalculateUserScore(req.params.user)
    .then(response => {
        ReplyShield(res, response.summary.score.toString() + " pts");
    })
    .catch(e => {
        ReplyShieldError(res);
    });
});

// Shields for repos
app.get("/shields/:owner/:repo/", async (req, res) => {
    CalculateScore(req.params.owner, req.params.repo)
    .then(response => {
        ReplyShield(res, response.score.toString() + " pts");
    })
    .catch(e => {
        ReplyShieldError(res);
    });
});

// Trending repos route
app.get("/trending", (req, res) => {
    // Is the response cached?
    let cachedResp = cache.get(req.url);
    if (cachedResp) { Reply(req, res, 200, cachedResp); }
    // Otherwise, get the data again
    else {
        Trending()
        .then(response => {
            cache.put(req.url, response, 60 * 60 * 24 * 1000);
            Reply(req, res, 200, response);
        });
    }
});

// Dynamic user route
app.get("/calculate/:user", (req, res) => {
    if(req.params.user == "favicon.ico") return;
    CalculateUserScore(req.params.user)
    .then(response => {
        Reply(req, res, 200, response);
    })
    .catch(e => {
        Reply(req, res, 404, User404Error());
    });
});

// Dynamic owner/repo route
app.get("/calculate/:owner/:repo", (req, res) => {
    CalculateScore(req.params.owner, req.params.repo)
    .then(response => {
        Reply(req, res, 200, response);
    })
    .catch(err => {
        Reply(req, res, err.status, Repo404Error());
    });
});

// Listen on port
app.listen(process.env.PORT, () => {
    console.log("RepoRank API");
    console.log("domain: " + "api." + process.env.DOMAIN);
    console.log("port: " + process.env.PORT);
    console.log("==/>");
});