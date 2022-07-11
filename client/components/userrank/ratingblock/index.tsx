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
import { Check } from 'tabler-icons-react';
import image from './image.svg';

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

export function RatingBlock() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <div style={{background:  theme.colors.dark[6]}}>
 <Container className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A <span className={classes.highlight}>beginner</span> rated <br /> GitHub user
              </Title>
              <Text color="dimmed" mt="md">
                They're just getting started, but that doesn't mean they havent already
                achieved some great things
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
                  <b>TypeScript based</b> – build type safe applications, all components and hooks
                  export types
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
                  any project
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
                  keyboard
                </List.Item>
              </List>
  
            </div>
            <Image src={image.src} className={classes.image} />
        </Container>
        </div>
    );
}