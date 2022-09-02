// Import badge api
import { makeBadge } from 'badge-maker';

export function ReplyShield(res, message, label = "🔥RepoRank", color = "blue") {
    // Reply with badge
    var svg = makeBadge({
        label: label,
        message: message,
        color: color
    });
    // Send headers
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}

export function ReplyShieldError(res) {
    // Reply with badge
    var svg = makeBadge({
        label: "🔥RepoRank",
        message: "Error",
        color: "inactive"
    });
    // Send headers
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}