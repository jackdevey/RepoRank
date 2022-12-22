---
sidebar_position: 1
---

# RepoRank Algorithm

The RepoRank Algorithm is used to assign a GitHub repository a comprehensive score denoting it's general notabiltiy,
trustworthiness and reputation, with the goal to assist in it's comparison.

## General Architecture

The algorithm is split into components with each component being an individual aspect of the repository to analyse, increasing the
modularity of the algorithm. Each component is assigned a weighting, which is a percentage that affects the power the component has
in defining the final score.

Each component can be further broken down into sub-components which often analyse a metric directly, these are also weighted to alter
their power in the output of their 'parent' component.

The final score and output of the algorithm is derived from the summation of the weighted output from every component, in the format
of a percentage, with 100% being the highest score.

## Activation Functions

Sometimes, such as when analysing stars, attempting to understand a metric linearly would lead to an unfair result. Take for 
example, comparing the repos for `vercel/next.js` and `facebook/react` with `98k` stars and `199.5k` stars respectively 
(at the time of writing). 

It would be wrong to assume that `facebook/react` is twice as good as `vercel/next.js` just because it has approximately double the 
star count, however, what can be derived from this is that `facebook/react` has double the exposure. 

When evaluating metrics such as stars, it's vital for this to be taken into account. The RepoRank algorithm uses activation functions to
fairly distribute sub-component scores by variably reducing the worth of stars as a repo's star count rises above an arbitrary threshold.

This is generally achieved accross all metrics by using a translated [Sigmoid Function](https://en.wikipedia.org/wiki/Sigmoid_function)
shifting the y axis by a scale of 2 units, and moving the curve down by 1 unit to achieve a range of 0 to 1 in the positive area of the
graph.

$$
y=\frac{2}{1+e^{-(xs^{-1})}}-1
$$

The variable $s$ denotes the $x$ direction stretch of the curve and provides granular control over the score awarded. In essence, curves with a greater
$s$ value require higher metric values to score high scores. For example when analysing stars the $s$ value will be set higher than when analysing
watchers, as a repository often has more stars than watchers.

The output of each activation function is then multipled by 100 to achieve a percentage score for the sub-component being addressed. These can
then be swayed by their set weightings.

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
`stars` have a weighting of `50%` with a maximum score of 100

| Attribute | Input | Output | Asymptote | Weighting |
| --------- | ----- | ------ | ----- | --------- |
| `stars` | $x$ - `stars` count | $(200x)(2x+10000)^{-1}$ | $100$ | `50%` |

#### Forks
`forks` have a weighting of `30%` with a maximum score of 100

| Attribute | Input | Output | Asymptote | Weighting |
| --------- | ----- | ------ | ----- | --------- |
| `forks` | $x$ - `forks` count | $(600x)(6x+10000)^{-1}$ | $100$ | `30%` |

#### Watchers
`watchers` have a weighting of `20%` with a maximum score of 100

| Attribute | Input | Output | Asymptote | Weighting |
| --------- | ----- | ------ | ----- | --------- |
| `watchers` | $x$ - `watchers` count | $(200x)(2x+10000)^{-1}$ | $100$ | `20%` |

Examples:
* 8,651 `watchers` scores `94.546/100`
* The `50/100` score is awareded at 500 `watchers`

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