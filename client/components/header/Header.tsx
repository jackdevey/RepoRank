import React, { useState } from 'react';
import { createStyles, Header as MTHeader, Group, ActionIcon, Container, Burger, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },
  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  }
}));

export function Header({ title = "RepoRank", page = "null" }) {
  const { classes, cx } = useStyles();
  const [_title, setTitle] = useState(title);

  return (
    <MTHeader height={56}>
      <Container className={classes.inner}>

        <a href="/" style={{textDecoration: 'none', color: 'inherit'}}>
        <Title order={3} onMouseEnter={() => setTitle("RepoRank")} onMouseLeave={() => setTitle(title)}>🔥{_title}</Title>
        </a>

        <Group spacing={0} className={classes.social} position="right" noWrap>

          <a
            key={"trending"}
            href={"/trending"}
            className={cx(classes.link, { [classes.linkActive]: page === "trending" })}
          >
            {"Trending"}
          </a>

          <a
            key={"shields"}
            href={"/shields"}
            className={cx(classes.link, { [classes.linkActive]: page === "shields" })}
          >
            {"Shields"}
          </a>
 
        </Group>
        
      </Container>
    </MTHeader>
  );
}