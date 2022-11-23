import { Grading, Metric, RepositoryGrading } from "./types";

export class Repository {

    stars: number = 150_000
    forks: number = 15_000
    watchers: number = 1_500

    /**
     * Analyse the repository
     * @returns RepositoryGrading
     */

    analyse(): RepositoryGrading {
        return {
            overview: {
                score: 0,
                level: 0,
                grading: Grading.None
            },
            metrics: {
                stars: this.checkStars(),
                forks: this.checkForks(),
                watchers: this.checkWatchers()
            }
        }
    }

    /**
     * Check if the repository's stars, forks & watchers
     * metrics follow the 'golden ratio' of XXXk stars, 
     * XXk forks and Xk watchers
     * 
     * @returns Grading
     */

    checkGoldenRatio(): Grading {
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
     * @returns Metric
     */

    checkStars(): Metric {
        // Build metric
        let metric: Metric = {
            count: this.stars,
            grading: Grading.Partial
        }
        // Count digits in stars
        let digits = Math.log10(this.stars) + 1;
        // Calc grading from count
        if(this.stars = 0) metric.grading = Grading.None
        else if(digits <= 2) metric.grading = Grading.Poor
        else if(digits >= 5) metric.grading = Grading.Good
        // Return metric
        return metric
    }

    /**
     * Check the repository's fork count
     * 
     * @returns Metric
     */

    checkForks(): Metric {
        // Build metric
        let metric: Metric = {
            count: this.stars,
            grading: Grading.Partial
        }
        // Count digits in stars
        let digits = Math.log10(this.forks) + 1
        // Calc grading from count
        if(this.stars == 0) metric.grading = Grading.None
        else if(digits <= 2) metric.grading = Grading.Poor
        else if(digits >= 4) metric.grading = Grading.Good
        // Return the metric
        return metric
    }

    /**
     * Check the repository's watcher count
     * 
     * @returns Metric
     */

    checkWatchers() {
        // Build metric
        let metric: Metric = {
            count: this.stars,
            grading: Grading.Partial
        }
        // Count digits in stars
        let digits = Math.log10(this.watchers) + 1;
        // Calc grading from count
        if(this.watchers == 0) metric.grading = Grading.None
        else if(digits <= 1) metric.grading = Grading.Poor
        else if(digits >= 3) metric.grading = Grading.Good
        // Return metric
        return metric
    }

}