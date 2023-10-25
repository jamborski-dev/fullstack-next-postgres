import React from "react"
import { GetServerSideProps } from "next"
import { useSession, getSession } from "next-auth/react"
import Layout from "../components/shared/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { bookings: [] } }
  }

  const bookings = await prisma.booking.findMany({
    where: {
      user: { email: session.user.email }
    }
  })
  return {
    props: { bookings }
  }
}

type Props = {
  bookings: PostProps[]
}

const Bookings: React.FC<Props> = props => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <h1>My Bookings</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Bookings</h1>
        <main>
          {props.bookings.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Bookings
