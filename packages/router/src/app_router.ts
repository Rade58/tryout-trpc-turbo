import { EventEmitter } from "events";
import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

// similar concept of context like with graphql
const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // here we woud run prisma query for example
  // in order to get user for authentication
  // THIS FUNCTION WILL "SIMULATE", GETTING THE USER
  // FROM THE DATABASE
  async function getUser() {
    if (req.headers.authorization !== "Bearer abc1245699-sdfdsffd") {
      return null;
    } else {
      return { name: "Shibatoshi" };
    }
  }

  const user = await getUser();

  return {
    req,
    res,
    user,
  };
};

// context type
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// DEFINING OBJECTS
// THAT WILL BE USED FOR router and procedure CREATIONS
const router = t.router;
// PROCEDURE IS VERY FLEXIBILE PRIMITIVE TO CREATE BACKEND FUNCTIONS (THEY ARE REUSABLE)
// WE NEED TO LEARN MORA ABOUT PROCEDURES
// WE NEED TO LEARN IN FUTURE HOW TO DEFINE PROTECTED PROCEDURE
// BECAUSE THERE ARE TWO TYPES OF PROCEDURES
// PublicProcedure and Prtected Procedure

// THIS OBJECT WE WILL BE USING TO CREATE PROCEDURES
// PUBLIC PROCEDUR CAN BE VIEWED AS THE EQUIVALENT
// OF REST ENDPOINT

const publicProcedure = t.procedure;
//

// THIS CODE HERE SIMULATES DATBASE I GUESS
// I JUST DON'T KNOW RIGHT NOW, WHY EVENTS NEED TO BE EMMITED

let id = 0;

const ee = new EventEmitter();

// WE WILL HAVE TWO TYPES OF RECORDS IN THE DATBASE
//   Post      AND     Message
const db = {
  posts: [
    {
      id: ++id,
      title: "Hello shiba",
    },
  ],
  messages: [createMessage("Samoyed is here")],
};

function createMessage(text: string) {
  const msg = {
    id: ++id,
    text,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // AS I SAID, I DON'T NOW I AM EMMITING THIS MESSAGE HERE
  ee.emit("newMessage", msg);
  // BUT WE RE RETURNING MESSAGE OBJECT HERE
  return msg;
}

// WE HAVE TWO ROUTERS FOR TWO TYPES OF RECORDS WE HAVE IN OUR DATBASE
// ONE ROUTER FOR THE   Post     AND ONE ROUTER FOR THE    Message
// AND WE WILL CREATE PROCEDURES FOR THAAT ROUTERS

const messageRouter = router({
  // this is the public procedure with
  // input validation
  addMessage: publicProcedure.input(z.string()).mutation(({ input, ctx }) => {
    // JUST TO SHOW YOU WE HAVE ctx HERE AND IT IS POSSIBLE
    // TO ACCESS user SINCE WE DEFINE HANDLER FOR CONTEXT IN  TERMS
    // THAT IT CAN  user CAN BE INSERTED INSIDE
    const { user } = ctx;

    console.log({ user });

    const msg = createMessage(input);

    db.messages.push(msg);

    return msg;
  }),
  // this is a public procedure without any input validation
  listMessages: publicProcedure.query(() => db.messages),
});

// NO IDEA WHY IS HERE
const postRouter = router({
  // agin we have input validation
  createPost: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        id: ++id,
        ...input,
      };

      db.posts.push(post);
    }),
  listPosts: publicProcedure.query(() => db.posts),
});

// ---------------------------------------------------------------
// ---------------------------------------------------------------
//           -------------- root router -----------------

export const appRouter = router({
  // WE MERGE PREVIOUSLLY CREATED ROUTER
  post: postRouter,
  message: messageRouter,
  // SINCE WE ARE DEFINING ROUTER
  // WE CAN DEFINE INDIVIDUAL PROCEDURES,
  hello: publicProcedure.input(z.string().nullish()).query(({ ctx, input }) => {
    return `hello ${input ?? ctx.user?.name ?? "world"}`;
  }),
  // OR WE CAN INLINE ENTIRE ROUTER
  // AS YOU CAN SEE THIS ROUTER HAS A PROCEDURE
  // WHERE WE CHECK IS THERE A USER IN CONTEXT
  admin: router({
    secret: publicProcedure.query(({ ctx }) => {
      // AUTHENTICATION
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      // AUTHORIZATION
      if (ctx.user.name !== "Satoshi Nakamoto") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return {
        secret: "Buy crypto",
      };
    }),
  }),
});

//
export type AppRouter = typeof appRouter;
