import { ActionIcon, Anchor, AppShell, Box, Card, Checkbox, CheckIcon, Container, Divider, Flex, Grid, Popover, Progress, SimpleGrid, Skeleton, Space, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "tabler-icons-react";
import Navbar from "../../components/bars/navbar";
import Repobar from "../../components/bars/repobar";
import { getRepo } from "algs";
import MetricGroupSection, { MetricGroup } from "../../components/metrics/metricGroup";
import { useEffect, useState } from "react";

const PRIMARY_COL_HEIGHT = 300;

export default function Repo() {

    const router = useRouter();
    const { owner, repo } = router.query;

    const [data, setData] = useState<Repo>();

    useEffect(() => {
        if(owner && repo) {
            console.log(owner); console.log(repo);
            getRepo(owner as string, repo as string).then(data => setData(data))
        }
    }, [owner, repo]) 

    


    const theme = useMantineTheme();

    if (!data) {
        return <a>Loading</a>
    }

    return (
        <AppShell
            padding={0}
            navbar={<Box style={{ position: "sticky" }}>
            </Box>}
            header={<Navbar />}
        >
            <div>
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
                                        {/* View in new tab link */}
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
                                    <Title>{data.about.language}</Title>
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
            </div>
        </AppShell>
    );
}
