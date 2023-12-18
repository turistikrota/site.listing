import { TooltipProvider } from '@turistikrota/ui/tooltip/provider'
import { AccountProvider } from '~/hooks/account'
import OnlyMobileHeader from '~/partials/header/OnlyMobileHeader'

type Props = {
  accessTokenIsExists: boolean
  accountCookie: string
}

export default function DefaultLayout({
  children,
  accessTokenIsExists,
  accountCookie,
}: React.PropsWithChildren<Props>) {
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <main>
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}
