import { useRouter } from 'next/router'
import { NotFound, Box } from '@kazamaswap/uikit'
import ArticleInfo from 'components/Article/SingleArticle/ArticleInfo'
import HowItWork from 'components/Article/SingleArticle/HowItWork'
import SimilarArticles from 'components/Article/SingleArticle/SimilarArticles'
import { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getArticle, getSingleArticle } from 'hooks/getArticle'
import PageMeta from 'components/PageMeta'
import { filterTagArray } from 'utils/filterTagArray'
import { NextSeo } from 'next-seo'
import { dehydrate, Hydrate, QueryClient } from '@tanstack/react-query'
import Link from 'next/link'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = (async ({ params, previewData }) => {
  const queryClient = new QueryClient()

  if (!params)
    return {
      redirect: {
        permanent: false,
        statusCode: 404,
        destination: '/404',
      },
    }

  const { slug } = params
  const isPreviewMode = (previewData as any)?.slug

  let name: any = { $notIn: filterTagArray }
  if (isPreviewMode) {
    name = { $eq: 'Preview' }
  }

  const article = await queryClient.fetchQuery(['/article'], () =>
    getSingleArticle({
      url: `/slugify/slugs/article/${slug}`,
      urlParamsObject: {
        populate: 'categories,image',
        locale: 'all',
        filters: {
          categories: {
            name,
          },
        },
      },
    }),
  )

  const similarArticles = await queryClient.fetchQuery(['/similarArticles'], () =>
    getArticle({
      url: '/articles',
      urlParamsObject: {
        locale: article.locale,
        sort: 'createAt:desc',
        populate: 'categories,image',
        pagination: { limit: 6 },
        filters: {
          id: {
            $not: article.id,
          },
          categories: {
            $or: article.categories.map((category) => ({
              name: {
                $eq: category,
              },
            })),
          },
        },
      },
    }).then((result) => result.data),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      fallback: {
        '/article': article,
        '/similarArticles': similarArticles,
        isPreviewMode: !!isPreviewMode,
      },
    },
    revalidate: 60,
  }
}) satisfies GetStaticProps

const ArticlePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ fallback, dehydratedState }) => {
  const router = useRouter()
  if (!router.isFallback && !fallback?.['/article']?.title) {
    return (
      <NotFound LinkComp={Link}>
        <NextSeo title="404" />
      </NotFound>
    )
  }

  const { title, description, imgUrl } = fallback['/article']

  return (
    <>
      <PageMeta title={title} description={description} imgUrl={imgUrl} />
      <Hydrate state={dehydratedState}>
        <Box>
          <ArticleInfo />
          {!fallback.isPreviewMode && (
            <>
              <HowItWork />
              <SimilarArticles />
            </>
          )}
        </Box>
      </Hydrate>
    </>
  )
}

export default ArticlePage
