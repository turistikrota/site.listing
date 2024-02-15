import MobileHeader from '@turistikrota/ui/headers/mobile'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import ModernLogoProvider from './ModernLogo'

type Props = {
  accessTokenIsExists: boolean
}

const AccountHeaderButton = dynamic(() => import('./AccountHeaderButton'), {
  ssr: false,
})

export default function OnlyMobileHeader({ accessTokenIsExists }: Props) {
  const { t, i18n } = useTranslation('common')
  return (
    <>
      <MobileHeader defaultFixed>
        <MobileHeader.Left>
          <ModernLogoProvider />
        </MobileHeader.Left>
        <MobileHeader.Fill className='hidden md:flex'>{``}</MobileHeader.Fill>
        <MobileHeader.Right>
          <AccountHeaderButton accessTokenIsExists={accessTokenIsExists} />
        </MobileHeader.Right>
      </MobileHeader>
    </>
  )
}
