import { GetServerSideProps } from "next"
import Head from 'next/head'
import { getSession } from "next-auth/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"

import Styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={Styles.container}>
        <article className={Styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={Styles.postContent} 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const {slug} = params

  console.log(session)

  if(!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('p', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post,
    }
  }
}