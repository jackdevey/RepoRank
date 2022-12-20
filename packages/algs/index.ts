import { graphql } from "@octokit/graphql";
import fetch from 'node-fetch';

export abstract class RRError extends Error {

    code: number

    constructor(code: number, message: string) {
        super(message)
        this.code = code
    }

}

export class Error404 extends RRError {
    constructor(message: string) {
        super(404, message)
    }
}

export class Error403 extends RRError {
    constructor(message: string) {
        super(403, message)
    }
}



export async function getRepo(owner: string, repo: string): Promise<Repo> {

    const coreApiCall = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const core = await coreApiCall.json();

    if (coreApiCall.status != 200) {
        // Refers to the GitHub REST API docs for types of possible status codes
        // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository--status-codes
        switch (coreApiCall.status) {
            // If 
            case 301: {
                throw new Error("Moved")
            }
            case 403: {
                throw new Error403(`Access forbidden for some reason`)
            }
            case 404: {
                throw new Error404(`Are you sure ${owner}/${repo} exists?`)
            }
        }
    }

    let type;
    if (core.archived) {
        type = "Archive"
    } else if (core.disabled) {
        type = "Disabled"
    } else if (core.is_template) {
        type = "Template"
    } else type = "Standard"

    return {
        about: {
            owner,
            repo: core.name,
            type,
            language: core.language 
        },
        metrics: [
            {
                title: "Overview",
                metrics: [
                    {
                        name: "Stars",
                        value: core.stargazers_count,
                        points: Math.floor(core.stargazers_count / 1000),
                        maxPoints: 1000,
                        system: "k"
                    },
                    {
                        name: "Forks",
                        value: core.forks,
                        points: Math.floor(core.stargazers_count / 100),
                        maxPoints: 1000,
                        system: "h"
                    },
                    {
                        name: "Watchers",
                        value: core.watchers_count,
                        points: Math.floor(core.stargazers_count / 10),
                        maxPoints: 1000,
                        system: "da"
                    }
                ]
            },
            {
                title: "Activity",
                metrics: [
                    {
                        name: "Commits this year",
                        value: 789,
                        points: 789,
                        maxPoints: 1000,
                        system: "-"
                    },
                    {
                        name: "Last commit",
                        value: "2 days ago",
                        points: 600,
                        maxPoints: 1000,
                        system: "dt"
                    },
                    {
                        name: "Open issues",
                        value: core.open_issues,
                        points: Math.floor(core.open_issues / 10),
                        maxPoints: 1000,
                        system: "da"
                    }
                ]
            },
            {
                title: "Community Standards",
                metrics: [
                    {
                        name: "Readme",
                        value: "Yes",
                        points: 150,
                        maxPoints: 150,
                        system: "-"
                    },
                    {
                        name: "Code of conduct",
                        value: "Yes",
                        points: 150,
                        maxPoints: 150,
                        system: "-"
                    },
                    {
                        name: "Contributing",
                        value: "Yes",
                        points: 150,
                        maxPoints: 150,
                        system: "-"
                    },
                    {
                        name: "Security Policy",
                        value: "No",
                        points: 0,
                        maxPoints: 150,
                        system: "-"
                    }
                ]
            }
        ]
    }
}

interface RepoMetric {
    name: string,
    value: number,
    points: number,
    maxPoints: number,
    system: string
}

interface RepoMetricGroup {
    title: string,
    metrics: RepoMetric[]
}

export interface Repo {
    about: {
        owner: string,
        repo: string,
        type: string,
        language: string
    },
    metrics: RepoMetricGroup[]
}