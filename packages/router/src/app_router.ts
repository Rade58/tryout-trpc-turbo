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

// DEFINING router and public procedure
const router = t.router;
// PROCEDURE IS VERY FLEXIBILE PRIMITIVE TO CREATE BACKEND FUNCTIONS (THEY ARE REUSABLE)
// WE NEED TO LEARN MORA ABOUT PROCEDURES
// WE NEED TO LEARN IN FUTURE HOW TO DEFINE PROTECTED PROCEDURE
// BECAUSE THERE ARE TWO TYPES OF PROCEDURES
// PublicProcedure and Prtected Procedure

// THIS PROCEDURE WE WILL BE USES AS PUBLIC
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

// WE HAVE TWO ROUTES FOR TWO TYPES OF RECORDS WE HAVE IN OUR DATBASE
// ONE ROUTER FOR THE   Post     AND ONE ROUTER FOR THE    Message

export {};
