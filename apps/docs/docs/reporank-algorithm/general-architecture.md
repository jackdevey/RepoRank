---
sidebar_position: 1
---
# General Architecture

The algorithm is split into components with each component being an individual aspect of the repository to analyse, increasing the
modularity of the algorithm. Each component is assigned a weighting, which is a percentage that affects the power the component has
in defining the final score.

Each component can be further broken down into sub-components which often analyse a metric directly, these are also weighted to alter
their power in the output of their 'parent' component.

The final score and output of the algorithm is derived from the summation of the weighted output from every component, in the format
of a percentage, with 100% being the highest score.