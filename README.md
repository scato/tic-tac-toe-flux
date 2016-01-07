Tic-Tac-Toe Flux
================

This repository is a demonstration of what I call Hexagonal Flux. This is a combination of the principles of Hexagonal Architecture:

> Create your application to work without either a UI or a database so you can run automated regression-tests against the application, work when the database becomes unavailable, and link applications together without any user involvement.

And the principles of the Flux Architecture:

> When a user interacts with a React view, the view propagates an action through a central dispatcher, to the various stores that hold the application's data and business logic, which updates all of the views that are affected. (...) Stores have no direct setter methods like `setAsRead()`, but instead have only a single way of getting new data into their self-contained world - the callback they register with the dispatcher.

This does not only work with graphic user interfaces, but with command line interfaces as well.

License
-------

Everything in this repo is MIT License unless otherwise specified.

MIT © Scato Eggen.

Further Reading
---------------

- [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal+architecture)
- [Flux Architecture](https://facebook.github.io/flux/docs/overview.html)
