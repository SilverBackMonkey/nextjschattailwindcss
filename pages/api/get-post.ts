// Fetch all posts (in /pages/api/posts.ts)
import prisma from "../../client";

export default async function handle(req, res) {
  try {
    const data = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    //console.log(data)
    res.status(200).json({ data: data });
  } finally {
    // await prisma.$disconnect();  removed as we now have a single connection
  }
}
