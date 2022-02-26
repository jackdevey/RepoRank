// Import environment vars
// from dotenv
import dotenv from 'dotenv';
dotenv.config();

// Import cors for cross origin resource 
// sharing
import cors from 'cors';

// Import express and vhost
// & create express app
import express from 'express';
import vhost from 'vhost';
const app = express();

// Import submodules
import api from './src/Api';

// Use vhost to create subdomains 
// that map to submodules
app.use(vhost(`api.${process.env.DOMAIN}`, api));

// Use cors to allow cross origin resource
// sharing
app.use(cors());

// Listen on port
app.listen(process.env.PORT, () => {
    console.log(`reporank server running on port ${process.env.PORT}`);
});