// Import environment vars
// from dotenv
import dotenv from 'dotenv';
dotenv.config();

// Import express and vhost
// & create express app
import express from 'express';
import vhost from 'vhost';
const app = express();

// Import submodules
import api from './api';

// Use vhost to create subdomains 
// that map to submodules
app.use(vhost(`api.${process.env.DOMAIN}`, api));

// Server hello world
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Listen on port
app.listen(8080, () => {
    console.log(`RepoRate backend running on port 8080`);
});