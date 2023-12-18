import { TooltipProvider } from '@turistikrota/ui/tooltip/provider'
import { AccountProvider } from '~/hooks/account'
import { useSizeWithoutHeader } from '~/hooks/dom'
import OnlyMobileHeader from '~/partials/header/OnlyMobileHeader'

type Props = {
  accessTokenIsExists: boolean
  accountCookie: string
}

export default function MapLayout({ children, accessTokenIsExists, accountCookie }: React.PropsWithChildren<Props>) {
  const size = useSizeWithoutHeader()
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <main
        className='h-full'
        style={{
          minHeight: size,
        }}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}
