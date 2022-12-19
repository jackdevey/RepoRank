import { AppShell, Center, Loader } from "@mantine/core";
import Head from "next/head";
import Navbar from "../bars/navbar";

export default function DefaultLoading({ title }: { title: string }) {
    return (
        <AppShell
            padding={0}
            header={<Navbar/>}>
            <Head>
                <title>{title}</title>
            </Head>
            <Center h={500}>
                <Loader/>
            </Center>
        </AppShell>
    );
}