import React from "react";
import { useRouter } from 'next/router';
import {
  AppShell,
  Container,
  Title,
  ActionIcon,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
} from "@mantine/core";
import { createStyles, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

// Shows a list of services offered & a button 
// to toggle the colour scheme
function IndexPage() {
  const { classes } = useStyles();
  const router = useRouter();
  const theme = useMantineTheme();

  const items = services.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} onClick={() => router.push(item.path)}>
      <Title order={2}>{item.emoji}</Title>
      <Text size="sm" weight="bolder" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <AppShell style={BackgroundStyle(theme)}>
      <Container size="xs">
        <Card withBorder radius="md" shadow="md">
          <Group position="apart">
            <Text weight="bold">🔥RepoRank</Text>
            <ColorSchemeToggle />
          </Group>
          <SimpleGrid cols={3} mt="md">
            {items}
          </SimpleGrid>
        </Card>
      </Container>
    </AppShell>
  );
}

// Color scheme toggle button to change from
// dark mode to light mode, dark by default as
// defined in _document.tsx
export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.yellow[4]
            : theme.colors.blue[6],
      })}
    >
      {colorScheme === "dark" ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
}

function BackgroundStyle(theme) { 
    return {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}


// List of all services to appear on the page, their
// affiliated path and emoji
const services = [
    { title: "Repositories", emoji: "📕", path: "/repos" },
    { title: "Compare", emoji: "🆚", path: "/repos/compare" },
    { title: "Tables", emoji: "📑", path: "/repos/tables" },
    { title: "Reports", emoji: "📃", path: "/repos/reports" },
    { title: "Users", emoji: "🧑‍💻", path: "/users" },
    { title: "How it works", emoji: "🤖", path: "/how" },
    { title: "Tips", emoji: "💁", path: "/tips" },
    { title: "Shields", emoji: "🛡️", path: "/shields" },
    { title: "Contribute", emoji: "💭", path: "https://github.com/jackdevey/reporank" },
  ];

// Special styles for the items in the index
const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

export default IndexPage;
