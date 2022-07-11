import { useRouter } from 'next/router';
import { useMantineTheme, createStyles, Header, Group, ActionIcon, Container, Dots, Title, Button, Text, List, ThemeIcon } from '@mantine/core';
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
            <HeaderBar classes={classes}/>
            <RatingBlock />
            <ScoreBlock />
            <SummaryBlock />
            <MoreSummaryBlock title={"Woahj"} description={"d"} />
            <Footer data={data}/>
        </>
    );
}

// UserRank individual headerbar

function HeaderBar({ classes }) {
    return (
        <Header height={56}>
        <Container className={classes.inner}>
  
          <Title order={3}>🔥UserRank</Title>
  
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon size="lg">
              <ShareIcon size={18} />
            </ActionIcon>
          </Group>
          
        </Container>
      </Header>
    );
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
        { "label": "Join Discord", "link": "#" },
        { "label": "Follow on Twitter", "link": "#" },
        { "label": "Email newsletter", "link": "#" },
        { "label": "GitHub discussions", "link": "#" }
      ]
    }
  ]

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