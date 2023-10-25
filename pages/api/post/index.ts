// import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body

    const session = await getServerSession(req, res, authOptions)
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } }
      }
    })
    res.json(result)
  } else {
    res.status(405).json({ message: "Only POST requests allowed" })
  }
}
