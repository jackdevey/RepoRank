/**
 * Trending Module
 * endp: /trending
 * user: jackdevey
 * date: 27/08/2022
 * uses: [github-trends-api]
 */

import ghTrends from 'github-trends-api';
import { CalculateScore } from '../repos/CalculateScore';

export default async function Trending() {
    const results = await ghTrends();

    for (let i = 0; i < results.length; i++) {
        // Get repo badges
        results[i].badges = getBadges(results[i]);
        // Analyse each repo
        results[i].analysis = await CalculateScore(results[i].author, results[i].reponame);
    }

    return results;
}

function getBadges(result) {
    let badges = [];
    // Starry night
    if(result.stars >= 10000) badges.push({
        emoji: "✨", 
        label: "Starry night",
        description: "This repo has earned over 10,000 stars!" 
    });
    // Tasty work
    if(result.forks >= 5000) badges.push({ 
        emoji: "🍴",
        label: "Tasty work",
        description: "This repo has been forked over 5,000 times!"
    });
    // Rapid growth
    if(result.lastStars >= 250) badges.push({
        emoji: "📈",
        label: "Rapid growth",
        description: "This repo has recently gained over 250 stars!"
    });
    return badges;
}
