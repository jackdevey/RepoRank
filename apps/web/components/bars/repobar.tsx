import { Box, Divider, Flex, ThemeIcon, Title, Text, Container } from "@mantine/core";

export default function Repobar({ owner, repo, tier, points}: RepobarProps) {
    return <>
        <div style={{position: "sticky", top: 0, backgroundColor: "#0A2232", zIndex: 1000}}>
            <Box px="md">
                <Container size="xl">
                    <Flex style={{ justifyContent: "space-between", alignItems: "center" }} pt="md" pb="sm">
                        <Flex>
                            <ThemeIcon mr="sm" pb={3}>{tier}</ThemeIcon>
                            <Title order={3}>{owner}/{repo}</Title>
                        </Flex>
                        <Text>{new Intl.NumberFormat("en-UK").format(points)} pts</Text>
                    </Flex>
                </Container>
            </Box>
            <Divider/>
        </div>
    </>
}

export type RepobarProps = {
    owner: string,
    repo: string,
    tier: string,
    points: number
}