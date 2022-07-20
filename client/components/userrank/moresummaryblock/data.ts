import { ClockIcon, CommentDiscussionIcon, CommitIcon, GitPullRequestIcon, HeartIcon, IssueOpenedIcon, PeopleIcon, RepoIcon, StarIcon } from '@primer/octicons-react';

export function Data(userData) {
  let data = [];
  userData.categories.forEach((category, index) => {
    data.push({
      icon: getIcon(index),
      category: category.name,
      score: category.score,
      max: category.max,
      description: getDescription(index, category.value)
    })
  });
  return data;
}

function getDescription(index, value) {
  switch (index) {
    case 1: return `${value} commits`;
    case 2: return `${value} followers`;
    case 3: return `${value} PRs`;
    case 4: return `${value} issues`;
    case 5: return `${value} repos`;
    case 6: return `${value} years`;
    case 7: return `${value} accounts`;
    case 8: return `${value} comments`;
    default: return `${value} stars`;
  }
}

function getIcon(index) {
  switch (index) {
    case 1: return CommitIcon;
    case 2: return PeopleIcon;
    case 3: return GitPullRequestIcon;
    case 4: return IssueOpenedIcon;
    case 5: return RepoIcon;
    case 6: return ClockIcon;
    case 7: return HeartIcon;
    case 8: return CommentDiscussionIcon;
    default: return StarIcon;
  }
}

// export const Data = (userData) => [
//   {
//     icon: StarIcon,
//     category: 'Stars earned',
//     score: userData.body.score.repoStarsScore,
//     max: 100,
//     description:
//       `${userData.body.repoStars} stars`,
//   },
//   {
//     icon: CommitIcon,
//     category: 'Recent commits',
//     score: userData.body.score.commitsYearScore,
//     max: 100,
//     description:
//       `${userData.body.commitsYear} commits`,
//   },
//   {
//     icon: PeopleIcon,
//     category: 'Followers',
//     score: userData.body.score.followerScore,
//     max: 100,
//     description: `${userData.body.followers} followers`,
//   },
//   {
//     icon: GitPullRequestIcon,
//     category: 'Pull Requests',
//     score: userData.body.score.prs,
//     max: 100,
//     description: `${userData.body.prs} PRs`,
//   },
//   {
//     icon: IssueOpenedIcon,
//     category: 'Issues',
//     score: userData.body.score.issues,
//     max: 100,
//     description: `${userData.body.issues} issues`,
//   },
//   {
//     icon: RepoIcon,
//     category: 'Repositories',
//     score: userData.body.score.repos,
//     max: 50,
//     description: `${userData.body.repos} repos`,
//   },
//   {
//     icon: ClockIcon,
//     category: 'Years active',
//     score: userData.body.score.accountAge,
//     max: 25,
//     description: `${userData.body.accountAge} years`,
//   },
//   {
//     icon: HeartIcon,
//     category: 'Others sponsoring',
//     score: userData.body.score.sponsoring,
//     max: 25,
//     description: `${userData.body.sponsors} accounts`,
//   },
//   {
//     icon: CommentDiscussionIcon,
//     category: 'Discussion comments',
//     score: userData.body.score.discussionComments,
//     max: 25,
//     description: `${userData.body.discussionComments} comments`,
//   }
// ];