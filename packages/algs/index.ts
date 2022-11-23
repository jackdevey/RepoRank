class Repository {

    stars: number = 150_000
    forks: number = 15_000
    watchers: number = 1_500

    /**
     * Check if the repository's stars, forks & watchers
     * metrics follow the 'golden ratio' of XXXk stars, 
     * XXk forks and Xk watchers
     * 
     * @returns Grading
     */

    checkGoldenRatio() {
        // Count occurances of ratio
        let total = 0;
        if (Math.log10(this.stars) + 1 == 6) total ++;
        if (Math.log10(this.forks) + 1 == 5) total ++;
        if (Math.log10(this.watchers) + 1 == 4) total ++;
        // Return the grading
        if(total == 1) return Grading.Poor
        if(total == 2) return Grading.Partial
        return Grading.Good
    }

    /**
     * Check the repository's star count
     * 
     * @returns Grading
     */

    checkStars() {
        // Count digits in stars
        let digits = Math.log10(this.stars) + 1;
        // Return the grading
        if(digits <= 2) return Grading.Poor
        if(digits >= 5) return Grading.Good
        return Grading.Partial
    }

    /**
     * Check the repository's fork count
     * 
     * @returns Grading
     */

    checkForks() {
        // Count digits in stars
        let digits = Math.log10(this.forks) + 1;
        // Return the grading
        if(digits <= 2) return Grading.Poor
        if(digits >= 4) return Grading.Good
        return Grading.Partial
    }

    /**
     * Check the repository's watcher count
     * 
     * @returns Grading
     */

    checkWatchers() {
        // Count digits in stars
        let digits = Math.log10(this.watchers) + 1;
        // Return the grading
        if(digits <= 1) return Grading.Poor
        if(digits >= 3) return Grading.Good
        return Grading.Partial
    }

}

enum Grading {
    Poor = 1,
    Partial = 2,
    Good = 3
}