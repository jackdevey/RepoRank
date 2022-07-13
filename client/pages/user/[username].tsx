import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMantineTheme, createStyles, Header, Group, ActionIcon, Container, Title, LoadingOverlay, Text, List, Button } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { ShareIcon } from '@primer/octicons-react';
import { ScoreBlock } from '../../components/userrank/scoreblock';
import { RatingBlock } from '../../components/userrank/ratingblock';
import { SummaryBlock } from '../../components/userrank/summaryblock';
import { MoreSummaryBlock } from '../../components/userrank/moresummaryblock';
import { Footer } from '../../components/footer';
import { endpoint } from '../../misc/endpoint';

export async function getServerSideProps(context) {
  // Get username from user query
  const { username } = context.params;
  // Fetch data from API
  const res = await fetch(`${endpoint()}/${username}`)
  const data = (await res.json()).body;
  // Pass data to the page via props
  return { props: { data } }
}

export default function UserPage({ data }) {
    // Loading state
    const [loading, setLoading] = useState(false);

    // Get custom classes
    const { classes } = useStyles();
      
    return (
        <>
            <LoadingOverlay visible={loading} />
            {
              !loading && (<>
                <HeaderBar classes={classes} username={data.username}/>
                <RatingBlock level={data.level}/>
                <ScoreBlock level={data.level} points={data.totalScore}/>
                <SummaryBlock />
                <MoreSummaryBlock title={"Woahj"} description={"d"} />
                <Footer />
              </>)
            }
        </>
    );
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
            <Button variant="subtle" mr={5}>@{username}</Button>
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