import { Swiper, SwiperSlide } from 'swiper/react'
import { Flex } from '@kazamaswap/uikit'
import BlogCard from 'components/BlogCard'
import { useTranslation } from '@kazamaswap/localization'
import { Autoplay } from 'swiper/modules'
import ArticleView from 'components/Article/ArticleView'
import NextLink from 'next/link'
import MoreButton from 'components/MoreButton'
import { ArticleDataType } from 'utils/transformArticle'
import 'swiper/css/bundle'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'

const SimilarArticles = () => {
  const { t } = useTranslation()
  const { data: similarArticles } = useQuery<ArticleDataType[]>(['/similarArticles'], { enabled: false })

  return (
    <Flex maxWidth="100%" m="50px auto" flexDirection="column">
      {similarArticles && similarArticles?.length > 0 && (
        <Flex justifyContent="center">
          <ArticleView title={t('You might also like')}>
            <Swiper
              loop
              resizeObserver
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                920: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
              }}
            >
              {similarArticles?.map((article) => (
                <SwiperSlide key={article.id}>
                  <NextLink passHref href={`/articles/${article?.slug}`}>
                    <BlogCard
                      margin="auto"
                      padding={['0', '0', '18.5px']}
                      imgHeight={['200px']}
                      article={article}
                      imgUrl={article.imgUrl}
                    />
                  </NextLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </ArticleView>
        </Flex>
      )}
      <MoreButton />
    </Flex>
  )
}

export default dynamic(() => Promise.resolve(SimilarArticles), {
  ssr: false,
})
