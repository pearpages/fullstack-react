# Components

## Single Responsibility Principle

Think about components as you would functions or objects. The single responsibility principle20 applies. A component should, ideally, only be responsible for one piece of functionality.

Not only does this separation of responsibilities keep components simple, but it often also improves their re-usability.

## How to build components

1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live 5. Hard-code initial states
6. Add inverse data flow
7. Add server communication