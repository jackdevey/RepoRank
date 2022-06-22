import { Accordion, Text, Code, Anchor, Avatar, Center, Group, Title, Grid, Timeline, Badge, Popover, ActionIcon } from '@mantine/core';
import { StatusBadge } from './StatusBadge';
import { ShowErrorPopup } from '../ShowErrorPopup';
import { CompactLineStyle } from '../style/Style.js';
import CountUp from 'react-countup';
import { useState } from 'react';
import { Number1, Number2, Number3, Help } from 'tabler-icons-react';

export function ShowPopup(react, modals, data) {
    // Show error popup instead if necessary
    if (data.header.code != 200) {
        ShowErrorPopup(modals, data.header, "user");
        return;
    }
    // Extract the user contents from the data
    let user = data.body;
    // Show the modal
    modals.openModal({
        size: "xl",
        centered: true,
        children: (
            <>
                <Center>
                    <Group noWrap style={{ paddingBottom: "60px" }}>
                        <Avatar src={user.avatarUrl} radius="xl" size="lg" />
                        <div>
                            <Title order={3}>{user.username}</Title>
                            <Text color="dimmed" weight={400}>{user.bio}</Text>
                        </div>
                    </Group>
                </Center>
                <Grid>
                    <Grid.Col lg={6} sm={12}>
                        <TotalScoreSummary user={user} />
                        <h3 style={{ marginTop: "20px" }}>Top repos</h3>
                        <Timeline active={-1} bulletSize={24} lineWidth={2} style={{ paddingBottom: "20px" }}>
                            {[...user.topRepos].map((repo, i) =>
                                <Timeline.Item bullet={<MedalBulletIcon position={i + 1} />} title={<Anchor href={`https://github.com/${user.username}/${repo.name}`} target="_blank">{user.username}/{repo.name}</Anchor>}>
                                    <Text style={{ paddingBottom: "5px" }}>
                                        {repo.primaryLanguage !== null && (<Badge variant="gradient" gradient={{ from: repo.primaryLanguage.color, to: repo.primaryLanguage.color, deg: 35 }}>{repo.primaryLanguage.name}</Badge>)}&nbsp;
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
                            <Accordion.Item label={<Text>Awards 🏆 <AwardsPopup awards={user.awards} /></Text>}>
                                This account has scored <Code>{user.score.awardsScore} pts</Code> from GitHub awards
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Stars earned 🌟 <PointsPopup points={user.score.repoStarsScore} maximum={100} /></Text>}>
                                The account has earned <Code>{user.repoStars}</Code> stars in their top 3 repos
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Recent commits 📨 <PointsPopup points={user.score.commitsYearScore} maximum={100} /></Text>}>
                                The account has made <Code>{user.commitsYear}</Code> commits in the previous year
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Followers 🧑‍💻 <PointsPopup points={user.score.followerScore} maximum={100} /></Text>}>
                                The account has <Code>{user.followers}</Code> followers
                            </Accordion.Item>
                            <Accordion.Item label={<Text>PRs 🌿 <PointsPopup points={user.score.prs} maximum={100} /></Text>}>
                                The account has made <Code>{user.prs}</Code> PRs
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Issues 🚨 <PointsPopup points={user.score.issues} maximum={100} /></Text>}>
                                The account has participated in <Code>{user.issues}</Code> issues
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Repos 📙 <PointsPopup points={user.score.repos} maximum={50} /></Text>}>
                                The account has contributed to <Code>{user.repos}</Code> repos
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Years active ⏲️ <PointsPopup points={user.score.accountAge} maximum={25} /></Text>}>
                                This account was created in <Code>{(new Date().getFullYear()) - user.accountAge}</Code>
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Sponsoring 💸 <PointsPopup points={user.score.sponsoring} maximum={25} /></Text>}>
                                The account is sponsoring <Code>{user.sponsors}</Code> others or orgs
                            </Accordion.Item>
                            <Accordion.Item label={<Text>Discussion comments 💭 <PointsPopup points={user.score.discussionComments} maximum={100} /></Text>}>
                                The account has made <Code>{user.discussionComments}</Code> discussion comments
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                </Grid>
            </>
        )
    });
}

function MedalBulletIcon({ position }) {
    if (position === 1) return <Number1 size={16} />;
    if (position === 2) return <Number2 size={16} />;
    return <Number3 size={16} />;
}

function PointsPopup({ points, maximum }) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                position="bottom"
                placement="center"
                spacing="xs"
                shadow="xs"
                styles={{ body: { pointerEvents: 'none' } }}
                target={<Code onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>{points} pts</Code>}
            >
                <div style={{ display: 'flex' }}>
                    {/* Show a nice message when maximum points are awarded */}
                    {points == maximum && (<Text size="sm" color="dimmed">🎉 Maximum points awarded</Text>)}
                    {/* Explain what is the maximum for the category otherwise */}
                    {points != maximum && (<Text size="sm" color="dimmed">Out of {maximum} pts</Text>)}
                </div>
            </Popover>
            {/* Show a nice message when maximum points are awarded */}
            {points == maximum && (<Code style={{ marginLeft: "5px" }} size="sm" color="success">🎉 Max</Code>)}
        </>
    );
}

function AwardsPopup({ awards }) {
    const [opened, setOpened] = useState(false);

    // Decide on a message to say depending on the
    // awards the user has earned
    let message = "0 pts awarded";
    if (awards.ghStar) message = "🎉 Maximum points awarded";
    else if (awards.bugBounty || awards.campusExpert) message = "50 pts awarded";

    return (
        <>
            <Popover
                opened={opened}
                onClose={() => setOpened(false)}
                position="bottom"
                placement="center"
                spacing="xs"
                shadow="xs"
                styles={{ body: { pointerEvents: 'none' } }}
                target={<AwardsNotice awards={awards} onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)} />}
            >
                <Text size="sm" color="dimmed">{message}</Text>
            </Popover>
            {/* Show a nice message when maximum points are awarded */}
            {awards.ghStar && (<Code style={{ marginLeft: "5px" }} size="sm" color="success">🎉 Max</Code>)}
        </>
    );

    function AwardsNotice({ awards, onMouseEnter, onMouseLeave }) {
        if (awards.ghStar) return <Code onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size="sm" color="yellow">🤩 GitHub Star</Code>;
        if (awards.bugBounty) return <Code onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size="sm" color="indigo">🐛 Bounty Hunter</Code>;
        if (awards.campusExpert) return <Code onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size="sm" color="red">🎓 Campus Expert</Code>;
        return <Code onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} size="sm">No awards</Code>;
    }
}

function TotalScoreSummary({ user }) {
    return (
        <>
            <Title order={1}>✨<CountUp end={user.totalScore}></CountUp> <small>pts</small></Title>
            <Title order={3} style={{marginTop: "10px"}}>🏅 Level {user.level}</Title>
            <Text style={{ marginTop: "20px" }} color="dimmed">
                This means <Anchor href={user.ghLink} target="_blank">{user.username}</Anchor> has recieved the {StatusBadge(user.level)} status from RepoRank
            </Text>
        </>
    )
}