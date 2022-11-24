import { ActionIcon, Card, Checkbox, CheckIcon, Container, Divider, Flex, Grid, Popover, Progress, SimpleGrid, Space, Text, ThemeIcon, Title } from "@mantine/core";
import { useRouter } from "next/router";
import Navbar from "../../components/bars/navbar";
import Repobar from "../../components/bars/repobar";
import Userbar from "../../components/bars/userbar";
import MetricGroupSection, { MetricGroup } from "../../components/metrics/metricGroup";

export default function Repo() {

    const router = useRouter();
    const { owner } = router.query;

    return (
        <>
            {/* Header */}
            <Navbar />
            <Userbar owner={owner as string} tier="C" points={40000} />
            {/* Main Content */}
            <Container size="lg" mt="md">
                <MetricGroupSection group={{
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
                }} />
                <Space mt="xl" mb="md" />
                <MetricGroupSection group={{
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
                        }
                    ]
                }} />
                <Space mt="xl" mb="md" />
            </Container>
        </>
    );
}
