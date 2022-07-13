import React from 'react';
import { createStyles, Header as MTHeader, Group, ActionIcon, Container, Burger, Title } from '@mantine/core';
import { ShareIcon } from '@primer/octicons-react';

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
  }
}));

export function Header({ title = "RepoRank" }) {
  const { classes } = useStyles();

  return (
    <MTHeader height={56}>
      <Container className={classes.inner}>

        <Title order={3}>🔥{title}</Title>

        {/**<Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <ShareIcon size={18} />
          </ActionIcon>
  </Group>*/}
        
      </Container>
    </MTHeader>
  );
}