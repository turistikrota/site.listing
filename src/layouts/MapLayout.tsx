import { TooltipProvider } from '@turistikrota/ui/tooltip/provider'
import { FC } from 'react'
import { AccountProvider } from '~/hooks/account'
import { useSizeWithoutHeader } from '~/hooks/dom'
import OnlyMobileHeader from '~/partials/header/OnlyMobileHeader'
import { LayoutProps } from './layout.types'

const MapLayout: FC<React.PropsWithChildren<LayoutProps>> = ({ children, accessTokenIsExists, accountCookie }) => {
  const size = useSizeWithoutHeader()
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <main
        className='h-full'
        style={{
          minHeight: size,
        }}
      >
        <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}

export default MapLayout
