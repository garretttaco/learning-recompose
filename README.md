# Learning Recompose

This project will help you learn how to use the [recompose](https://github.com/acdlite/recompose) library, following a workshop (exercise -> solution) format.

This repository was originally created for a [workshop event for PhoenixReactJS](https://www.meetup.com/Phoenix-ReactJS/events/241181068/), but now you can use it to take the workshop and learn recompose on your own time.

## Getting started

Clone this repository onto your computer.
```
$ git clone https://github.com/garretttaco/learning-recompose.git
```

In the project directory, run:
```
$ npm install
$ npm start
```

This will run the app in the development mode and will automatically open your browser to [http://localhost:3000](http://localhost:3000).

The page will reload if you make edits.<br>
You will also see any code errors directly in your browser.

In your browser you will see lessons, in order, that have both an exercise and the solution. Clicking on either, you will see that they should both work the same. This is because we have the same logic implemented in the exercise as the solution.
The only difference is, we implemented the solution using `Recompose`'s HoCs and the container/presentational component pattern (explained below).

If you look in the repository root, you will see that under `src/lessons/` we have the exercise in `exercise.js` and the solution in `solution.js`. Each exercise has instructions above the code explaining how you should tackle the lesson.
The solution, has the, you guessed it, solution to the exercise. Try not to look at it, unless you really get stuck on the exercise. Then once you're done, you can compare your implementation to the solution.
You know you have successfully finished the lesson when you have no class based components and the exercise works just like the solution.

## Introduction
Before we jump into recompose and all its glory, let us go over a few things.

### Buzzwords
- Functional composition: applying one function to the results of another
- Higher-order component (HoC): a function that takes a component and returns a new component
- Container component: A component that is concerned with how things work. Often stateful and tends to serve as a data source.
- Presentational component: A component that is concerned with how things look. Does not specify how the data is loaded or mutated. Receives data and callbacks exclusively via props.
- Stateless functional component: A pure function that receives props and returns JSX (mostly).

### What is the problem?
The core problem that React tries to solve is to build user interfaces more efficiently, with flexible, declarative and easy to maintain code.
With React, we got components and the HoC pattern. We know that this has been game changing for how we develop SPAs and user interfaces. So what's wrong?
The issue is that even though we have these wonderful components and can add functionality to them with HoCs, we still fall into bad practices: combining functionality with UI. (Other frameworks like Angular are more forceful in separation by using template files for the UI/markup.)
This makes our codebase more brittle and less reusable. Even if we follow the container/presentational component pattern, we can still declare functionality in the render method of our presentational component, which makes it less reusable. So how do we solve this problem? We want to utilize composition as much as possible.


### Why use Recompose?
Let's start with the meaning of Recompose
> to compose again, differently.

Again, differently is the key. How much composition can we add to our application?
As we go through these lessons, keep in mind that the point of converting classes to HoCs and stateless functional components is to get used to that pattern.
A guideline I recommend, is to place all JSX markup in a SFC with little to no functionality. By starting your components like this, you are enforcing a good pattern in your code base which will help you to avoid mixing concerns.
Once we start converting the components in our exercises, you might think to yourself, why would I be swapping working code out for other code that sometimes is even more verbose? The reason is because our code becomes more maintainable and reusable when it is composed.
Let's take a simple example like rendering a spinner. Without components, you would have to write out the surrounding HTML with a spin class, add the font icon or image then you would use your reusable css to make the magic happen.
Then we move to components. You can abstract all that into a component and only ever have to write that once. However, you still have to write the conditional logic of when to display that component in your class container component.
Enter Recompose. You can now reuse that logic too! One line of code (two with the import) and you have a spinner that reliably renders when it receives a prop called `loading` (for example).
Admittedly, sometimes on simple components, you will end up with more code than if you just used a class component. However, for larger components (we have all seen/written these) it is incredibly more reusable and maintainable to use this level of composition.

## Common Recompose HoC quirks and gotchas to be aware of
### `compose`
- Use to compose multiple HoCs into a single HoC.

`compose` invokes the given HoCs from right to left, or from the bottom up (if each HoC is on its own line). This is important to receive the props you expect.

`compose(CalledLast, CalledSecond, CalledFirst)(BaseComponent)`

### `branch`
- Accepts a test function and two higher-order components. The test function is passed the props from the owner. If it returns true, the left higher-order component is applied to BaseComponent; otherwise, the right higher-order component is applied. If the right is not supplied, it will by default render the wrapped component.

```
compose(
  branch(
  	props => !props.thisIsTrue,
  	ComponentWillNotRender,
  ),
)(ComponentWillBeRendered)
```

### `withHandlers`
Takes an object map of handler creators or a factory function. These are higher-order functions that accept a set of props and return a function handler
- `withHandlers` uses currying to access the props inside the handler when called. This can be confusing syntax at first, but you will get the hang of it.
- Sibling `withHandlers` can not be called from within the same `withHandlers` HoC. There is a [PR](https://github.com/acdlite/recompose/pull/401) for this fix which is not merged in (yet?).
```
withHandlers({
  increment: ({ setCounter }) => () => setCounter(n => n + 1),
  decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
  reset: ({ setCounter }) => () => setCounter(0)
})
```
- `lifecycle` is a class and the methods are bound to the component's `this` so you can access props by `this.props`.

### Handling propTypes on the stateless functional component
- Do not wrap the component with your enhance HoC while declaring propTypes with `MyComponent.propTypes =` syntax because you will incorrectly get propTypes errors. Instead create a SFC, add your propTypes and then wrap the component with the HoC.

Do this:
```
const AppComponent = () => (
  <div />
)

AppComponent.propTypes = {}

const App = enhance(AppComponent)
```

Not this:
```
const App = enhance(() => (
  <div />
))

App.propTypes = {}
```

## Resources
- https://github.com/acdlite/recompose/blob/master/docs/API.md
- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
- https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750


## Use of Create React App

This repository was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

Projects built with Create-React-App include support for ES6 syntax, as well as several unofficial / not-yet-final forms of Javascript syntax such as Class Properties and JSX.  See the list of [language features and polyfills supported by Create-React-App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills) for more information.

This repository, specifically, heavily uses ES6+ syntax. If you need a (re)fresher on ES6 syntax, checkout [this great JavaScript primer](https://github.com/ReactTraining/react-subjects/blob/master/JavaScriptPrimer.md)

## What did you think?
- Do you wish the exercises would cover even more functions from recompose?
- Did you think the examples were to easy? To hard?
- Do you think it helped you to learn better by having the exercise logic already complete and all you have to do is convert it to a recompose only solution?
- Would you like exercises that start with just the structure and you build up to the recompose solution without the already implemented class components?

## Want to contribute?

If you have any examples in mind for exercises, I would be more than happy to look them over and merge in a PR. Any contributions would be much appreciated.
