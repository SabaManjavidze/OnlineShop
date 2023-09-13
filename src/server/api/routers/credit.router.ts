import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const creditRouter = createTRPCRouter({
  getUserCredits: protectedProcedure.query(async ({ ctx: { session } }) => {
    const user
  })
})
