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
    if (req.headers.authorization !== "Bearer blhblahtrah") {
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

const router = t.router;

export {};
