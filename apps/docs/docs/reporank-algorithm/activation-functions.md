---
sidebar_position: 2
---
# Activation Functions

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