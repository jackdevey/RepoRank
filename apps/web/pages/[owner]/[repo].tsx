import { ActionIcon, Card, Checkbox, CheckIcon, Container, Divider, Flex, Grid, Popover, Progress, SimpleGrid, Space, Text, ThemeIcon, Title } from "@mantine/core";
import { useRouter } from "next/router";
import Navbar from "../../components/bars/navbar";
import Repobar from "../../components/bars/repobar";
import MetricGroupSection, { MetricGroup } from "../../components/metrics/metricGroupSection";

export default function Repo() {

    const router = useRouter();
    const { owner, repo } = router.query;

    const group: MetricGroup = {
        title: "Overview",
        metrics: [
            {
                name: "Stars",
                count: 678000,
                points: 678,
                maxPoints: 1000,
                system: "k"
            },
            {
                name: "Forks",
                count: 34600,
                points: 346,
                maxPoints: 1000,
                system: "h"
            },
            {
                name: "Watchers",
                count: 2820,
                points: 282,
                maxPoints: 1000,
                system: "da"
            }
        ]
    }

    const group2: MetricGroup = {
        title: "Overview",
        metrics: [
            {
                name: "Stars",
                count: 678000,
                points: 678,
                maxPoints: 1000,
                system: "k"
            },
            {
                name: "Forks",
                count: 34600,
                points: 346,
                maxPoints: 1000,
                system: "h"
            }
        ]
    }

    return (
        <>
            {/* Header */}
            <Navbar/>
            <Repobar owner={owner as string} repo={repo as string} tier="s" points={40000}/>
            {/* Main Content */}
            <Container size="lg" mt="md">
                <MetricGroupSection group={group}></MetricGroupSection>
                <Space mt="xl" mb="md"/>
                <MetricGroupSection group={group2}></MetricGroupSection>
                <Space mt="xl" mb="md"/>
                <MetricGroupSection group={group2}></MetricGroupSection>
                <Space mt="xl" mb="md"/>
                <MetricGroupSection group={group2}></MetricGroupSection>
                <Space mt="xl" mb="md"/>
                <MetricGroupSection group={group2}></MetricGroupSection>
            </Container>
        </>
    );
}
