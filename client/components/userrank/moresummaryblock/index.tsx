import React, { useState } from 'react';
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Popover,
  Code
} from '@mantine/core';
import { Icon as TablerIcon } from 'tabler-icons-react';
import { Data } from './data';
import CountUp from 'react-countup';

interface FeatureProps {
  icon: TablerIcon;
  category: string;
  score: number;
  max: number;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, score, max, category, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
        <ThemeIcon variant="light" size={40} radius={40}>
          <Icon size={20} />
        </ThemeIcon>
        <Text size="sm" color="dimmed" style={{ marginTop: theme.spacing.sm, marginBottom: 0 }}>
          {category}
        </Text>
        <Text><b><CountUp end={score}/>pts</b> out of {max} {max == score && <MaxPointsPopup/>}</Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
    </div>
  );
}

function MaxPointsPopup() {
  const [opened, setOpened] = useState(false);

  return (
      <>
          <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              position="bottom"
              placement="center"
              spacing="xs"
              shadow="xs"
              styles={{ body: { pointerEvents: 'none' } }}
              target={<Code color="blue" ml={5} onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>🎉 Max</Code>}
          >
              <div style={{ display: 'flex' }}>
                <Text size="sm" color="dimmed">🎉 Maximum points awarded</Text>
              </div>
          </Popover>
      </>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.sm,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
    },
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },
}));

export function MoreSummaryBlock({ userData, data = Data(userData) }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const features = data.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper} >
      <Title className={classes.title}>Raw data sourced directly from GitHub</Title>
        <Text>You can't argue with numbers</Text>
        <SimpleGrid
          mt={60}
          cols={3}
          spacing={theme.spacing.xl * 2}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'xl' },
            { maxWidth: 755, cols: 1, spacing: 'xl' },
          ]}
        >
          {features}
        </SimpleGrid>
    </Container>
  );
}