# learning-recompose
**Disclaimer: This is a work in progress**

### Composition is a beautiful thing. Let's learn why.

Dan Abramov explains [here](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) why we should be using composition over inheritance. He explains how composition gives us a lot of freadom and reusability. How is this better than inheritance? 
Lets ask Facebook https://facebook.github.io/react/docs/composition-vs-inheritance.html. I like the part where they say 
> "At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies."

### What can we do with composition? 
Well the first thing we can do is use the popular paradigm of container and presentational components. There are a lot of different opinions on how this looks. Since presentational components are where I put my JSX, should I never have JSX in my container component? If so, then how do I call my presentational component from my container? It seems like a lot of people are avoiding container components because they think they're bad. This is not true at all.  Here are a couple of good articles that explain the perks of container/presentational components and when it makes sense to use either one.

https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
https://gist.github.com/chantastic/fc9e3853464dffdb1e3c) 

