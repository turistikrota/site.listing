import ModernLogo, { LinkComponent } from '@turistikrota/ui/logo/modern'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

const LogoLink: LinkComponent = ({ href, children, target }) => {
  return (
    <Link href={href} target={target}>
      {children}
    </Link>
  )
}

const ModernLogoProvider: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className='flex gap-1'>
      <ModernLogo
        LinkComponent={LogoLink}
        items={[
          { text: 'turistik', variant: 'secondary' },
          { text: 'rota', variant: 'primary' },
        ]}
        link={t('header.sites.main.link')}
        main
        openNewTab
      />
      <ModernLogo
        LinkComponent={LogoLink}
        active
        items={[{ text: t('header.sites.listing.title'), variant: 'primary' }]}
        link={t('header.sites.listing.link')}
      />
      <ModernLogo
        LinkComponent={LogoLink}
        items={[{ text: t('header.sites.places.title'), variant: 'primary' }]}
        link={t('header.sites.places.link')}
        openNewTab
      />
    </div>
  )
}

export default ModernLogoProvider
