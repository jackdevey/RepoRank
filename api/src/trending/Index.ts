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
    // Get results from ghTrends
    const results = await ghTrends({
        spoken_language_code: 'en'
    });

    // Remove 1 repo from the list, so is 9
    results.pop();

    for (let i = 0; i < results.length; i++) {
        // Get repo badges [OLD]
        //results[i].badges = getBadges(results[i]);
        // Analyse each repo
        results[i].analysis = await CalculateScore(results[i].author, results[i].reponame);
    }

    return results;
}