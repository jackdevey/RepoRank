import { Text, useMantineTheme } from "@mantine/core";
import { endpoint } from "../../misc/endpoint";

export default function DevMode() {
    const theme = useMantineTheme();
    return <div style={{backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}}>
        <Text>DevMode | API Endpoint: {endpoint()}</Text>
    </div>
}