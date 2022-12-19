import { ThemeIcon, Anchor, Button, Container, Divider, Flex, Text, Title, Card, Paper, Box, Accordion } from "@mantine/core";
import Navbar from "../components/bars/navbar";
import Repobar from "../components/bars/repobar";
import "./core.module.css";

export default function Web() {

  return (
    <>
      {/* Header */}
      <Navbar/>
      {/* Main Content */}
      <Container size="xl" mt="md">
        <Title order={1}>Coming soon™</Title>
        <p>
          <Text>
            I'm currently working on a much needed revamp for <b>RepoRank</b>, updating the <b>API</b> and 
            <em>this</em> <b>Client</b>. Which is funny because it's not really a revamp and more just me 
            fixing the <em>entire</em> website because it just broke and I really couldn't be bothered to 
            fix it.
          </Text>
        </p>
        <p>
          <Text>
            But now I am so thats okay wowza this is really cool, hopefully soon I will be done and decide what to 
            put here, which to be honest I have no clue. Thanks for reading this I guess aha, it's kind of weird that 
            you did but also pretty cool so thank you. I'll get this finished really quickly
          </Text>
        </p>
        <p>
          <Text color="dimmed">
            - Jack
          </Text>
        </p>
      </Container>
    </>
  );
}
