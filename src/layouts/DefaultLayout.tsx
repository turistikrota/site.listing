import { TooltipProvider } from '@turistikrota/ui/tooltip/provider'
import { FC } from 'react'
import { AccountProvider } from '~/hooks/account'
import OnlyMobileHeader from '~/partials/header/OnlyMobileHeader'
import { LayoutProps } from './layout.types'

const DefaultLayout: FC<React.PropsWithChildren<LayoutProps>> = ({ children, accessTokenIsExists, accountCookie }) => {
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <main>
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}

export default DefaultLayout
