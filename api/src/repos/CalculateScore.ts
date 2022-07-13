import { Octokit } from "@octokit/core";
import { StatusGenerator, Status } from "../users/StatusGenerator";
import parallel from 'async/parallel';
import { CalculateBaseScore, BaseScore } from "./CalculateBaseScore";
import { CalculateCodeChange } from "./CalculateCodeChange";
import { CalculateCommunityPercentage, CommunityPercentage } from "./CalculateCommunityPercentage";

// CalculateScore calculates the score of a repo
export async function CalculateScore(own: string, rep: string, callback: (err: any|null, response: Score|null) => void) {
  
    // Create new octokit instance
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    await parallel([
        // Get the base score
        async function(): Promise<BaseScore> { return CalculateBaseScore(octokit, own, rep) },
        // Get the code change score
        async function (): Promise<number> { return CalculateCodeChange(octokit, own, rep) },
        // Get the community percentage
        async function (): Promise<CommunityPercentage> { return CalculateCommunityPercentage(octokit, own, rep) }
    ]).then(results => {

        let base = results[0] as BaseScore;
            let code = results[1] as number;
            let community = results[2] as CommunityPercentage;

            // Calculate the final score
            let score = (base.total * code * community.log10) / 1000;

            // Calculate the repo level based on the digits
            let level = Math.max(Math.floor(Math.log10(Math.abs(score))), 0) + 1;

            callback(null, {
                score: Math.round(score),
                level: level,
                status: StatusGenerator(level),
                breakdown: {
                    stars: base.stars,
                    forks: base.forks,
                    openIssues: base.issues,
                    codeChange: code,
                    community: community.percentage
                }
            });

    }).catch(error => {
        callback(error, null);
    });
};

export interface Score {
    score: number,
    level: number,
    status: Status,
    breakdown: {
        stars: number,
        forks: number,
        openIssues: number,
        codeChange: number,
        community: number
    }
}