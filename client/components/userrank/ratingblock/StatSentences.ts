export function commitStatSentence(commits) {
    switch(true) {
        case commits >= 1000: return "you've been really busy this year and that's great, well done!";
        case commits >= 300: return "you've clearly been busy and are motivated to keep coding, keep it up!";
        case commits >= 100: return "you're a casual user and thats great, keep having fun and stay at your own pace!";
        default: return "you've only made a few commits, but you're doing great! Ideas will come to you soon!";
    }
}

export function starsStatSentence(stars) {
    switch(true) {
        case stars >= 100000: return "that's literally insane! you've made some amazing stuff, keep it up!"
        case stars >= 10000: return "you've clearly made some great stuff and you're on your way to more stars, well done!";
        case stars >= 1000: return "you're work is well-recieved and your on your way to lots more, keep it up!";
        case stars >= 500: return "you're work is out there and getting recognized with lots more stars to come!";
        default: return "you've made some great stuff but it's just not popular yet, give it time!";
    }
}

export function followersStatSentence(stars) {
    switch(true) {
        case stars >= 100000: return "that's amazing! you're clearly extremely important and people care about what you make!"
        case stars >= 1000: return "you've clearly made some great stuff and people are interested, well done!";
        case stars >= 100: return "you have a strong following, your work must clearly be great!";
        case stars >= 5: return "you're starting to grow a following and are gaining traction!";
        default: return "you've made some great stuff but it's just not popular yet, give it time!";
    }
}