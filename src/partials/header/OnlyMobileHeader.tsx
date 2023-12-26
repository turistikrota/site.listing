import MobileHeader from '@turistikrota/ui/headers/mobile'
import TopHeader from '@turistikrota/ui/headers/top'
import Logo from '@turistikrota/ui/logo'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import HeaderLogo from '~/components/header/HeaderLogo'
import { getStaticRoute } from '~/static/page'

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
      <TopHeader>
        <TopHeader.Left>
          <Link
            href={getStaticRoute(i18n.language).base}
            className='hover:opacity-80 transition-all duration-200 ease-in-out'
          >
            {t('header.links.home')}
          </Link>
        </TopHeader.Left>
        <TopHeader.Right>
          <Link
            href={getStaticRoute(i18n.language).aboutUs}
            className='hover:opacity-80 transition-all duration-200 ease-in-out'
          >
            {t('header.links.aboutUs')}
          </Link>
        </TopHeader.Right>
      </TopHeader>

      <MobileHeader withTopHeader>
        <MobileHeader.Left>
          <HeaderLogo>
            <Logo width={186} height={30} />
          </HeaderLogo>
        </MobileHeader.Left>
        <MobileHeader.Fill className='hidden md:flex'>{``}</MobileHeader.Fill>
        <MobileHeader.Right>
          <AccountHeaderButton accessTokenIsExists={accessTokenIsExists} />
        </MobileHeader.Right>
      </MobileHeader>
    </>
  )
}
