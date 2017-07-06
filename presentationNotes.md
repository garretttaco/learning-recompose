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
