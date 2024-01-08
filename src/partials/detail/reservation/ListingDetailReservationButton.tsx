import Button from '@turistikrota/ui/button'
import Popup from '@turistikrota/ui/popup'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'
import FilterHead from '~/partials/filter/mobile/ListingMobileFilterPopupHead'
import ListingDetailReservationSection, { type Props as SectionProps } from './ListingDetailReservationSection'

const ListingDetailReservationButton: FC<SectionProps> = (props) => {
  const { t } = useTranslation('listing')
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div className='fixed bottom-0 left-0 w-full bg-blured p-4 shadow-lg backdrop-blur-md'>
        <Button onClick={() => setVisible(true)}>{t('sections.reservation.make')}</Button>
      </div>
      <Popup
        onClose={() => setVisible(false)}
        open={visible}
        size='2xl'
        head={
          <FilterHead.TitleSection>
            <FilterHead.Title>{t('sections.reservation.make')}</FilterHead.Title>
          </FilterHead.TitleSection>
        }
      >
        <ListingDetailReservationSection {...props} />
      </Popup>
    </>
  )
}

export default ListingDetailReservationButton
