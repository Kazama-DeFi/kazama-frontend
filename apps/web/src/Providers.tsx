import { ModalProvider, light, dark, UIKitProvider } from '@kazamaswap/uikit'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { LanguageProvider } from '@kazamaswap/localization'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from 'utils/wagmi'
import { HistoryManagerProvider } from 'contexts/HistoryContext'

// Create a client
const queryClient = new QueryClient()

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<
  React.PropsWithChildren<{ store: Store; children: React.ReactNode; dehydratedState: any }>
> = ({ children, store, dehydratedState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <WagmiConfig config={wagmiConfig}>
          <Provider store={store}>
            <NextThemeProvider>
              <StyledUIKitProvider>
                <LanguageProvider>
                  <SWRConfig
                    value={{
                      use: [fetchStatusMiddleware],
                    }}
                  >
                    <HistoryManagerProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </HistoryManagerProvider>
                  </SWRConfig>
                </LanguageProvider>
              </StyledUIKitProvider>
            </NextThemeProvider>
          </Provider>
        </WagmiConfig>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default Providers
