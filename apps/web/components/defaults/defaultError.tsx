import { Center, Text, ThemeIcon, Title } from "@mantine/core";
import { Error404, RRError } from "@reporank/algs";
import Error from "next/error";
import Head from "next/head";
import { MoodSadDizzy } from "tabler-icons-react";
import Navbar from "../bars/navbar";

export default function DefaultError({ error }: { error: RRError }) {

    let title;
    let def;
    
    switch (error.code) {
        case 404: {
            title = "Wdym bro?"
            def = "Not found"
            break
        }
        case 403: {
            title = "Bit embarrassing"
            def = "Unauthorised"
            break
        }
        default: {
            title = "RIP RepoRank"
            error.code = 500
            def = "Internal error"
        }
    }

    return (
        <>
            <Navbar/>
            <Head>
                <title>Error {error.code}</title>
            </Head>
            <Center h={500}>
                <div>
                    <Title order={1}>
                        <ThemeIcon size="lg" color="red">
                            <MoodSadDizzy/>
                        </ThemeIcon> {title}</Title>
                    <Text>{error.message}</Text>
                    <Text size="sm" color="dimmed">{error.code} Not found</Text>
                </div>
            </Center>
        </>
    );
}