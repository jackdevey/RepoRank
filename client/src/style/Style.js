export function BackgroundStyle(theme) { 
    return {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
}

export function CompactLineStyle() {
    return {
        marginTop: "0px",
        marginBottom: "0xp",
        paddingTop: "0px",
        paddingBottom: "0xp"
    }

}
