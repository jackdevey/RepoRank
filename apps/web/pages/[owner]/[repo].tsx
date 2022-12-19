import { ActionIcon, Anchor, AppShell, Box, Card, Checkbox, CheckIcon, Container, Divider, Flex, Grid, Popover, Progress, SimpleGrid, Skeleton, Space, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "tabler-icons-react";
import Navbar from "../../components/bars/navbar";
import Repobar from "../../components/bars/repobar";
import { getRepo, Repo as RepoData } from "@reporank/algs";
import MetricGroupSection, { MetricGroup } from "../../components/metrics/metricGroup";
import { useEffect, useState } from "react";
import Head from "next/head";

const PRIMARY_COL_HEIGHT = 300;

export default function Repo() {

    const router = useRouter();
    const { owner, repo } = router.query;

    const [data, setData] = useState<RepoData>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if(owner && repo) {
            getRepo(owner as string, repo as string)
            .then(data => setData(data))
            .catch(error => setError(error))
        }
    }, [owner, repo]);

    if (!data && !error) return <a>Loading</a>
    if (!data && !data) return <a>Error</a>

    return (
        <AppShell
            padding={0}
            navbar={<Box style={{ position: "sticky" }}>
            </Box>}
            header={<Navbar />}
        >
            <Head>
                <title>{owner}/{repo}</title>
            </Head>
            <>
                <Repobar owner={owner as string} repo={repo as string} tier="B" points={40000} />
                <Container size="xl" mt="md">
                    {/* Main Content */}
                    <Title>About</Title>
                    <Divider mt="sm" mb="md" />
                    <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        <Card withBorder>
                            af
                        </Card>
                        <Grid gutter="md">
                            <Grid.Col>
                                <Card withBorder>
                                    <Title order={4}>Owner</Title>
                                    <Flex style={{ alignItems: "baseline" }}>
                                        <Title>{data.about.owner}</Title>
                                        {/* View owner in new tab */}
                                        <Link href={`https://github.com/${owner}`} passHref>
                                            <ActionIcon variant="subtle" color="teal">
                                                <ArrowUpRight size={24}/>
                                            </ActionIcon>
                                        </Link>
                                    </Flex>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Card withBorder>
                                    <Title order={4}>Type</Title>
                                    <Title>{data.about.type}</Title>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Card withBorder>
                                    <Title order={4}>Primary language</Title>
                                    <Flex style={{ alignItems: "baseline" }}>
                                        <Title>{data.about.language}</Title>
                                        {/* View language in new tab */}
                                        <Link href={`https://github.com/topics/${data.about.language}`} passHref>
                                            <ActionIcon variant="subtle" color="teal">
                                                <ArrowUpRight size={24}/>
                                            </ActionIcon>
                                        </Link>
                                    </Flex>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>

                    <Title mt="lg">Metrics</Title>
                    <Divider mt="sm" mb="md"/>
                    {data.metrics.map((group) => <>
                        <MetricGroupSection group={group} />
                        <Space mt="xl" mb="md" />
                    </>)}
                </Container>
            </>
        </AppShell>
    );
}
