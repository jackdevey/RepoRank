---
sidebar_position: 1
---

# RepoRank

The RepoRank algorithm is used to assign a GitHub repository a comprehensive score denoting it's general notabiltiy,
trustworthiness and reputation, with the goal to assist in it's comparison.

## Components

The algorithm can be broken down into a series of individual components that analyse a section of the repostiroy. 
The scores for each component, skewed by the component's weighting will be appended to the repositories final score.

### Stars, forks & watchers
* `stars` infer the total number of users impressed with the repository
* `forks` suggest the number of users making changes to the source code
* `watchers` represent the number of users interested in the repository

These metrics, can be used to construct a solid grounding of the performance of the repository, however they should **only**
be used in conjunction with *other* pieces of data, never on their own as they often provide a very biased view on the repository. This is because:

* A clearly abandoned project that was once popular will often have high numbers of `stars`, `forks`, `watchers`. They are not a good measure of a repositories *current* stature as they last forever once assigned by the user.
* Any project begins with zero `stars`, `forks`, `watchers` regardless of how good it is. It takes time and exposure to grow these metrics, the algorithm **can't** ignore that many GitHub gems are buried due to low numbers.

#### Stars
`stars` are analysed on a reciprocal curve to achieve a variable score gradient and asymptote point for a maximum score. 

$$
S = \frac{200x}{2x+400} * .40
$$

The equation for 

## Final score

The algorithm outputs an integer within the range of 0 to 1000 (inclusive), this is represents the repositories final score.
Various score tiers can be derived that make the score more comprehensible to an audience.

| Position | Tier | Range | Competency | Example |
|-|-|-|-|-|
| 1 | `s+` | `>=` 950 | Legendary | facebook/react |
| 2 | `s` | `>=` 900 | Outstanding | facebook/react |
| 3 | `a` | `>=` 700 | Advanced | facebook/react |
| 4 | `b` | `>=` 500 | Intermediate | facebook/react |
| 5 | `b` | `>=` 250 | Elementary | facebook/react |
| 6 | `b` | `<` 250 | Beginner | facebook/react |