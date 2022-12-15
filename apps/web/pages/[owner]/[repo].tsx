import { ActionIcon, Anchor, AppShell, Box, Card, Checkbox, CheckIcon, Container, Divider, Flex, Grid, Popover, Progress, SimpleGrid, Skeleton, Space, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import Navbar from "../../components/bars/navbar";
import Repobar from "../../components/bars/repobar";
import MetricGroupSection, { MetricGroup } from "../../components/metrics/metricGroup";

const PRIMARY_COL_HEIGHT = 300;

export default function Repo() {

    const router = useRouter();
    const { owner, repo } = router.query;

    let data2 = fetch("https://api.github.com/repos/russellbanks/hashhash");

    const theme = useMantineTheme();
    const data = {
        about: {
            owner,
            repo,
            type: "Standard",
            language: {
                name: "Kotlin",
                colour: "orange"
            }
        },
        metrics: [
            {
                title: "Overview",
                metrics: [
                    {
                        name: "Stars",
                        value: 678000,
                        points: 678,
                        maxPoints: 1000,
                        system: "k"
                    },
                    {
                        name: "Forks",
                        value: 34600,
                        points: 346,
                        maxPoints: 1000,
                        system: "h"
                    },
                    {
                        name: "Watchers",
                        value: 2820,
                        points: 282,
                        maxPoints: 1000,
                        system: "da"
                    }
                ]
            },
            {
                title: "Activity",
                metrics: [
                    {
                        name: "Commits this year",
                        value: 789,
                        points: 789,
                        maxPoints: 1000,
                        system: "-"
                    },
                    {
                        name: "Last commit",
                        value: "2 days ago",
                        points: 600,
                        maxPoints: 1000,
                        system: "dt"
                    },
                    {
                        name: "Open issues",
                        value: 12,
                        points: 120,
                        maxPoints: 1000,
                        system: "da"
                    }
                ]
            },
            {
                title: "Community Standards",
                metrics: [
                    {
                        name: "Readme",
                        value: "Yes",
                        points: 150,
                        maxPoints: 150,
                        system: "-"
                    },
                    {
                        name: "Code of conduct",
                        value: "Yes",
                        points: 150,
                        maxPoints: 150,
                        system: "-"
                    },
                    {
                        name: "Contributing",
                        value: "Yes",
                        points: 150,
                        maxPoints: 150,
                        system: "-"
                    },
                    {
                        name: "Security Policy",
                        value: "No",
                        points: 0,
                        maxPoints: 150,
                        system: "-"
                    }
                ]
            }
        ]
    };

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
                                        <ActionIcon variant="subtle" color="teal">a</ActionIcon>
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
                                    <Title>{data.about.language.name}</Title>
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
