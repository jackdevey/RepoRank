import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { createStyles, Header, Group, ActionIcon, Container, Title, LoadingOverlay, Button, Anchor } from '@mantine/core';
import { ShareIcon } from '@primer/octicons-react';
import { ScoreBlock } from '../../components/userrank/scoreblock';
import { RatingBlock } from '../../components/userrank/ratingblock';
import { SummaryBlock } from '../../components/userrank/summaryblock';
import { MoreSummaryBlock } from '../../components/userrank/moresummaryblock';
import { Footer } from '../../components/footer';
import { endpoint } from '../../misc/endpoint';
import Error404 from '../404';

// Not too sure how this works tbh, but is swr
const fetcher = (resource, init) => fetch(resource, init).then(res => res.json());

export default function UserPage() {
    // Get username from router
    const router = useRouter();
    const { username } = router.query;

    // Loading state
    const { data } = useSWR(`${endpoint()}/${username}`, fetcher);

    // Get custom classes
    const { classes } = useStyles();

    // If loading, show loading overlay
    if (!data) return loading();

    // I can't work out how to check for error, but this works too
    if (data.body.username === undefined) return <Error404></Error404>;
    
    return (
      <>
        <Head><title>@{data.body.username} | UserRank</title></Head>
        <HeaderBar classes={classes} username={data.body.username}/>
        <RatingBlock level={data.body.level} commits={data.body.commitsYear} stars={data.body.repoStars} followers={data.body.followers}/>
        <ScoreBlock level={data.body.level} points={data.body.totalScore}/>
        <MoreSummaryBlock userData={data} />
        <SummaryBlock userData={data}/>
        <Footer />
      </>
    );
}

function loading() {
  return (
    <>
      <Head><title>Loading | UserRank</title></Head>
      <LoadingOverlay visible={true} />
    </>
  )
}


// UserRank individual headerbar
function HeaderBar({ classes, username }) {
    return (
        <Header height={56}>
        <Container className={classes.inner}>
  
          <Group>
            <Title order={3}>🔥UserRank</Title>
          </Group>
  
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <Anchor href={"https://github.com/"+username} target="_blank">
              <Button variant="subtle" mr={5}>@{username}</Button>
            </Anchor>
            <ActionIcon size="lg">
              <ShareIcon size={18} />
            </ActionIcon>
          </Group>
          
        </Container>
      </Header>
    );
}

/**
 * Boring CSS stuff
 */

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

    innerHeaderBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
      },
  
    social: {
      width: 260,
  
      [theme.fn.smallerThan('sm')]: {
        width: 'auto',
        marginLeft: 'auto',
      },
    },


}));