export const endpoint = () => {
    if (process.env.NODE_ENV === 'production') return "https://api.reporank.dev";
    return "http://api.localhost:8080";
}