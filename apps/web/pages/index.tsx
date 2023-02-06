import { Container, Text, Title } from "@mantine/core";
import Navbar from "../components/bars/navbar";

export default function Web() {
  return (
    <>
      <Navbar />
      <Container size="xl" mt="md">
        <Title order={1}>Coming soon™</Title>
        <Text>
          I&apos;m currently working on a much needed revamp for <b>RepoRank</b>
          , updating the <b>API</b> and
          <em>this</em> <b>Client</b>. Which is funny because its not really a
          revamp and more just me fixing the <em>entire</em> website because it
          just broke and I really couldn&apos;t be bothered to fix it.
        </Text>
        <Text>
          But now I am so thats okay wowza this is really cool&apos; hopefully
          soon I will be done and decide what to put here, which to be honest I
          have no clue. Thanks for reading this I guess aha, it&apos;s kind of
          weird that you did but also pretty cool so thank you. I&apos;ll get
          this finished really quickly.
        </Text>
        <Text color="dimmed">- Jack</Text>
      </Container>
    </>
  );
}
