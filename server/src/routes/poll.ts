import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import ShortUniqueId from "short-unique-id";
import { authenticate } from "../plugins/authenticate";

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get("/polls/count", async () => {
    const count = await prisma.poll.count();

    return { count };
  });

  fastify.post("/polls", async (req, res) => {
    const createPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createPoolBody.parse(req.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    try {
      await req.jwtVerify();

      await prisma.poll.create({
        data: {
          title,
          code,
          ownerId: req.user.sub,

          participants: {
            create: {
              userId: req.user.sub,
            },
          },
        },
      });
    } catch {
      await prisma.poll.create({
        data: {
          title,
          code,
        },
      });
    }

    return res.status(201).send({ code });
  });

  fastify.post(
    "/polls/:id/join",
    {
      onRequest: [authenticate],
    },
    (req, reply) => {}
  );
}
