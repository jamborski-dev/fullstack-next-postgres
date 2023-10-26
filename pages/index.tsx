import React, { FC } from "react"
import Layout from "../components/shared/Layout"
// import { GetStaticProps } from "next"
// import Post, { PostProps } from "../components/Post"
// import prisma from "../lib/prisma"

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = await prisma.booking.findMany()
//   return {
//     props: { feed },
//     revalidate: 10
//   }
// }

type Props = {
  // feed: PostProps[]
}

const IndexPage: FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {/* {props.feed.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))} */}
        </main>
      </div>
    </Layout>
  )
}

export default IndexPage
