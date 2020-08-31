# Async Functions

JS will "run to completion," meaning it'll always continue until the function is completed. If you called information from another service within a normal function, you'd pause the entire program to do so. Which, if that's all your program did, that'd be fine, but if you were attempting to load a bunch of movie titles while something else happened, you'd need to set them up as AJAX requests. Which are Asynchronous JavaScript and XML. That would go out and make a reqest, allowing the rest of your JavaScript to continue, allowing events to fire, and so on.

But, to handle the responses, those requests needed callback functions. Bits of code that were declared earlier on that are available to handle the server's response data when it does come back. While useful, many reuqests would result in many callbacks and if one call depended on another, or the entire page depended on it, you'd be stuck putting your whole application in a callback.

When Promises are used, it gives exit points, or special return keywords `resolve` and `reject`. Those are declared within the Promise, allowing you to keep your code a little easier to read, and allowing you to chain promises together with `then()` and `finally()` methods. You can create a number of promises and execute them all with the `all()` method as well. That `Promise.all([promise1, promise2, promise3]).then((values) => { console.log(values) }` arrangement allows you to receive a series of results from those promises as an array.

But when doing this, you still end up with a bunch of `then` chained together. And this where `async` and `await` come into play. To further simplify these processes of dealing with Asynchronous JavaScript calls.

## Promises

## Async/Await

## Generators
