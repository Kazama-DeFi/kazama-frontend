import { ModalProvider, light, dark, UIKitProvider } from '@kazamaswap/uikit'
import { LanguageProvider } from '@kazamaswap/localization'
import { AwgmiConfig } from '@kazamaswap/awgmi'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { client } from '../client'

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<React.PropsWithChildren<{ children: React.ReactNode }>> = ({ children }) => {
  return (
    <AwgmiConfig client={client}>
      <NextThemeProvider>
        <StyledUIKitProvider>
          <LanguageProvider>
            <ModalProvider>{children}</ModalProvider>
          </LanguageProvider>
        </StyledUIKitProvider>
      </NextThemeProvider>
    </AwgmiConfig>
  )
}

export default Providers
