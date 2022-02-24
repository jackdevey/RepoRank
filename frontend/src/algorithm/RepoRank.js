import StatusGenerator from "./StatusGenerator";

const { Octokit } = require("@octokit/core");

async function RepoRank(own, rep) {

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // Calculate base score
    let response = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: own,
        repo: rep
    });

    let stars = response.data.stargazers_count;
    let forks = response.data.forks;
    let issues = response.data.open_issues;

    let b = (stars * 10) + (forks * 11) + (issues * -12);

    // Calculate code change
    response = await octokit.request("GET /repos/{owner}/{repo}/stats/code_frequency", {
        owner: own,
        repo: rep
    });

    let c = 0;

    response.data.forEach(week => {
        c += week[1] + week[2];
    })

    // Get community percentage
    response = await octokit.request('GET /repos/{owner}/{repo}/community/profile', {
        owner: own,
        repo: rep
      })

    let cperc = Math.log10(response.data.health_percentage);

    // Calculate final score
    let calc = (b * c * cperc) / 1000;

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
            community: response.data.health_percentage
        }
    };
}

export default RepoRank;
