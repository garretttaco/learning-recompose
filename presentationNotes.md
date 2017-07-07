### What is the problem?

### What is the solution?

### What is Recompose and how does it solve my problem?

### Buzzwords
- Functional composition: applying one function to the results of another
- Higher-order Component(HoC): a function that takes a component and returns a new component.
- Container component: A component that is concerned with how things work. Often stateful and tends to serve as a data source.
- Presentational component: A component that is concerned with how things look. Does not specify how the data is loaded or mutated. Receives data and callbacks exclusively via props. Rarely has state (can be a class component or stateless functional component).
- Stateless functional component: A pure function that receives props and returns JSX (mostly).


As we go through these examples, I want you to keep in mind that the point of us converting classes to HoCs and stateless functional components is to get used to that pattern.
Once we start converting these, you might think to yourself, why would I be swapping this code out of other code? The reason is because our code is always more maintainable and reusable when it is composed.
Lets take a simple example like rendering a spinner. Before using components, you would have to write out the surrounding HTML with a spin class, add the font icon or image then you would use your reusable css to make the magic happen.
The we move to components. You can abstract all that into a component and only ever have to write that once. However, you still have to write the conditional logic of when to display that component in your class container component.
Enter Recompose. You can now reuse that logic too! One line of code (two with the import) and you have a spinner that reliably renders when it receives a prop called `loading` for example.
I admit that sometimes on more simple components, you will end up with more code than if you just used a class component. However, for larger components (we have all seen/written these) it is incredibly more reusable and maintainable to use this level of composition.


I had a very hard time implementing the Container/Presentational component paradigm until Recompose. Recompose allowed me to write SFC component first React and not have to worry about rewriting my components to be Container components.


<!-- Reword -->
I have found that when using this pattern, I write more concise and clean JSX. When everything is passed as props I find that I follow better patterns that are more predictable and recognizable

## Common Recompose HoC quirks and gotchas I have run into
### `compose`
- `compose` consumes HoCs from the bottom up. This is important to receive the props you expect.

### `branch`
- `branch` checks a conditional and then renders the passed component if true or "waterfalls" to the next HoC if false.
- `branch` consumes a component and nothing else.
- `branch` excepts an if and else component to render, but I have not found a need or usecase for the second component. This is especially weird since you need to consume a component, which in this case would never get consumed if you have an if else on the branch.

### withHandlers
- `withHandlers` uses currying to access the props inside the function call. This can be confusing syntax at first, but you will get the hang of it.
- Sibling `withHandlers` can not be called from within the same `withHandlers` HoC. There is a PR for this fix which I believe is not merged in yet.

### lifecycle
- `lifecycle` supports any lifecycle methods expect for the render method.
- `lifecycle` is a class and the methods are bound to the component's `this` so you can access props by `this.props`.

- Do not wrap the component with your enhance HoC. If you do this while using `Component.propTypes` you will incorrectly get propTypes errors. Instead create a SFC, add your propTypes and then wrap the component with the HoC.
