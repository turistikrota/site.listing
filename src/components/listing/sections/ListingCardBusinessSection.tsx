import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FC } from 'react'
import { makeBusinessAvatar } from '~/utils/cdn'

type Props = {
  nickName: string
}

const ListingCardBusinessSection: FC<Props> = ({ nickName }) => {
  const { t } = useTranslation('listing')
  return (
    <div className='col-span-6 flex items-center justify-start gap-2 overflow-hidden text-ellipsis'>
      <Image
        src={makeBusinessAvatar(nickName)}
        alt={nickName}
        width={32}
        height={32}
        className='h-9 w-9 rounded-md bg-second object-cover'
      />
      <div className='flex flex-col overflow-hidden text-ellipsis'>
        <div className='overflow-hidden text-ellipsis text-sm font-bold'>~{nickName}</div>
        <div className='text-xs'>{t('words.from-business')}</div>
      </div>
    </div>
  )
}

export default ListingCardBusinessSection
