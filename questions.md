## What is the difference between Component and PureComponent? Give an example where it might break my app.

PureComponent only rerenders if the shallow comparison of props results in a change, basically, it implements shouldComponent by shallow comparing props. On the other hand, the Component rerenders if the parent gets rerendered even if the props passed don't change.
Purecomponent can break if the props passed have nested objects or arrays.

And I haven't come across this, I guess it also breaks with context.

## Context + ShouldComponentUpdate might be dangerous. Why is that?

If the Context value is changed and the ShouldComponentUpdate results in false based on the compare function the component will not be updated and shows the false values.

## Describe 3 ways to pass information from a component to its PARENT.

1. Using Redux
2. By Passing callback function from parent to child component so that child component can call the callback and pass the required information. Example is passing setState functions from parent to child
3. Can also be done by using Context API, Redux should work in the similar appraoch
4. Another not-so-famous way would be using pub-sub

## Give 2 ways to prevent components from re-rendering.

1. Using React.memo
2. useMemo and useCallback also helps in preventing components from getting rerendered
3. Using ShouldComponentUpdate

## What is a fragment and why do we need it? Give an example where it might break my app.

Fragment helps in wrapping more than one react element and avoids the need to use an empty div for the same.
I am not too sure about this, never seen something like this. I am guessing this might be the case where we can not use Fragment in the list as Fragment doesn't take keys

## Give 3 examples of the HOC pattern.

1. Redux connect
2. NextJS WithAuth
3. React.memo

## What's the difference in handling exceptions in promises, callbacks and async...await?

With Promises exceptions can be handled by calling then, catch and finally methods returned by the Promise
With async await, exceptions can be handled by wrapping the await statement with try, catch, and finally
With Callbacks, exceptions can be handled through the arguments that will be passed to the callback

## How many arguments does setState take and why is it async.

setState takes two arguments, the first one can be either a object/value to be updated to or callback that will return the new value, and the second param is the callback which will be called after the state is updated.
setState is async because React batches multiple setStates, updates them together, and flushes the changes to DOM. This is done for Performance reasons, sync updates on setState are just not performant.

## List the steps needed to migrate a Class to Function Component.

Am not too sure on the exact steps as I have not written much of class components, but I'll still try to answer:

1. Transforming all the lifecycle methods to useEffect
2. Transforming class methods to functions inside the component
3. Transforming the render method to return statement
4. Removing the constructor and setting and creating the initial state using useState

## List a few ways styles can be used with components.

1. Normal plain CSS in a separate files and importing them in the component
2. Inline CSS
3. CSS-in-JS like Styled Components, Emotion
4. CSS Modules
5. Using SaSS SCSS Less by adding relevant loaders in the build process

## How to render an HTML string coming from the server.

One way would be to use it as dangerouslySetInnerHTML, other ways would be to use any parsing libraries.
