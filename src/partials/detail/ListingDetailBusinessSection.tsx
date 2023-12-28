import Button from '@turistikrota/ui/button'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'
import { makeBusinessAvatar } from '~/utils/cdn'

type Props = {
  nickName: string
}

const ListingDetailBusinessSection: FC<Props> = ({ nickName }) => {
  const { t } = useTranslation('listing')
  return (
    <section className='flex items-center justify-between gap-2 overflow-hidden text-ellipsis'>
      <div className='flex items-center justify-start gap-2 overflow-hidden text-ellipsis'>
        <Image
          src={makeBusinessAvatar(nickName)}
          alt={nickName}
          width={32}
          height={32}
          className='h-12 w-12 min-w-max rounded-md bg-second object-cover'
        />
        <div className='flex flex-col overflow-hidden text-ellipsis'>
          <div className='overflow-hidden text-ellipsis text-base font-bold'>~{nickName}</div>
          <div className='text-sm'>{t('words.from-business')}</div>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        <Button size='sm' variant='secondary' className='flex items-center justify-center gap-2' block={false}>
          <i className='bx bx-link-external text-lg'></i>
          {t('business.see-profile')}
        </Button>
      </div>
    </section>
  )
}

export default ListingDetailBusinessSection
