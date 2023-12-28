import MobileHeader from '@turistikrota/ui/headers/mobile'
import { setDefaultImageSrc, useImageSrc } from '@turistikrota/ui/hooks/image'
import UserName from '@turistikrota/ui/username'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { Config } from '~/config'
import { AccountListItem, useAccount } from '~/hooks/account'
import { getStaticRoute } from '~/static/page'
import { getAccountRedirectUrl, getRedirectUrl } from '~/utils/auth'

setDefaultImageSrc(Config.cdn.notFound)

type Props = {
  accessTokenIsExists: boolean
}

const ProfileButton = ({ account }: { account: AccountListItem }) => {
  const { src, onError } = useImageSrc(account.avatarUrl)
  const { t, i18n } = useTranslation('common')
  return (
    <Link
      href={getStaticRoute(i18n.language).account.details}
      aria-label={t('header.button.profile')}
      title={t('header.button.profile')}
    >
      <div className='group relative flex flex-row items-center space-x-1 rounded-md transition-colors duration-200 ease-in-out dark:hover:bg-third md:px-3 md:hover:bg-second'>
        <div className='flex h-12 w-12 flex-col items-end justify-center rounded-full md:items-center'>
          <MobileHeader.Avatar>
            <Image
              src={src}
              onError={onError}
              className='h-full rounded-md object-cover'
              width={48}
              height={48}
              alt={account.fullName}
              title={account.fullName}
            />
          </MobileHeader.Avatar>
        </div>
        <div className='hidden flex-col items-start justify-center md:flex'>
          <UserName>{account.userName}</UserName>
        </div>
      </div>
    </Link>
  )
}

const LoginButton = () => {
  const { t, i18n } = useTranslation('common')
  return (
    <Link href={getRedirectUrl(i18n.language, window.location.href)} passHref={true}>
      <MobileHeader.Button ariaLabel={t('header.button.login')} title={t('header.button.login')}>
        <i className='bx bx-user'></i>
      </MobileHeader.Button>
    </Link>
  )
}

const LoadingButton = () => {
  const { t } = useTranslation('common')
  return (
    <MobileHeader.Button ariaLabel={t('header.button.loading')} title={t('header.button.loading')}>
      <i className='bx bx-loader-alt bx-spin'></i>
    </MobileHeader.Button>
  )
}

const SelectProfileButton = () => {
  const { t, i18n } = useTranslation('common')
  return (
    <Link
      href={getAccountRedirectUrl(i18n.language, window.location.href)}
      passHref={true}
      className='rounded-md px-3 py-3 transition-colors duration-200 ease-in-out hover:bg-second dark:hover:bg-third'
      aria-label={t('header.links.selectAccount')}
      title={t('header.links.selectAccount')}
    >
      {t('header.links.selectAccount')}
    </Link>
  )
}

export default function AccountHeaderButton({ accessTokenIsExists }: Props) {
  const { loading, current } = useAccount()

  if (loading) return <LoadingButton />
  if (accessTokenIsExists && current === undefined) return <SelectProfileButton />
  if (current === undefined) return <LoginButton />
  return <ProfileButton account={current} />
}
