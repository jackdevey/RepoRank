export function Repo404Error(): ErrorResponse {
    return {
        errorCode: 1001,
        reason: "GitHub repo not found",
        documentation: "https://github.com/jackdevey/RepoRank/wiki/RepoRank-API#get--ownerrepo"
    }
}

export function User404Error(): ErrorResponse {
    return {
        errorCode: 2001,
        reason: "GitHub user not found with that username",
        documentation: "https://github.com/jackdevey/RepoRank/wiki/RepoRank-API"
    }
}


interface ErrorResponse {
    errorCode: number,
    reason: string,
    documentation: string
}