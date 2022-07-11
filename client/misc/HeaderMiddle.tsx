import React from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, Title } from '@mantine/core';
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

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export function HeaderMiddle({ }: HeaderMiddleProps) {
  const { classes } = useStyles();

  return (
    <Header height={56} mb={120}>
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