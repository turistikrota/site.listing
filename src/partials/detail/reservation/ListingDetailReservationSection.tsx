import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import ErrorText from '@turistikrota/ui/text/error'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ListingCardPriceSection from '~/components/listing/sections/ListingCardPriceSection'
import { useBookingPriceCalc } from '~/hooks/booking-price.calculator'
import { useBookingCreator } from '~/hooks/booking.creator'
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
  kidQuery,
}) => {
  const { t } = useTranslation('listing')
  const [start, setStart] = useState<string | undefined>(
    startDate && !isNaN(Date.parse(startDate)) ? startDate : undefined,
  )
  const [end, setEnd] = useState<string | undefined>(endDate && !isNaN(Date.parse(endDate)) ? endDate : undefined)
  const [adult, setAdult] = useState<number>(
    adultQuery && !isNaN(+adultQuery) && validation.minAdult <= +adultQuery && +adultQuery <= validation.maxAdult
      ? +adultQuery
      : 0,
  )
  const [kid, setKid] = useState<number>(
    kidQuery && !isNaN(+kidQuery) && validation.minKid <= +kidQuery && +kidQuery <= validation.maxKid ? +kidQuery : 0,
  )
  const [baby, setBaby] = useState<number>(
    babyQuery && !isNaN(+babyQuery) && validation.minBaby <= +babyQuery && +babyQuery <= validation.maxBaby
      ? +babyQuery
      : 0,
  )
  const pricing = useBookingPriceCalc(prices, start, end)
  const creator = useBookingCreator(uuid, start, end)
  const pusher = useListingDetailPusher()

  const localizedFormatter = useLocalizedFormatter()

  useEffect(() => {
    pusher({
      start,
      end,
      adult,
      kid,
      baby,
    })
  }, [start, end, adult, kid, baby])

  return (
    <div className='flex flex-col gap-4'>
      <Alert type='warning' showIcon>
        <Alert.Title>{t('sections.reservation.warning.title')}</Alert.Title>
        <Alert.Description>{t('sections.reservation.warning.description')}</Alert.Description>
      </Alert>
      <ListingDetailDateInput startDate={start} endDate={end} onStartChange={setStart} onEndChange={setEnd} />
      <ListingDetailPeopleInput
        validation={validation}
        adult={adult}
        kid={kid}
        baby={baby}
        onAdultChange={setAdult}
        onKidChange={setKid}
        onBabyChange={setBaby}
      />
      <ListingCardPriceSection prices={prices} startDate={start} endDate={end} withComission={false}>
        <ListingCardPriceSection.Row
          label={t('sections.reservation.ourServices', {
            rate: pricing.cimissionRate * 100,
          })}
          text={localizedFormatter.format(pricing.comission)}
        />
        <hr />
        <ListingCardPriceSection.Row
          label={t('sections.reservation.total')}
          text={localizedFormatter.format(pricing.total)}
        />
      </ListingCardPriceSection>
      <Button
        size='lg'
        disabled={creator.disabled}
        className={creator.disabled ? 'flex items-center justify-center gap-2' : ''}
        onClick={creator.submit}
      >
        {creator.loading && <i className='bx bx-loader-alt bx-spin' />}
        {t('sections.reservation.make')}
      </Button>
      {creator.error && <ErrorText>{creator.error}</ErrorText>}
      <div className='flex justify-between gap-2'>
        <Button variant='secondary'>{t('sections.reservation.whyUs')}</Button>
        <Button variant='glass'>{t('sections.reservation.howProcess')}</Button>
      </div>
    </div>
  )
}

export default ListingDetailReservationSection
