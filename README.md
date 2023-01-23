# Exploring tRPC

[tRPC docs](https://trpc.io/docs/)

[express server](https://github.com/trpc/trpc/blob/main/examples/express-server/src/server.ts)

# Idea is to put router (and other utilities) in the package

AND THEN WE CAN

- import module (primarly the router we build) and use it with our express app

- also we can import parts of same module in our client apps (other express app for example, andour react application), so clint can interact with api (**I THINK WE NEED AppRouter TYPE**)

# What to do on the client side

<https://trpc.io/docs/react#client-side>

you also need @trpc/server because it is a peer dependancy of @trpc/client

same case here 

>> @trpc/react-query provides a thin wrapper over @tanstack/react-query. It is required as a peer dependency.





