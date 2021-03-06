import { createStyles, Grid, Paper, Text, Container, Badge, Title, Anchor } from "@mantine/core";

function RepoCard({ repo } ) {

    const getColor = (theme) => {
        let color = (repo.primaryLanguage && repo.primaryLanguage.color || theme.colors.blue[8])
        return theme.colorScheme === 'dark' ? theme.fn.rgba(color, 0.55) : color
    };

    const useStyles = createStyles((theme) => ({
        card: {
          position: 'relative',
          overflow: 'hidden',
          padding: theme.spacing.xl,
          paddingLeft: theme.spacing.xl * 2,
    
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            backgroundColor: getColor(theme),
          },
        },
        title: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }));

    const { classes } = useStyles();
    return (
        <Paper withBorder radius="md" className={classes.card} style={{ minHeight: 210 }}>
            {repo.primaryLanguage && (<Badge radius="md" variant="gradient" gradient={{ from: repo.primaryLanguage.color, to: repo.primaryLanguage.color, deg: 69 }}>{repo.primaryLanguage.name}</Badge>)
                || <Badge radius="md">No Language</Badge> }
            <Title order={3} mt="sm"><Anchor href={repo.url} inherit target="_blank" className={classes.title}>{repo.name}</Anchor></Title>
            <Text size="sm" mt="sm">
                <Badge color="gray" leftSection="⭐">{repo.stargazerCount}</Badge>&nbsp;
                <Badge color="gray" leftSection="🍴">{repo.forkCount}</Badge>&nbsp;
                <Badge color="gray" leftSection="👀">{repo.watchers.totalCount}</Badge>
            </Text>
            <Text size="sm" mt="sm" color="dimmed" lineClamp={2}>{repo.description}</Text>
        </Paper>
    );
}

export function ReposBlock({ repos }) {
    const useStyles = createStyles((theme) => ({ 
        wrapper: {
            position: 'relative',
            paddingTop: theme.spacing.xl * 4,
            paddingBottom: theme.spacing.xl * 4,
        },
        title: {
            marginBottom: theme.spacing.sm,
        
            [theme.fn.smallerThan('sm')]: {
              fontSize: 28,
            },
        },
    }));
    const { classes } = useStyles();
    return (
        <>
            <Container className={classes.wrapper}>
                <Title className={classes.title}>Your top 3 repositories</Title>
                <Text>Ordered by number of stars</Text>
                <Grid mt={60} gutter={30}>
                {repos.map((repo, index) => 
                    <Grid.Col sm={12} md={6} lg={4} key={index}>
                       <RepoCard repo={repo} />
                    </Grid.Col>
                )}
                </Grid>
            </Container>
        </>
    );
}