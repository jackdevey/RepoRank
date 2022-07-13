import React from 'react';
import { createStyles, Title, Badge, Button, Container, useMantineTheme, Text, Group } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Dots } from './Dots';
import CountUp from 'react-countup';
import getRating from '../ratingblock/RatingAssigner';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontSize: 40,
    letterSpacing: -1,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  points: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 100,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 50,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',
    marginTop: 30,
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export function ScoreBlock({ level, points }) {
  const { classes } = useStyles();
  const rating = getRating(level);
  const theme = useMantineTheme();

  return (
    <>
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title} color="dimmed">
            We've crunched the numbers <br/>and you have
          </Title>

          <Container p={0} size={600}>
            <Title order={1} className={classes.points}>✨<CountUp end={points}/> pts</Title>
            <div className={classes.description}>
              <Badge color="gray" size="xl">🏅 Level {level}</Badge>{' '}
              <Badge style={{background: theme.fn.rgba(rating.color, 0.55), color: 'white'}} size="xl">{rating.title}</Badge>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
}