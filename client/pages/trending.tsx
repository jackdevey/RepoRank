import React from "react";
import {
  Container,
  Title,
  ActionIcon,
  Card,
  Text,
  Group,
  Divider,
  LoadingOverlay,
  Grid,
  Box,
  Tooltip,
  Avatar,
  Badge, 
  Button
} from "@mantine/core";
import { createStyles, useMantineTheme } from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";
import useSWR from "swr";
import Head from "next/head";
import { Footer } from '../components/footer';
import { Header } from '../components/header/Header';
import { endpoint } from "../misc/endpoint";
import Link from "next/link";

const fetcher = (resource, init) => fetch(resource, init).then(res => res.json());

export default function TrendingPage() {

  // Fetch data from api (/trending)
  const { data } = useSWR(`${endpoint()}/trending`, fetcher);
  // If loading, show loading overlay
  if (!data) return <LoadingOverlay visible={true}/>;

  // When data is loaded extract repo list
  const repos = data.body;

  // Get theme from mantine
  const theme = useMantineTheme();
  
  return (
    <>
      <Head><title>Error 404 | RepoRank</title></Head>
      <Header title={"RepoRank"}/>
      <Container mt={15} mb={15}>
        <Title order={2}>Trending</Title>
        <Grid mt={15}>
          {repos.map((repo) => 
            <Grid.Col span={4}>
              <RepoCard
                name={repo.reponame}
                owner={repo.author}
                description={repo.repodesc}
                language={repo.language}
                badges={repo.badges}
                contributors={repo.builtby}
                analysis={repo.analysis}
                url={repo.repourl}/>
            </Grid.Col>
          )}
        </Grid>
      </Container>
      <Footer/>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  section: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export interface Repository {
  name: string;
  owner: string;
  language: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
  contributors: {
    username: string;
    url: string;
    avatar: string;
  }[]
  analysis: any;
  url: string;
}

export function RepoCard({ name, owner, language, description, badges, contributors, analysis, url }: Repository) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card} style={{height: "100%"}}>
      

      <Card.Section className={classes.section}>
        <Group position="apart" mt="md">
          <Text size="lg" weight={500} lineClamp={1}>
            {name}
          </Text>
          <Badge size="sm">{language}</Badge>
        </Group>
        <Text size="sm" mt="xs" lineClamp={2}>
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
      <Divider/>
        <Text mt="md" className={classes.label} color="dimmed">
          RepoRank Analysis
        </Text>
        <Box mt={5}>
          <Title order={3}>✨ {analysis.score}pts</Title>
          <Text>🏅 Level {analysis.level}</Text>
        </Box>
      </Card.Section>

      <Card.Section className={classes.section}>
      <Divider/>
        <Text mt="md" className={classes.label} color="dimmed">
          Contributors
        </Text>
        <Group spacing={7} mt={5}>
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing="sm">
              {contributors.map((contributor, index) => 
                <Tooltip label={contributor.username} withArrow>
                  <Avatar src={contributor.avatar} radius="xl" />
                </Tooltip>
              )}
            </Avatar.Group>
          </Tooltip.Group>
        </Group>
      </Card.Section>
      <div style={{marginTop: "auto"}}>
        <Divider/>
        <Group mt="md">
          <Link href={"https://reporank.dev"}>
            <Button radius="md" style={{ flex: 1 }}>
              View report
            </Button>
          </Link>
          <Link href={url}>
            <ActionIcon variant="default" radius="md" size={36}>
              <ExternalLink size={18} />
            </ActionIcon>
          </Link>
        </Group>
      </div>
    </Card>
  );
}