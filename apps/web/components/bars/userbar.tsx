import { Box, Divider, Flex, ThemeIcon, Title, Text, Container } from "@mantine/core";
import TierIcon from "../tiers/tierIcon";

export default function Userbar({ owner, tier, points}: UserbarProps) {
    return <>
        <div style={{position: "sticky", top: 0, backgroundColor: "#0A2232", zIndex: 1000}}>
            <Box px="md">
                <Container size="xl">
                    <Flex style={{ justifyContent: "space-between", alignItems: "center" }} pt="md" pb="sm">
                        <Flex>
                            <TierIcon tier={tier}/>
                            <Title ml="sm" order={3}>{owner}</Title>
                        </Flex>
                        <Text>{new Intl.NumberFormat("en-UK").format(points)} pts</Text>
                    </Flex>
                </Container>
            </Box>
            <Divider/>
        </div>
    </>
}

export type UserbarProps = {
    owner: string,
    tier: string,
    points: number
}