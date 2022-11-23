import { Flex, Title, Text, Progress, Grid, Card, Divider, ThemeIcon } from "@mantine/core";
import MetricCard, { Metric } from "./metricCard";

export default function MetricGroupSection({ group }: { group: MetricGroup }) {

    let totalPoints = 0;
    let maxPoints = 0;
    group.metrics.forEach(metric => {
        totalPoints += metric.points;
        maxPoints += metric.maxPoints;
    });

    return <>
        <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
            <Title order={2}>{group.title}</Title>
            <Text>{new Intl.NumberFormat("en-UK").format(totalPoints)} / {new Intl.NumberFormat("en-UK").format(maxPoints)} pts</Text>
        </Flex>
        <Progress value={(1306 / maxPoints) * 100} size="sm" radius={0} mt={10}/>
        <Grid mt="sm">
            {group.metrics.map((metric) => (
                <Grid.Col md={Math.floor(12 / group.metrics.length)} sm={12}>
                    <MetricCard metric={metric}/>
                </Grid.Col>
            ))}
        </Grid>
    </>;
}

export type MetricGroup = {
    title: string;
    metrics: Metric[];
}