import { useRouter } from 'next/router';
import { useMantineTheme, createStyles, Header, Group, ActionIcon, Container, Title, Anchor, Text, List, ThemeIcon, Button } from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { ShareIcon } from '@primer/octicons-react';
import { ScoreBlock } from '../../components/userrank/scoreblock';
import { RatingBlock } from '../../components/userrank/ratingblock';
import { SummaryBlock } from '../../components/userrank/summaryblock';
import { MoreSummaryBlock } from '../../components/userrank/moresummaryblock';
import { Footer } from '../../components/userrank/footer';

export default function UserPage() {

    // Get username from user query
    const router = useRouter();
    const { username } = router.query;

    // Get custom classes
    const { classes } = useStyles();

    return (
        <>
            <HeaderBar classes={classes} username={username}/>
            <RatingBlock level={5}/>
            <ScoreBlock level={5}/>
            <SummaryBlock />
            <MoreSummaryBlock title={"Woahj"} description={"d"} />
            <Footer />
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