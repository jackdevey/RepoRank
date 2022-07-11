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

export default function SheildsPage() {
    const router = useRouter();
    const theme = useMantineTheme();
  
    return (
      <AppShell style={BackgroundStyle(theme)}>
        <Container size="xs">
          <Card withBorder radius="md" shadow="md">
            <Title order={2}>🛡️Shields</Title>
            <Text weight="bold">🔥RepoRank</Text>
          </Card>
        </Container>
      </AppShell>
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
