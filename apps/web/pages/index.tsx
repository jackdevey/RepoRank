import { ThemeIcon, Anchor, Button, Container, Divider, Flex, Text, Title, Card, Paper, Box, Accordion } from "@mantine/core";
import Navbar from "../components/bars/navbar";
import Repobar from "../components/bars/repobar";
import "./core.module.css";

export default function Web() {

  return (
    <>
      {/* Header */}
      <Navbar/>
      <Repobar owner="russellbanks" repo="HashHash" tier="s" points={40000}/>
      {/* Main Content */}
      <Container size="xl" mt="md">
        <Title order={2}>Overview</Title>
      </Container>
    </>
  );
}
