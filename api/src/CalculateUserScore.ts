import { graphql } from '@octokit/graphql';

export async function CalculateUserScore(username: string): Promise<any> {
    // Calculate base score
    let response: any = await graphql(`{
        user(login: "${username}") {
          username: login
          avatarUrl
          bio
          # Each year since is worth 5 points
          createdAt
          # Worth 500 points
          isBountyHunter
          # Worth 500 points
          isCampusExpert
          # Worth 1000 points
          isGitHubStar
          # Each worth 6 points
          followers {
            totalCount
          }
          # Each worth 1 points
          issues {
            totalCount
          }
          # Each worth 3 points
          pullRequests {
            totalCount
          }
          # Each worth 2 points
          repositoriesContributedTo {
            totalCount
          }
          # Each worth 1 point
          sponsoring {
            totalCount
          }
          # Each worth 1 point
          repositoryDiscussionComments {
            totalCount
          }
          # Will be shown to the user
          # Each repo stars are worth 2 points
          repositories(first:3, orderBy: {field: STARGAZERS, direction: DESC}) {
            edges {
              node {
                name
                stargazerCount
                forkCount
                   
                primaryLanguage {
                  color
                  name
                }
                watchers {
                  totalCount
                }
              }
            }
          }
        }
      }`,{ headers: { authorization: `token ${process.env.GITHUB_TOKEN}` }});

    let ageScore = (new Date().getFullYear() - new Date(response.user.createdAt).getFullYear()) * 5;
    let bountyScore = response.user.isBountyHunter ? 500 : 0;
    let campusScore = response.user.isCampusExpert ? 500 : 0;
    let starScore = response.user.isGitHubStar ? 1000 : 0;
    let followerScore = response.user.followers.totalCount * 6;
    let issueScore = response.user.issues.totalCount * 1;
    let prScore = response.user.pullRequests.totalCount * 3;
    let repoScore = response.user.repositoriesContributedTo.totalCount * 2;
    let sponsorScore = response.user.sponsoring.totalCount * 1;
    let commentScore = response.user.repositoryDiscussionComments.totalCount * 1;
    let repoStarsScore = response.user.repositories.edges.map(e => e.node.stargazerCount).reduce((a, b) => a + (b * 2), 0);
    let totalScore = ageScore + bountyScore + campusScore + starScore + followerScore + issueScore + prScore + repoScore + sponsorScore + commentScore + repoStarsScore;

    return {
        username: response.user.username,
        avatarUrl: response.user.avatarUrl,
        bio: response.user.bio,
        createdAt: response.user.createdAt,
        isBountyHunter: response.user.isBountyHunter,
        isCampusExpert: response.user.isCampusExpert,
        isGitHubStar: response.user.isGitHubStar,
        followers: response.user.followers.totalCount,
        score: {
            ageScore,
            awardsScore: bountyScore + campusScore + starScore,
            followerScore,
            issueScore,
            prScore,
            repoScore,
            sponsorScore,
            commentScore,
            repoStarsScore,
            totalScore
        },
        topRepos: [
            response.user.repositories.edges[0].node,
            response.user.repositories.edges[1].node,
            response.user.repositories.edges[2].node
        ]
    }
};

export interface BaseScore {
    stars: number,
    forks: number,
    issues: number,
    total: number
};
