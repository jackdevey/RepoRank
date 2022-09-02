import { ActionIcon, Card, Code, Divider, TextInput, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { Copy } from "tabler-icons-react";
import { SkeletonWithTitle } from "./skeletons";

export default function ShieldsPage() {
    const clipboard = useClipboard();

    return (
        <SkeletonWithTitle
            title={"Shields"}
            description={"Generate shields to display scores in your readme"}
            emoji={"🛡️"}>
            <Card withBorder radius="md" style={{height: "100%"}} mb={15}>
                <Title order={3}>Repositories</Title>
                <Code color="blue">API</Code>&nbsp;<Code>shields/[owner]/[repo]</Code>
                <Divider mt={10} mb={10}/>
                <TextInput
                    variant="filled"
                    placeholder="Repository"
                    radius="md"
                    value="https://api.reporank.dev/shields/[owner]/[repo]"
                    required
                    rightSection={
                        <ActionIcon onClick={() => clipboard.copy("https://api.reporank.dev/shields/[owner]/[repo]")}>
                            <Copy size={18} />
                        </ActionIcon>
                    }
                />
            </Card>

            <Card withBorder radius="md" style={{height: "100%"}}>
                <Title order={3}>Users</Title>
                <Code color="blue">API</Code>&nbsp;<Code>shields/[username]</Code>
                <Divider mt={10} mb={10}/>
                <TextInput
                    variant="filled"
                    placeholder="Repository"
                    radius="md"
                    value="https://api.reporank.dev/shields/[username]"
                    required
                    rightSection={
                        <ActionIcon onClick={() => clipboard.copy("https://api.reporank.dev/shields/[username]")}>
                            <Copy size={18} />
                        </ActionIcon>
                    }
                />
            </Card>
        </SkeletonWithTitle>
    )
}