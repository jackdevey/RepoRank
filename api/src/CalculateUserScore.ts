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
          contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
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
                description
                   
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


    if(response.errors) { 
       return Error("Unknown user")
    }
  
    let age = (new Date().getFullYear() - new Date(response.user.createdAt).getFullYear());
    let ageScore = age * 5;
    let bountyScore = response.user.isBountyHunter ? 500 : 0;
    let campusScore = response.user.isCampusExpert ? 500 : 0;
    let starScore = response.user.isGitHubStar ? 1000 : 0;
    let followerScore = response.user.followers.totalCount * 6;
    let issueScore = response.user.issues.totalCount * 1;
    let prScore = response.user.pullRequests.totalCount * 3;
    let repoScore = response.user.repositoriesContributedTo.totalCount * 2;
    let sponsorScore = response.user.sponsoring.totalCount * 1;
    let commentScore = response.user.repositoryDiscussionComments.totalCount * 1;
    let repoStars = response.user.repositories.edges.map(e => e.node.stargazerCount).reduce((a, b) => a + b, 0);
    let repoStarsScore = repoStars * 2;
    let commitScore = yearCommitScore();
    let totalScore = yearCommitScore() + ageScore + bountyScore + campusScore + starScore + followerScore + issueScore + prScore + repoScore + sponsorScore + commentScore + repoStarsScore;
    let level = Math.round(totalScore / 100);
    return {
        username: response.user.username,
        avatarUrl: response.user.avatarUrl,
        bio: response.user.bio,
        accountAge: age,
        level,
        prs: response.user.pullRequests.totalCount,
        repos:  response.user.repositoriesContributedTo.totalCount,
        sponsors: response.user.sponsoring.totalCount,
        discussionComments: response.user.repositoryDiscussionComments.totalCount,
        isBountyHunter: response.user.isBountyHunter,
        isCampusExpert: response.user.isCampusExpert,
        isGitHubStar: response.user.isGitHubStar,
        repoStars,
        followers: response.user.followers.totalCount,
        commitsYear: response.user.contributionsCollection.totalCommitContributions,
        totalScore,
        ghLink: `https://github.com/${username}`,
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
            commitsYearScore: commitScore,
        },
        topRepos: [
            response.user.repositories.edges[0].node,
            response.user.repositories.edges[1].node,
            response.user.repositories.edges[2].node
        ]
    }

    function yearCommitScore() {
      let x = response.user.contributionsCollection.totalCommitContributions;
      // Translated arctan function, stretch of 
      // 100 in y direction and 1000 in x direction, 
      // capped at y=100 
      let y = 100 * Math.atan(x/1000);
      // If y exceeds 100, cap the score at 100
      if (y >= 100) return 100;
      return Math.round(y);
    }
};



export interface BaseScore {
    stars: number,
    forks: number,
    issues: number,
    total: number
};
