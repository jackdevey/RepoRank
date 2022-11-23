import { ActionIcon, Card, Checkbox, CheckIcon, Container, Divider, Flex, Grid, Popover, Progress, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import { useRouter } from "next/router";
import Navbar from "../../components/bars/navbar";
import Repobar from "../../components/bars/repobar";

export default function Repo() {

    const router = useRouter();
    const { owner, repo } = router.query;

    return (
        <>
            {/* Header */}
            <Navbar/>
            <Repobar owner={owner as string} repo={repo as string} tier="s" points={40000}/>
            {/* Main Content */}
            <Container size="xl" mt="md">
                <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                    <Title order={2}>Overview</Title>
                    <Text>1,306 / 3,000 pts</Text>
                </Flex>
                <Progress value={(1306 / 3000) * 100} size="sm" radius={0} mt={10}/>
                <Grid mt="sm">
                    <Grid.Col md={4} sm={12}>
                        <Card withBorder>
                            <Title order={3}>Stars</Title>
                            <Title>678,000</Title>
                            <Divider my="sm"/>
                            <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                                <Text color="dimmed">+ 678 pts</Text>
                                <ThemeIcon variant="outline">k</ThemeIcon>
                            </Flex>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={4} sm={12}>
                        <Card withBorder>
                            <Title order={3}>Forks</Title>
                            <Title>34,600</Title>
                            <Divider my="sm"/>
                            <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                                <Text color="dimmed">+ 346 pts</Text>
                                <ThemeIcon variant="outline">h</ThemeIcon>
                            </Flex>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={4} sm={12}>
                        <Card withBorder>
                            <Title order={3}>Watchers</Title>
                            <Title>2,820</Title>
                            <Divider my="sm"/>
                            <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                                <Text color="dimmed">+ 346 pts</Text>
                                <ThemeIcon variant="outline"><Text size="sm">da</Text></ThemeIcon>
                            </Flex>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
