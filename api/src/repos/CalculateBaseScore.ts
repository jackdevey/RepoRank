import { Octokit } from '@octokit/core';

export async function CalculateBaseScore(octokit: Octokit, own: string, rep: string): Promise<BaseScore> {
    // Calculate base score
    let response = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: own,
        repo: rep
    });

    // Calculate levels of stars & forks etc
    let stars = response.data.stargazers_count as number;
    let forks = response.data.forks as number;
    let issues = response.data.open_issues as number;

    // Return the base scores
    return { 
        stars: stars, 
        forks: forks, 
        issues: issues, 
        total: (stars * 10) + (forks * 11) + (issues * 5) 
    };
};

export interface BaseScore {
    stars: number,
    forks: number,
    issues: number,
    total: number
};
