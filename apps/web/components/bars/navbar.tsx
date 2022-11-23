import { Anchor, Box, Flex, Title, Text, Divider, Container } from "@mantine/core";

export default function Navbar() {
    return <>
        <Box p="md" style={{backgroundColor: "#0C283B"}}>
            <Container size="xl">
                <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                    <Title order={1}>RepoRank</Title>
                    <Text>🔥</Text>
                    <Box>
                        <Anchor href="https://docs.reporank.dev/api" mr="md">API</Anchor>
                        <Anchor href="https://docs.reporank.dev/shields">Shields</Anchor>
                    </Box>
                </Flex>
            </Container>
        </Box>
        <Divider/>
    </>
}