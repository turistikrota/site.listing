import DefaultCard from '@turistikrota/ui/cards/default'
import FormSection from '@turistikrota/ui/form/section'
import { TFunction, useTranslation } from 'next-i18next'
import { FC, useMemo } from 'react'
import KeyValue from '~/components/KeyValue'
import { ListingValidation, ValidationKey } from '~/types/listing'

type Props = {
  validation: ListingValidation
}

type Item = {
  label: string
  value: string
  isBool?: boolean
  orgValue?: number | boolean
}

type Mixer = (t: TFunction, value: number | boolean) => string

const RuleMixers: Record<ValidationKey, Mixer> = {
  minAdult: (t, value) => t('rules.adult', { value }),
  maxAdult: (t, value) => t('rules.adult', { value }),
  minKid: (t, value) => t('rules.kid', { value }),
  maxKid: (t, value) => t('rules.kid', { value }),
  minBaby: (t, value) => t('rules.baby', { value }),
  maxBaby: (t, value) => t('rules.baby', { value }),
  minDate: (t, value) => t('rules.date', { value }),
  maxDate: (t, value) => t('rules.date', { value }),
  onlyFamily: (t, value) => (value ? t('rules.yes') : t('rules.no')),
  noPet: (t, value) => (value ? t('rules.yes') : t('rules.no')),
  noSmoke: (t, value) => (value ? t('rules.yes') : t('rules.no')),
  noAlcohol: (t, value) => (value ? t('rules.yes') : t('rules.no')),
  noParty: (t, value) => (value ? t('rules.yes') : t('rules.no')),
  noUnmarried: (t, value) => (value ? t('rules.yes') : t('rules.no')),
  noGuest: (t, value) => (value ? t('rules.yes') : t('rules.no')),
}

const ListingDetailValidationSection: FC<Props> = ({ validation }) => {
  const { t } = useTranslation('listing')

  const items: Item[] = useMemo(
    () =>
      Object.entries(validation).map(([key, value]) => ({
        label:
          typeof value === 'boolean' || key.startsWith('no')
            ? t(`form.validation.${key}.title`)
            : t(`form.validation.${key}`),
        value: RuleMixers[key as ValidationKey](t, value),
        orgValue: value,
        isBool: typeof value === 'boolean' || key.startsWith('no'),
      })),
    [t, validation],
  )

  return (
    <section className='flex flex-col gap-2'>
      <FormSection.Head className='border-transparent !p-0'>
        <FormSection.Head.Title className='text-lg font-semibold'>{t('sections.rules.title')}</FormSection.Head.Title>
        <FormSection.Head.Subtitle>{t('sections.rules.subtitle')}</FormSection.Head.Subtitle>
      </FormSection.Head>
      <div className='grid grid-cols-12 gap-2'>
        {items.map((item, idx) => (
          <DefaultCard key={idx} className='col-span-12 md:col-span-6'>
            <KeyValue>
              <KeyValue.Item
                label={item.label}
                value={item.value}
                reversed
                valueClassName={
                  item.isBool
                    ? item.orgValue
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                    : ''
                }
              />
            </KeyValue>
          </DefaultCard>
        ))}
      </div>
    </section>
  )
}

export default ListingDetailValidationSection
