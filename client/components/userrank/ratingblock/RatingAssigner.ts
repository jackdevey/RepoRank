export default function getRating(level: number): Rating {

    /**
     * Ultimate rating, for users 
     * with level of 7
     */

    const Ultimate: Rating = {
        title: 'Ultimate',
        description: "Best of the best, the ultimate level of mastery",
        color: '#F59F00',
        before: 'An',
        after: 'developer'
    }

    /**
     * Legendary rating, for users
     * with a level of 6
     */

    const Legendary: Rating = {
        title: 'Legendary',
        description: "You are clearly a top tier developer, but you're not the best",
        color: '#FCC419',
        before: 'A',
        after: 'developer'
    }

    /**
     * Advanced rating, for users
     * with a level of 4 or more
     */

    const Advanced: Rating = {
        title: 'Advanced',
        description: "You have a lot of experience and are extremely active, but you're not a master yet",
        color: '#94D82D',
        before: 'An',
        after: 'GitHub user'
    }

    /**
     * Experienced rating, for users
     * with a level of 2 or more
     */

    const Experienced: Rating = {
        title: 'Experienced',
        description: "You're starting to make, test & ship quality code - definitely on the right track",
        color: '#20C997',
        before: 'An',
        after: 'GitHub user'
    }

    /**
     * Beginner rating, for users
     * with a level of 0 or more
     */

    const Beginner: Rating = {
        title: 'Beginner',
        description: "You're just getting started, but that doesn't mean you havent already achieved some great things",
        color: '#339AF0',
        before: 'A',
        after: 'to GitHub'
    }

    /**
     * Assign a rating to the user,
     * based on their level
     */

    switch(true) {
        case level === 7: return Ultimate;
        case level >= 6: return Legendary;
        case level >= 4: return Advanced;
        case level >= 2: return Experienced;
        default: return Beginner;
    }
}

/**
 * Definition of a rating object
 */

interface Rating {
    title: string,
    description: string,
    color: string,
    before: string,
    after: string
}
