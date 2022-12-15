import { Box, Divider, Flex, ThemeIcon, Title, Text, Container, ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { Refresh, Router } from "tabler-icons-react";
import TierIcon from "../tiers/tierIcon";

export default function Repobar({ owner, repo, tier, points}: RepobarProps) {
    // Use next router
    const router = useRouter()
    return <>
        <div style={{position: "sticky", top: 0, backgroundColor: "#0A2232", zIndex: 1000}}>
            <Box px="md">
                <Container size="xl">
                    <Flex style={{ justifyContent: "space-between", alignItems: "center" }} pt="md" pb="sm">
                        <Flex>
                            <TierIcon tier={tier}/>
                            <Title ml="sm" order={3}>{owner}/{repo}</Title>
                            <ActionIcon>
                                <Refresh size={18}/>
                            </ActionIcon>
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