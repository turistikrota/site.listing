import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { FC, useState } from 'react'
import ListingCardPriceSection from '~/components/listing/sections/ListingCardPriceSection'
import { useLocalizedFormatter } from '~/hooks/pricing'
import { ListingPrice } from '~/types/listing'
import ListingDetailDateInput from './ListingDetailDateInput'

type Props = {
  uuid: string
  startDate?: string
  endDate?: string
  prices: ListingPrice[]
}

const ListingDetailReservationSection: FC<Props> = ({
  uuid,
  prices,
  startDate,
  endDate
}) => {
  const [start, setStart] = useState<string | undefined>(startDate && !isNaN(Date.parse(startDate)) ? startDate : undefined)
  const [end, setEnd] = useState<string | undefined>(endDate && !isNaN(Date.parse(endDate)) ? endDate : undefined)
  const localizedFormatter = useLocalizedFormatter()
  return <div className='flex flex-col gap-2'>
    <Alert type='warning' showIcon>
      <Alert.Title>Uyarı</Alert.Title>
      <Alert.Description>
        Rezervasyon oluşturmadan önce ilan kurallarını inceleyin ve bu ilanın size uygun olduğundan emin olun.
      </Alert.Description>
    </Alert>
  <ListingDetailDateInput startDate={start} endDate={end} onStartChange={setStart} onEndChange={setEnd} />
  <ListingCardPriceSection prices={prices} startDate={start} endDate={end}>
    <ListingCardPriceSection.Row label='Turistikrota Hizmetleri (10%)' text={localizedFormatter.format(3000)} />
    <hr />
    <ListingCardPriceSection.Row label='Toplam' text={localizedFormatter.format(23000)} />
  </ListingCardPriceSection>
  <Button>Rezerve Et</Button>
  </div>
}

export default ListingDetailReservationSection
