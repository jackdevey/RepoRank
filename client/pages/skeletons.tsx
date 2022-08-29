import { Container, Group, Text, Title } from "@mantine/core";
import Head from "next/head";
import { Footer } from "../components/footer";
import { Header } from "../components/header/Header";

export function Skeleton({
    title,
    children,
    headerTitleEasterEgg = "RepoRank"
}) {
    return (
        <>
            <Head><title>{title} | RepoRank</title></Head>
            <Header title={headerTitleEasterEgg} page={title.toLowerCase()}/>
            <Container mt={15} mb={15}>{children}</Container>
            <Footer/>
        </>
    )
}

export function SkeletonWithTitle({ 
    title,
    description,
    emoji,
    children,
    headerTitleEasterEgg = "RepoRank" 
}) {
    return (
        <Skeleton
            title={title}
            headerTitleEasterEgg={headerTitleEasterEgg}>
            <Group spacing={15} mb={15}>
                <Title order={1}>{emoji}</Title>
                <div>
                    <Title order={2}>{title}</Title>
                    <Text>{description}</Text>
                </div>
            </Group>
            {children}
        </Skeleton>
    )
}