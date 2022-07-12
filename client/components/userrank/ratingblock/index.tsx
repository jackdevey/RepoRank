import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import { Award, Badge, Check, Code, CodePlus, Point, Trophy } from 'tabler-icons-react';
import image from './image.svg';
import getRating from './RatingAssigner';
import { CodeIcon } from '@primer/octicons-react';
import { ButtonTableList, CircleBadge } from '@primer/react';
import CountUp from 'react-countup';

const ranking = (level) => {
  // Beginner status as fallback
  let obj = {
    title: 'Beginner',
    description: 'You have not yet achieved any rank.',
    color: 'blue'
  }

  // Ultimate status
  if (level === 7) {
    obj = {
      title: 'Ultimate',
      description: 'You have achieved the highest rank.',
      color: 'gold'
    }
  }

  // Legendary status
  if (level >= 6) {
    obj = {
      title: 'Legendary',
      description: 'Legend',
      color: 'yellow'
    }
  }

  // Pro status
  if (level >= 4) {
    obj = {
      title: 'Legendary',
      description: 'Legend',
      color: 'green'
    }
  }


  // Intermediate status
  if (level >= 2) {
    obj = {
      title: 'Intermediate',
      description: 'Legend',
      color: '#38D9A9'
    }
  }

  return obj;
}

const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
    },
  
    content: {
      maxWidth: 480,
      marginRight: theme.spacing.xl * 3,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 44,
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: 28,
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
          : theme.colors[theme.primaryColor][0],
      borderRadius: theme.radius.sm,
      padding: '4px 12px',
    },
  }));

export function RatingBlock({ level }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const rating = getRating(level);
    return (
        <div style={{background:  theme.colors.dark[6]}}>
          <Container className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                {rating.before} <span className={classes.highlight} style={{background: theme.fn.rgba(rating.color, 0.5)}}>{rating.title.toLowerCase()}</span> <br /> {rating.after}
              </Title>
              <Text color="dimmed" mt="md">
                {rating.description}
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <Check size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Over <CountUp end={1000}></CountUp> commits this year</b> – you've clearly been busy and are motivated to keep coding
                </List.Item>
                <List.Item>
                  <b>Over <CountUp end={10000}></CountUp> stars earned</b> – your work is well-received and you have some great projects
                </List.Item>
                <List.Item>
                  <b>Over <CountUp end={5}></CountUp> followers</b> – you're starting to grow a following and are gaining traction
                </List.Item>
              </List>
  
            </div>
            <Image src={image.src} className={classes.image} />
        </Container>
        </div>
    );
}