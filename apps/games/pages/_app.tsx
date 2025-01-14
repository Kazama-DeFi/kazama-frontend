import React, { Fragment } from 'react'
import { NextPage } from 'next'
import { PancakeTheme, ResetCSS, dark, light, ModalProvider, UIKitProvider } from '@kazamaswap/uikit'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { Provider as WrapBalancerProvider } from 'react-wrap-balancer'
import { LanguageProvider } from '@kazamaswap/localization'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { SEO } from 'next-seo.config'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

// Create a client
const queryClient = new QueryClient()

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const StyledThemeProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {props.children}
    </UIKitProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Flama;
  }
  html, body {
    height: 100%;
  }
  #__next {
    display: flex;
    flex-direction: column;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .swiper-grid-column .swiper-wrapper {
    flex-direction: unset !important;
  }
`
type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  /** render component without all layouts */
  pure?: true
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || Fragment

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1FC7D4" />
      </Head>
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NextThemeProvider>
            <StyledThemeProvider>
              <LanguageProvider>
                <ModalProvider>
                  <ResetCSS />
                  <GlobalStyle />
                  <Menu />
                  <Layout>
                    <WrapBalancerProvider>
                      <Component {...pageProps} />
                    </WrapBalancerProvider>
                  </Layout>
                  <Footer />
                </ModalProvider>
              </LanguageProvider>
            </StyledThemeProvider>
          </NextThemeProvider>
        </Hydrate>
      </QueryClientProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM}');
          `,
        }}
      />
    </>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
})
