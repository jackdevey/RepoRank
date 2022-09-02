import { Title, Text, Button } from "@mantine/core";

export function ShowErrorPopup(modals, data, context) {
    // If error code is 404, rephrase it to be more clear
    if (data.code == 404) data.message = `Make sure that ${context} exists and try again!`;
    // Show error popup
    const id = modals.openModal({
        centered: true,
        title: "😭 Whoops!",
        radius: "md",
        children: (
            <>
                <Title order={2}>Something went wrong</Title>
                <Text color="dimmed" weight={400} style={{ marginBottom: "20px" }}>{data.message}</Text>
                <Button onClick={() => modals.closeModal(id)}>Close</Button>
            </>
        )
    });
}