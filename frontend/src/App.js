import React, { useState } from 'react';
import RepoRank from './algorithm/RepoRank.js';
import { Button, Card, Container, TextInput, AppShell, LoadingOverlay, useMantineTheme, Modal, Accordion, Text, Code, Anchor } from '@mantine/core';
import { PersonIcon, RepoIcon } from '@primer/octicons-react';
import { BackgroundStyle, CompactLineStyle } from './style/Style.js'

function App() {

  const empty = {score: "Unknown",
  level: "Unknown",
  status: {
      title: "Unknown",
      color: "grey"
  },
  breakdown: {
      stars: "Unknown",
      forks: "Unknown",
      openIssues: "Unknown",
      codeChange: "Unknown",
      community: "Unknown"
  }}

  const theme = useMantineTheme();

  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [result, setResult] = useState(empty);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(Error("null"));

  return (
    <AppShell 
      className="background"
      style={BackgroundStyle(theme)}>
      <Container size="sm">
        <Card shadow="md">
          <LoadingOverlay visible={loading} />
          <h2>🔥 RepoRate</h2>
          <TextInput
            placeholder="Owner"
            size="xl"
            value={owner} 
            onChange={e => setOwner(e.target.value)}
            icon={<PersonIcon size={24} />}
            style={{paddingBottom: "20px"}}
            variant="filled"
            required
          />
          <TextInput
            placeholder="Repository"
            size="xl"
            value={repo} 
            onChange={e => setRepo(e.target.value)}
            icon={<RepoIcon size={24} />}
            style={{paddingBottom: "20px"}}
            variant="filled"
            required
          />
          <Button 
            variant="light" 
            size="xl"
            onClick={Click}>
            Calculate
          </Button>
        </Card>

        <Text color="dimmed" style={{marginTop: "10px"}}>Created by <Anchor href="https://github.com/jackdevey">jack devey</Anchor>, <Anchor href="https://github.com/jackdevey/reporank">contribute</Anchor></Text>
      </Container>

      <Modal
        centered
        opened={result.score !== "Unknown"}
        onClose={() => setResult(empty)}
        title={`${owner}/${repo}`}>

          <h1 
            style={CompactLineStyle()}>
              ✨ {result.score} <small>pts</small>
          </h1>

          <h3 style={CompactLineStyle()}>🏅 Level {result.level}</h3>

          <Text  style={{marginTop: "20px", marginBottom: "20px"}}>
            This means <Anchor href={`https://github.com/${owner}/${repo}`} target="_blank">{owner}/{repo}</Anchor> has recieved the <Code color={result.status.color}>{result.status.title}</Code> status from RepoRate
          </Text >

          <h3 style={CompactLineStyle()}>Score breakdown</h3>

        <Accordion iconPosition="right" offsetIcon={false}>
          <Accordion.Item label="Community 💞">
            The repo has a community percentage of <Code>{result.breakdown.community}%</Code>
          </Accordion.Item>

          <Accordion.Item label="Activity 👩‍💻">
            The repo has a code change value of <Code>{result.breakdown.codeChange}</Code>
          </Accordion.Item>

          <Accordion.Item label="Stars 🌟">
            The repo has <Code>{result.breakdown.stars}</Code> stars
          </Accordion.Item>

          <Accordion.Item label="Forks 🍴">
            The repo has <Code>{result.breakdown.forks}</Code> forks
          </Accordion.Item>

          <Accordion.Item label="Open issues 🚨">
            The repo has <Code>{result.breakdown.openIssues}</Code> open issues
          </Accordion.Item>
        </Accordion>

      </Modal>

      <Modal
        centered
        opened={error.message !== "null"}
        onClose={() => setError(Error("null"))}>

          <h1 
            style={CompactLineStyle()}>
              😭 Something went wrong
          </h1>

          <Text  style={{marginTop: "20px", marginBottom: "20px"}}>
            {error.message}
          </Text >

      </Modal>

    </AppShell>
  );

  function Click() {

    if(owner === '' || repo === '') {
      setError(Error("You didn't even enter anything!"));
      return;
    }

    setLoading(true)
    RepoRank(owner, repo).then(value => {
      setLoading(false);
      setResult(value);
    }, _ => {
      setLoading(false);
      setError(Error("Make sure that repo exists or is public & try again!"));
    })
  };

}

export default App;
