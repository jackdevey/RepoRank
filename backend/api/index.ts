// Import express and create api
// module
import express from 'express';
const api = express();

// Serve api root
api.get("/", (req, res) => {
    res.send("Api");
});

// Dynamic owner/repo route
api.get("/:owner/:repo", (req, res) => {
    res.send(`Api: ${req.params.owner}/${req.params.repo}`);
});

// Export as submodule
export default api;