import { Octokit } from "@octokit/core";

export async function CalculateCommunityPercentage(octokit: Octokit, own: string, rep: string): Promise<CommunityPercentage> {
    // Get community percentage
    let response = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
        owner: own,
        repo: rep
    });

    // Return the data
    return { 
        percentage: response.data.health_percentage, 
        log10: Math.log10(response.data.health_percentage) 
    };
};

export interface CommunityPercentage {
    percentage: number,
    log10: number
}