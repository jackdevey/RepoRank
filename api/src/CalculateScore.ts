import { Octokit } from "@octokit/core";
import StatusGenerator from "./StatusGenerator";

// CalculateScore calculates the score of a repo
async function CalculateScore(own: string, rep: string) {

    // Calculate base score
    let r1 = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: own,
        repo: rep
    });

    // Calculate levels of stars & forks etc
    let stars = r1.data.stargazers_count;
    let forks = r1.data.forks;
    let issues = r1.data.open_issues;

    // Multiply them together
    let b = (stars * 10) + (forks * 11) + (issues * -12);

    // Calculate code change
    let r2 = await octokit.request("GET /repos/{owner}/{repo}/stats/code_frequency", {
        owner: own,
        repo: rep
    });

    // Calculate the code change of the last few weeks
    let c = 0;
    (r2.data as Array<Array<number>>).forEach(week => c += week[1] + week[2]);

    // Get community percentage
    let r3 = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
        owner: own,
        repo: rep
    });

    // Calculate the community percentage
    let cperc = Math.log10(r3.data.health_percentage);

    // Calculate final score
    let calc = (b * c * cperc) / 1000;

    // Calculate the repo level based on
    // the digits
    let level = Math.max(Math.floor(Math.log10(Math.abs(calc))), 0) + 1;

    return {
        score: Math.round(calc),
        level: level,
        status: StatusGenerator(level),
        breakdown: {
            stars: stars,
            forks: forks,
            openIssues: issues,
            codeChange: c,
            community: r3.data.health_percentage
        }
    };
}

// Create new octokit instance
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Export function
export default CalculateScore;