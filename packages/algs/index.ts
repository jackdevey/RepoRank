import { graphql } from "@octokit/graphql";

export function repo(owner: string, repo: string) {
    return {
        about: {
            owner,
            repo,
            type: "Standard",
            language: {
                name: "Kotlin",
                colour: "orange"
            }
        },
        metrics: [
            {
                title: "Overview",
                metrics: [
                    {
                        name: "Stars",
                        value: 678000,
                        points: 678,
                        maxPoints: 1000,
                        system: "k"
                    },
                    {
                        name: "Forks",
                        value: 34600,
                        points: 346,
                        maxPoints: 1000,
                        system: "h"
                    },
                    {
                        name: "Watchers",
                        value: 2820,
                        points: 282,
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
                        value: 12,
                        points: 120,
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