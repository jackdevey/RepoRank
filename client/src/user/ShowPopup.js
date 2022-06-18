import { Accordion, Text, Code, Anchor, Avatar, Center, Group, Title, Divider, Grid, Timeline, Badge } from '@mantine/core';
import { StatusBadge } from './StatusBadge';
import { ShowErrorPopup } from '../ShowErrorPopup';
import { CompactLineStyle } from '../style/Style.js';
import CountUp from 'react-countup';

export function ShowPopup(modals, theme, data) {
    // Show error popup instead if necessary
    if (data.header.code != 200) {
        ShowErrorPopup(data.header, "user");
        return;
    }
    // Extract the user contents from the data
    let user = data.body;
    console.log(user);
    // Show the modal
    modals.openModal({
        size: "xl",
        centered: true,
        children: (
            <>
                <Center>
                    <Group noWrap style={{paddingBottom: "60px"}}>
                        <Avatar src={user.avatarUrl} radius="xl" size="lg" />
                        <div>
                            <Title order={3}>{user.username}</Title>
                            <Text color="dimmed" weight={400}>{user.bio}</Text>
                        </div>
                    </Group>
                </Center>
                <Grid>
                    <Grid.Col lg={6} sm={12}>
                        <h1 style={CompactLineStyle()}>✨<CountUp end={user.totalScore}></CountUp> <small>pts</small></h1>
                        <h3 style={CompactLineStyle()}>🏅 Level {user.level}</h3>
                        <Text style={{ marginTop: "20px" }}>
                            This means <Anchor href={user.ghLink} target="_blank">{user.username}</Anchor> has recieved the {StatusBadge(user.level)} status from RepoRate
                        </Text>
                        <h3 style={{marginTop: "20px"}}>Top repos</h3>
                        <Timeline active={-1} bulletSize={24} lineWidth={2} style={{paddingBottom: "20px"}}>
                            {[...user.topRepos].map((repo, i) =>
                                <Timeline.Item bullet={i + 1} title={<Anchor href={`https://github.com/${user.username}/${repo.name}`} target="_blank">{user.username}/{repo.name}</Anchor>}>
                                    <Text style={{paddingBottom: "5px"}}><Badge variant="gradient" gradient={{ from: repo.primaryLanguage.color, to: repo.primaryLanguage.color, deg: 35 }}>{repo.primaryLanguage.name}</Badge>&nbsp;
                                    <Badge color="gray" leftSection="⭐">{repo.stargazerCount}</Badge>&nbsp;
                                    <Badge color="gray" leftSection="🍴">{repo.forkCount}</Badge>&nbsp;
                                    <Badge color="gray" leftSection="👀">{repo.watchers.totalCount}</Badge>
                                    </Text>
                                    <Text color="dimmed" weight={400} size="sm">{repo.description}</Text>
                                </Timeline.Item>
                            )}
                        </Timeline>
                    </Grid.Col>
                    <Grid.Col lg={6} sm={12}>
                        <h3 style={CompactLineStyle()}>Score breakdown</h3>
                        <Accordion iconPosition="right" offsetIcon={false}>
                            <Accordion.Item label={<Text>Years active ⏲️ <Code>{user.score.ageScore} pts</Code></Text>}>
                                This account was created in <Code>{(new Date().getFullYear()) - user.accountAge}</Code>
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Awards 🏆 <Code>{user.score.awardsScore} pts</Code></Text>}>
                                This account has scored <Code>{user.score.awardsScore} pts</Code> from GitHub awards
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Followers 🧑‍💻 <Code>{user.score.followerScore} pts</Code></Text>}>
                                The account has <Code>{user.followers}</Code> followers
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Issues 🚨 <Code>{user.score.issueScore} pts</Code></Text>}>
                                The account has participated in <Code>{user.score.issueScore}</Code> issues
                            </Accordion.Item>
                            <Accordion.Item label={<Text>PRs 🌿 <Code>{user.score.prScore} pts</Code></Text>}>
                                The account has made <Code>{user.prs}</Code> PRs
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Repos 📙 <Code>{user.score.repoScore} pts</Code></Text>}>
                                The account has contributed to <Code>{user.repos}</Code> repos
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Sponsoring 💸 <Code>{user.score.sponsorScore} pts</Code></Text>}>
                                The account is sponsoring <Code>{user.sponsors}</Code> others or orgs
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Discussion comments 💭 <Code>{user.score.commentScore} pts</Code></Text>}>
                                The account has made <Code>{user.discussionComments}</Code> discussion comments
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Stars earned 🌟 <Code>{user.score.repoStarsScore} pts</Code></Text>}>
                                The account has earned <Code>{user.repoStars}</Code> stars in their top 3 repos
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                </Grid>
            </>
        )
    });
}