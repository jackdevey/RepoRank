import { graphql } from "@octokit/graphql";
import fetch from 'node-fetch';

export async function getRepo(owner: string, repo: string): Promise<Repo> {

    const core = await (await fetch(`https://api.github.com/repos/${owner}/${repo}`)).json();

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

interface Repo {
    about: {
        owner: string,
        repo: string,
        type: string,
        language: string
    },
    metrics: RepoMetricGroup[]
}