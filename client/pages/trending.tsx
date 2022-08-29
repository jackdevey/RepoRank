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
  Button,
  Center
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
      <Head><title>Trending | RepoRank</title></Head>
      <Header title={"RepoRank"} page={"trending"}/>
      <Container mt={15} mb={15}>
        <Group spacing={15}>
        <Title order={1}>📈</Title>
          <div>
            <Title order={2}>Trending</Title>
            <Text>See what the GitHub community is most excited about today</Text>
          </div>
        </Group>
        <Grid mt={10}>
          {repos.map((repo) => 
            <Grid.Col sm={12} md={6} lg={4}>
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
        <Center style={{width: "100%"}}>
          <Link href="https://github.com/trending">
            <Button variant="subtle" color="dark" size="md" mt={20} mb={5} compact>
              See more on GitHub
            </Button>
          </Link>
        </Center>
        
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
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
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
          {language && <Badge size="sm">{language}</Badge>}
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
          <Title order={3}>✨ {numberWithCommas(analysis.score)} pts</Title>
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
              {contributors.map((contributor) => 
                <Link href={contributor.url}>
                  <Tooltip label={contributor.username} withArrow>
                    <Avatar src={contributor.avatar} radius="xl" />
                  </Tooltip>
                </Link>
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}