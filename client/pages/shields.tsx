import { Card, Title } from "@mantine/core";
import { SkeletonWithTitle } from "./skeletons";

export default function ShieldsPage() {
    return (
        <SkeletonWithTitle
            title={"Shields"}
            description={"Generate shields to display scores in your readme"}
            emoji={"🛡️"}>
            <Card withBorder radius="md" style={{height: "100%"}}>
                <Title order={3}>Repositories</Title>
            </Card>
        </SkeletonWithTitle>
    )
}