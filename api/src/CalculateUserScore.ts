import { graphql } from '@octokit/graphql';

export async function CalculateUserScore(username: string): Promise<any> {

  let response = null;

  console.log(username === "username");

    if(username === "username") {

      response = {
        user: {
          username: "Fred",
          avatarUrl: "https://pbs.twimg.com/profile_images/1095686073219510274/SqbeDIxv_400x400.jpg",
          bio: "Being cool",
          createdAt: "2004-07-26T00:00:00.000Z",
          isBountyHunter: true,
          isCampusExpert: true,
          isGitHubStar: true,
          followers: {
            totalCount: 100000000000000
          },
          issues: {
            totalCount: 100000000000000
          },
          pullRequests: {
            totalCount: 100000000000000
          },
          repositoriesContributedTo: {
            totalCount: 100000000000000
          },
          sponsoring: {
            totalCount: 100000000000000
          },
          contributionsCollection: {
            totalCommitContributions: 100000000000000
          },
          repositoryDiscussionComments: {
            totalCount: 100000000000000
          },
          repositories: {
            edges: [
              {
                node: {
                  name: "repo1",
                  stargazerCount: 10000,
                  forkCount: 1,
                  description: "description",
                  primaryLanguage: {
                    color: "#0067f4",
                    name: "TypeScript"
                  },
                  watchers: {
                    totalCount: 1
                  }
                }
              },
              {
                node: {
                  name: "repo2",
                  stargazerCount: 20000,
                  forkCount: 2,
                  description: "description",
                  primaryLanguage: {
                    color: "#0067f4",
                    name: "TypeScript"
                  },
                  watchers: {
                    totalCount: 2
                  }
                }
              },
              {
                node: {
                  name: "repo3",
                  stargazerCount: 30000,
                  forkCount: 3,
                  description: "description",
                  primaryLanguage: {
                    color: "#0067f4",
                    name: "TypeScript"
                  },
                  watchers: {
                    totalCount: 3
                  }
                }
              }
            ]
          }
        }
      }




    } else {
      // Calculate base score
      response = await graphql(`{
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
    }
  
    let age = (new Date().getFullYear() - new Date(response.user.createdAt).getFullYear());
    let repoStars = response.user.repositories.edges.map(e => e.node.stargazerCount).reduce((a, b) => a + b, 0);
    let totalScore = yearCommitScore() + accountAgeScore() + awardsScore() + followersScore() + issuesScore() + pullRequestsScore() + reposScore() + sponsoringScore() + discussionCommentsScore() + repoStarsScore();
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
        issues: response.user.issues.totalCount,
        discussionComments: response.user.repositoryDiscussionComments.totalCount,
        awards: {
          ghStar: response.user.isGitHubStar,
          bugBounty: response.user.isBountyHunter,
          campusExpert: response.user.isCampusExpert,
        },
        repoStars,
        followers: response.user.followers.totalCount,
        commitsYear: response.user.contributionsCollection.totalCommitContributions,
        totalScore,
        ghLink: `https://github.com/${username}`,
        score: {
            accountAge: accountAgeScore(),
            awardsScore: awardsScore(),
            followerScore: followersScore(),
            issues: issuesScore(),
            prs: pullRequestsScore(),
            repos: reposScore(),
            sponsoring: sponsoringScore(),
            discussionComments: discussionCommentsScore(),
            repoStarsScore: repoStarsScore(),
            commitsYearScore: yearCommitScore()
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

    function repoStarsScore() {
      let x = response.user.repositories.edges.map(e => e.node.stargazerCount).reduce((a, b) => a + b, 0);
      // Translated hyperbolic tan function, stretch of 
      // 100 in y direction and 1000 in x direction
      let y = 100 * Math.tanh(x/1000);
      return Math.round(y);
    }

    function issuesScore() {
      let x = response.user.issues.totalCount;
      // Not too sure how to model this with a curve,
      // so for now im just gonna assume its linear,
      // and worry about it later ig
      let y = x;
      if (y >= 100) return 100;
      return Math.round(y);
    }

    function discussionCommentsScore() {
      let x = response.user.repositoryDiscussionComments.totalCount;
      // Not too sure how to model this with a curve,
      // so for now im just gonna assume its linear,
      // and worry about it later ig
      let y = x;
      if (y >= 100) return 100;
      return Math.round(y);
    }

    function pullRequestsScore() {
      let x = response.user.pullRequests.totalCount;
      // Translated sigmoid function, stretch of 100
      // in y direction and 50 in x direction with an
      // adjustment of 4 in x direction
      let y = 100 / (1 + Math.exp(-((x/50)-4)));
      return Math.round(y);
    }

    function followersScore() {
      let x = response.user.followers.totalCount;
      // Translated hyperbolic tan function, stretch of 
      // 100 in y direction and 1000 in x direction
      let y = 100 * Math.tanh(x/1000);
      return Math.round(y);
    }

    function awardsScore() {
      // 100 points for ghStar, and favour it
      // anything else worth 50 points
      if(response.user.isGitHubStar) return 100;
      if(response.user.isBountyHunter) return 50;
      if(response.user.isCampusExpert) return 50;
      return 0;
    }

    function accountAgeScore() {
      let now = new Date().getFullYear();
      let then = new Date(response.user.createdAt).getFullYear();
      // Calculate the age of the account, with
      // each year worth 3 points, capped at
      // 25 points
      let age = now - then;
      let points = age * 3;
      // If points exceed 25, cap the score at 25
      if (points >= 25) return 25;
      return points;
    }

    function sponsoringScore() {
      // Each sponsoring worth 5 points, capped
      // at a max of 25 points
      let points = response.user.sponsoring.totalCount * 5;
      // If points exceed 25, cap the score at 25
      if (points >= 25) return 25;
      return points;
    }

    function reposScore() {
      // Each repo is worth 1 point, capped
      // at a max of 50 points
      let points = response.user.repositoriesContributedTo.totalCount;
      // If points exceed 50, cap the score at 50
      if (points >= 50) return 50;
      return points;
    }
};



export interface BaseScore {
    stars: number,
    forks: number,
    issues: number,
    total: number
};
