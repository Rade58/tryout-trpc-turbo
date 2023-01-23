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
      return "Shibatoshi";
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

// router and public procedure
const router = t.router;
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

// WE HAVE TWO ROUTES

export {};
