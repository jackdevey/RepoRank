import React from 'react';
import { createStyles, Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Col, Container } from '@mantine/core';
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

const features = [
  {
    icon: ReceiptOff,
    title: 'Free and open source',
    description: 'All packages are published under MIT license, you can use Mantine in any project',
  },
  {
    icon: FileCode,
    title: 'TypeScript based',
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: CircleDotted,
    title: 'No annoying focus ring',
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: Flame,
    title: 'Flexible',
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];

function findBestCategories(userData) {
  let percs = [
    userData.score.accountAge / 25, 
    userData.score.followersScore / 100,
    userData.score.issues / 100,
    userData.score.prs / 100,
    userData.score.repos / 50,
    userData.score.sponsoring / 25,
    userData.score.discussionComments / 25,
    userData.score.repoStarsScore / 100,
    userData.score.commitsYearScore / 100
  ];

  
}

export function SummaryBlock({ userData }) {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'teal', to: 'green' }}
      >
        <feature.icon size={26} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <Container className={classes.wrapper}>
      <Grid gutter={80}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            What you're doing well based on your top categories
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