import { Text, ThemeIcon } from "@mantine/core";

export default function TierIcon({ tier }: { tier: string }) {
    return <ThemeIcon color={getColor(tier)}>
        {getTier(tier)}
    </ThemeIcon>
}

function getTier(tier: string) {
    if (tier.length == 2) return <Text size="sm">{tier}</Text>
    else return <Text>{tier}</Text>
}

function getColor(tier: string): string {
    switch (tier) {
        case "C": return "orange"
        case "B": return "yellow"
        case "A": return "lime"
        case "S": return "green"
        case "S+": return "teal"
        default: return "red"
    }
}