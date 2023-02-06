import { Card, Divider, Flex, ThemeIcon, Title, Text } from "@mantine/core";

export default function MetricCard({ metric }: { metric: Metric }) {
  return (
    <>
      <Card withBorder shadow={"md"}>
        <Title order={3}>{metric.name}</Title>
        <ValueTitle value={metric.value} />
        <Divider my="sm" />
        <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text color="dimmed">
            + {new Intl.NumberFormat("en-UK").format(metric.points)} /{" "}
            {new Intl.NumberFormat("en-UK").format(metric.maxPoints)} pts
          </Text>
          <ThemeIcon variant="outline">{getSystem(metric.system)}</ThemeIcon>
        </Flex>
      </Card>
    </>
  );
}

export type Metric = {
  name: string;
  value: string | number;
  points: number;
  maxPoints: number;
  system: string;
};

function getSystem(system: string) {
  if (system.length == 2) return <Text size="sm">{system}</Text>;
  else return <Text>{system}</Text>;
}

function ValueTitle({ value }: { value: string | number }) {
  if (typeof value === "number")
    return <Title>{new Intl.NumberFormat("en-UK").format(value)}</Title>;
  else return <Title>{value}</Title>;
}
