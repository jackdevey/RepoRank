import React, { useState } from 'react';
import { Badge, Card, Container, TextInput, AppShell, LoadingOverlay, useMantineTheme, Modal, Accordion, Text, Code, Anchor } from '@mantine/core';
import { PersonIcon, RepoIcon } from '@primer/octicons-react';
import { BackgroundStyle, CompactLineStyle } from '../misc/style/Style'
import { Tabs } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { ShowErrorPopup } from '../misc/ShowErrorPopup.js';
import { User } from '../misc/user/User.js';
import Head from 'next/head';
import { ReportAnalytics } from 'tabler-icons-react';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer';

export default function IndexPage() {

  const empty = {
    score: "Unknown",
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
    }
  }

  const theme = useMantineTheme();

  const [title, setTitle] = useState('RepoRank');

  const [username, setUsername] = useState('');
  const modals = useModals();

  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [result, setResult] = useState(empty);

  const [loading, setLoading] = useState(false);

  let endpoint = "https://api.reporank.dev";

  if (process.env.NODE_ENV !== 'production') {
    endpoint = "http://api.localhost:8080";
  }


  return (
    <>
      <Header><Badge style={{textTransform: "lowercase"}}>{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}</Badge></Header>
      Content will go here!
      <Footer/>
    </>
  );

  function Click() {

    if (owner === '' || repo === '') {
      ShowErrorPopup(modals, {
        code: 400,
        message: "You didn't even enter anything!"
      }, "repo");
      return;
    }

    setLoading(true);

    fetch(`${endpoint}/${owner}/${repo}`)
      .then(res => res.json())
      .then((data) => {
        setLoading(false);
        setResult(data.body);
      })

  };

  function FetchUserReport() {
    User(React, modals, username, (bool) => setLoading(bool))
  }

  function ForwardToReport() {
    if (username === '') {
      ShowErrorPopup(modals, {
        code: 400,
        message: "You didn't even enter anything!"
      }, "repo");
      return;
    }

    window.location.href = `/reports/${username}`;
  }

}