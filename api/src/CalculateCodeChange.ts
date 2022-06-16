import { Octokit } from '@octokit/core';

export async function CalculateCodeChange(octokit: Octokit, own: string, rep: string): Promise<number> {
    // Calculate code change
    let response = await octokit.request("GET /repos/{owner}/{repo}/stats/code_frequency", {
        owner: own,
        repo: rep
    });

    // Calculate the code change of the last few weeks
    let c = 0;
    (response.data as Array<Array<number>>).forEach(week => c += week[1] + week[2]);
    return c;
};