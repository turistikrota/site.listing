import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { FC, useState } from 'react'
import ListingCardPriceSection from '~/components/listing/sections/ListingCardPriceSection'
import { useLocalizedFormatter } from '~/hooks/pricing'
import { ListingPrice, ListingValidation } from '~/types/listing'
import ListingDetailDateInput from './ListingDetailDateInput'
import ListingDetailPeopleInput from './ListingDetailPeopleInput'

type Props = {
  uuid: string
  startDate?: string
  endDate?: string
  adultQuery?: string
  kidQuery?: string
  babyQuery?: string
  prices: ListingPrice[]
  validation: ListingValidation
}

const ListingDetailReservationSection: FC<Props> = ({
  uuid,
  prices,
  validation,
  startDate,
  endDate,
  adultQuery,
  babyQuery,
  kidQuery
}) => {
  const [start, setStart] = useState<string | undefined>(startDate && !isNaN(Date.parse(startDate)) ? startDate : undefined)
  const [end, setEnd] = useState<string | undefined>(endDate && !isNaN(Date.parse(endDate)) ? endDate : undefined)
  const [adult, setAdult] = useState<number>(adultQuery && !isNaN(+adultQuery) ? +adultQuery : 1)
  const [kid, setKid] = useState<number>(kidQuery && !isNaN(+kidQuery) ? +kidQuery : 0)
  const [baby, setBaby] = useState<number>(babyQuery && !isNaN(+babyQuery) ? +babyQuery : 0)
  
  const localizedFormatter = useLocalizedFormatter()
  return <div className='flex flex-col gap-4'>
    <Alert type='warning' showIcon>
      <Alert.Title>Uyarı</Alert.Title>
      <Alert.Description>
        Rezervasyon oluşturmadan önce ilan kurallarını inceleyin ve bu ilanın size uygun olduğundan emin olun.
      </Alert.Description>
    </Alert>
  <ListingDetailDateInput startDate={start} endDate={end} onStartChange={setStart} onEndChange={setEnd} />
  <ListingDetailPeopleInput validation={validation} adult={adult} kid={kid} baby={baby} onAdultChange={setAdult} onKidChange={setKid} onBabyChange={setBaby} />
  <ListingCardPriceSection prices={prices} startDate={start} endDate={end}>
    <ListingCardPriceSection.Row label='Turistikrota Hizmetleri (10%)' text={localizedFormatter.format(3000)} />
    <hr />
    <ListingCardPriceSection.Row label='Toplam' text={localizedFormatter.format(23000)} />
  </ListingCardPriceSection>
  <Button>Rezerve Et</Button>
  </div>
}

export default ListingDetailReservationSection
