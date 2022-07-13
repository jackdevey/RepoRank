import React from 'react';
import { Title, createStyles, Text, Container, ActionIcon, Group, Anchor } from '@mantine/core';
import { BrandTwitter, BrandYoutube, BrandInstagram, BrandGithub } from 'tabler-icons-react';
import { LogoGithubIcon, MarkGithubIcon } from '@primer/octicons-react';

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

interface FooterLinks {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

const data = [
  {
    "title": "About",
    "links": [
      { "label": "Features", "link": "#" },
      { "label": "Pricing", "link": "#" },
      { "label": "Support", "link": "#" },
      { "label": "Forums", "link": "#" }
    ]
  },
  {
    "title": "Project",
    "links": [
      { "label": "Contribute", "link": "#" },
      { "label": "Media assets", "link": "#" },
      { "label": "Changelog", "link": "#" },
      { "label": "Releases", "link": "#" }
    ]
  },
  {
    "title": "Community",
    "links": [
      { "label": "GitHub discussions", "link": "https://github.com/jackdevey/reporank/discussions" }
    ]
  }
]

export function Footer() {
  const { classes } = useStyles();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Anchor
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Anchor>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
            <Title order={3}>🔥RepoRank</Title>
          <Text size="xs" color="dimmed" className={classes.description}>
            Calculating scores for the performance of GitHub repositories
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>

        <Text color="dimmed" size="sm">Created by <Anchor size="sm" href="https://github.com/jackdevey">jack devey</Anchor></Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <Anchor href="https://github.com/jackdevey/reporank">
            <ActionIcon size="lg">
              <BrandGithub size={18} />
            </ActionIcon>
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
}