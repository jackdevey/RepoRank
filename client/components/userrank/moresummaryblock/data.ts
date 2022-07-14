import { ClockIcon, CommentDiscussionIcon, CommitIcon, GitPullRequestIcon, HeartIcon, IssueOpenedIcon, PeopleIcon, RepoIcon, StarIcon } from '@primer/octicons-react';

export const Data = (userData) => [
  {
    icon: StarIcon,
    category: 'Stars earned',
    score: userData.body.score.repoStarsScore,
    max: 100,
    description:
      `${userData.body.repoStars} stars`,
  },
  {
    icon: CommitIcon,
    category: 'Recent commits',
    score: userData.body.score.commitsYearScore,
    max: 100,
    description:
      `${userData.body.commitsYear} commits`,
  },
  {
    icon: PeopleIcon,
    category: 'Followers',
    score: userData.body.score.followerScore,
    max: 100,
    description: `${userData.body.followers} followers`,
  },
  {
    icon: GitPullRequestIcon,
    category: 'Pull Requests',
    score: userData.body.score.prs,
    max: 100,
    description: `${userData.body.prs} PRs`,
  },
  {
    icon: IssueOpenedIcon,
    category: 'Issues',
    score: userData.body.score.issues,
    max: 100,
    description: `${userData.body.issues} issues`,
  },
  {
    icon: RepoIcon,
    category: 'Repositories',
    score: userData.body.score.repos,
    max: 50,
    description: `${userData.body.repos} repos`,
  },
  {
    icon: ClockIcon,
    category: 'Years active',
    score: userData.body.score.accountAge,
    max: 25,
    description: `${userData.body.accountAge} years`,
  },
  {
    icon: HeartIcon,
    category: 'Others sponsoring',
    score: userData.body.score.sponsoring,
    max: 25,
    description: `${userData.body.sponsors} accounts`,
  },
  {
    icon: CommentDiscussionIcon,
    category: 'Discussion comments',
    score: userData.body.score.discussionComments,
    max: 25,
    description: `${userData.body.discussionComments} comments`,
  }
];