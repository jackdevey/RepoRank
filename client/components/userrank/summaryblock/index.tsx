import React from 'react';
import { createStyles, Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Col, Container } from '@mantine/core';
import { ClockIcon, CommentDiscussionIcon, CommitIcon, GitPullRequestIcon, HeartIcon, IssueOpenedIcon, PeopleIcon, RepoIcon, StarIcon } from '@primer/octicons-react';
import { ReceiptOff, Flame, CircleDotted, FileCode } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 120,
        paddingBottom: 80,
    
        '@media (max-width: 755px)': {
          paddingTop: 80,
          paddingBottom: 60,
        },
        
        zIndex: 1,
      },
      

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

function findBestCategories(categories) {
  categories.sort((a,b)=> ((a.score) < (b.score) ? 1 : -1));
  return categories.slice(0, 4);
}

function getIcon(name) {
  switch (name) {
    case "Recent commits": return <CommitIcon size={26} />;
    case "Followers": return <PeopleIcon size={26} />;
    case "Pull Requests": return <GitPullRequestIcon size={26} />;
    case "Participated issues": return <IssueOpenedIcon size={26} />;
    case "Repositories": return <RepoIcon size={26} />;
    case "Years active": return <ClockIcon size={26} />;
    case "Others sponsoring": return <HeartIcon size={26} />;
    case "Discussion comments": return <CommentDiscussionIcon size={26} />;
    default: return <StarIcon size={26} />;
  }
}

function getDescription(name) {
  switch (name) {
    case "Recent commits": return "You've clearly been busy lately";
    case "Followers": return "You're really popular, aren't you?";
    case "Pull Requests": return "You're making loads of new features";
    case "Participated issues": return "You're working on a lot of issues";
    case "Repositories": return "You've got lots going on!";
    case "Years active": return "You're a long time GitHub user";
    case "Others sponsoring": return "You're very charitable";
    case "Discussion comments": return "You're good at making conversation";
    default: return "Stars good";
  }
}

export function SummaryBlock({ userData }) {
  const { classes } = useStyles();

  let topCategories = findBestCategories(userData.categories);

  const items = topCategories.map((category) => (
    <div key={category.name}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'teal', to: 'green' }}
      >
        {getIcon(category.name)}
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {category.name}
      </Text>
      <Text color="dimmed" size="sm">
        {getDescription(category.name)}
      </Text>
    </div>
  ));

  return (
    <Container className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            What you're doing great
          </Title>
          <Text color="dimmed">
            You're up to some pretty great stuff, but here is what your best at, based off your top categories
          </Text>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </Container>
  );
}