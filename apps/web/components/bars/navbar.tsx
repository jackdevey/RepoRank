import { Anchor, Box, Flex, Title, Text, Divider, Container } from "@mantine/core";
import styles from './navbar.module.css';

export default function Navbar() {
    return <>
        <Box p="md" style={{backgroundColor: "#0C283B"}}>
            <Container size="xl">
                <Flex style={{justifyContent: "space-between", alignItems: "center"}}>
                <Title className={styles.rrAnimParent} order={1}>
                    <span style={{color: "#FF9C48"}}>▆</span>
                    <span style={{color: "#FF7130"}}>▌</span>
                    R<span className={styles.rrAnimExt}>epo</span>
                    R<span className={styles.rrAnimExt}>ank</span>
                </Title>
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