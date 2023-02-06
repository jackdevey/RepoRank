---
sidebar_position: 3
---

# Components

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