# learning-recompose
**Disclaimer: This is a work in progress**

 Before we jump into recompose and all its glory, let us start with a little (re)fresher. Let's start with the meaning of Recompose
> to compose again, differently.

What does that mean? Compose? What does that mean? Let's find out.

### Composition is a beautiful thing. Let's learn why.

Dan Abramov explains [here](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) why we should be using composition over inheritance. He explains how composition gives us a lot of freedom and reusability. How is this better than inheritance?
Let's ask Facebook https://facebook.github.io/react/docs/composition-vs-inheritance.html. I like the part where they say
> "At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies."
That is right, not even one use case out of thousands of components, by the creators of the library. Well, why is that? Because composition allows you to do _everything_ that you can do with inheritance from a functional approach. This architecture allows your code to be more flexible, extendable, and maintainable.

### What can we do with composition?
Not sold yet? Well, the first thing we can do is use the modern paradigm of the container and presentational components.

**Container**
The basic idea is that you have a container which handles business logic, data fetching, data manipulation, state management and lifecycle hooks. These actions are the sole purpose of the container. It then passes all this functionality and data down to its children to be manipulated further or displayed on the UI. The children can be more container components and presentational components.

**Presentational**
Now the presentational components are concerned with how things look. They have JSX/DOMmarkup and styles to display on the UI. All data and functionality that flows through this component are all passed in as props. Some believe that you can have a presentational component that manages UI state and that is a stateful functional or classical component.
You can read more about the pseudo specifications for container/presentational components and their perks, below.

https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
https://gist.github.com/chantastic/fc9e3853464dffdb1e3c

