export type { RepositoryGrading, Metric };

type RepositoryGrading = {
    overview: {
        score: number,
        level: number,
        grading: Grading
    },
    metrics: {
        stars: Metric,
        forks: Metric,
        watchers: Metric
    }
}

type Metric = {
    count: number,
    grading: Grading
}

export enum Grading {
    None = 0,
    Poor = 1,
    Partial = 2,
    Good = 3,
    Full = 4,
}