import { Locales } from "@turistikrota/ui"
import Calendar, { PriceRenderer } from "@turistikrota/ui/calendar"
import FormSection from "@turistikrota/ui/form/section"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { useListingCalendar } from "~/hooks/listing.calendar"
import { ListingPrice } from "~/types/listing"

type Props = {
    prices: ListingPrice[]
}

const ListingDetailCalendarSection : FC<Props> = ({
    prices
}) => {
    const { t, i18n } = useTranslation('listing')
    const calendarData = useListingCalendar(prices)
    return <section className="flex flex-col gap-2">
            <FormSection.Head className="border-transparent p-0">
            <FormSection.Head.Title className='text-lg font-semibold'>
                {t('sections.calendar.title')}
              </FormSection.Head.Title>
              <FormSection.Head.Subtitle>
              {t('sections.calendar.subtitle')}
              </FormSection.Head.Subtitle>
            </FormSection.Head>
        <Calendar<number>
        locale={i18n.language as Locales}
        textSelected={t('sections.calendar.selected')}
        textToday={t('sections.calendar.today')}
        data={calendarData}
        DetailRender={PriceRenderer}
        availableCalc={(date) => {
          const now = new Date()
          now.setHours(0, 0, 0, 0)
          if (date < now) return false
          return true
        }}
        variantCalc={() => {
          return 'primary'
        }}
      />
    </section>
}

export default ListingDetailCalendarSection