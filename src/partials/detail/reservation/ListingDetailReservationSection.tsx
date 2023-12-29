import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { FC, useEffect, useState } from 'react'
import ListingCardPriceSection from '~/components/listing/sections/ListingCardPriceSection'
import { useListingDetailPusher } from '~/hooks/listing-pusher'
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
  const [adult, setAdult] = useState<number>(adultQuery && !isNaN(+adultQuery) && validation.minAdult <= +adultQuery && +adultQuery <= validation.maxAdult ? +adultQuery : 0)
  const [kid, setKid] = useState<number>(kidQuery && !isNaN(+kidQuery) && validation.minKid <= +kidQuery && +kidQuery <= validation.maxKid ? +kidQuery : 0)
  const [baby, setBaby] = useState<number>(babyQuery && !isNaN(+babyQuery) && validation.minBaby <= +babyQuery && +babyQuery <= validation.maxBaby ? +babyQuery : 0)
  const pusher = useListingDetailPusher()

  const localizedFormatter = useLocalizedFormatter()

  useEffect(() => {
    pusher({
      start,
      end,
      adult,
      kid,
      baby
    })
  }, [start, end, adult, kid, baby])

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
  <Button size='lg'>Rezerve Et</Button>
  <div className='flex justify-between gap-2'>
    <Button variant='secondary'>Neden Turistikrota?</Button>
    <Button variant='glass'>Süreç Nasıl İşliyor?</Button>
  </div>
  </div>
}

export default ListingDetailReservationSection
