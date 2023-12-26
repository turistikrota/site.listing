import RadioGroup from '@turistikrota/ui/form/radio/group'
import Popup from '@turistikrota/ui/popup'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { useListingSort } from '~/hooks/listing-sort'
import { ListingOrder, ListingSort } from '~/types/listing.filter'
import FilterHead from './ListingMobileFilterPopupHead'

type Props = {
  onClose: () => void
  open: boolean
}

type SortSectionProps = {
  selected?: ListingSort
  onSelect: (sort: ListingSort) => void
}

type OrderSectionProps = {
  selected?: ListingOrder
  onSelect: (order: ListingOrder) => void
}

const SortSection: React.FC<SortSectionProps> = ({ selected, onSelect }) => {
  const { defaultSort, sorts } = useListingSort()
  const [currentSort, setCurrentSort] = useState<ListingSort>(defaultSort)
  const { t } = useTranslation('sort')

  useEffect(() => {
    setCurrentSort(selected ?? defaultSort)
  }, [selected])

  return (
    <RadioGroup
      title={t('mobile.sort-by.title')}
      clearText={t('mobile.sort-by.clear-text')}
      clearAriaLabel={t('mobile.sort-by.clear-aria-label')}
    >
      {sorts.map((sort) => (
        <RadioGroup.Item
          key={sort}
          id={sort}
          name='sort-by'
          reverse
          checked={currentSort === sort}
          onChange={() => onSelect(sort)}
        >
          {t(`mobile.sort-by.${sort}`)}
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  )
}

const OrderSection: React.FC<OrderSectionProps> = ({ selected, onSelect }) => {
  const { defaultOrder, orders } = useListingSort()
  const [currentOrder, setCurrentOrder] = useState<ListingOrder>(defaultOrder)
  const { t } = useTranslation('sort')

  useEffect(() => {
    setCurrentOrder(selected ?? defaultOrder)
  }, [selected])

  return (
    <RadioGroup
      title={t('mobile.order-by.title')}
      clearText={t('mobile.order-by.clear-text')}
      clearAriaLabel={t('mobile.order-by.clear-aria-label')}
    >
      {orders.map((order, idx) => (
        <RadioGroup.Item
          key={idx}
          id={`${order}-${idx}`}
          name='order'
          reverse
          checked={currentOrder === order}
          onChange={() => onSelect(order)}
        >
          {t(`mobile.order-by.${order}`)}
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  )
}

const ListingMobileFilterSortPopup: React.FC<Props> = ({ onClose, open }) => {
  const { defaultOrder, defaultSort } = useListingSort()
  const { t } = useTranslation('sort')
  const [isDefault, setIsDefault] = useState<boolean>(true)
  const { query } = useListingFilter()
  const {push} = useListingPusher()

  useEffect(() => {
    const isSortDefault = query.filter.sort ? query.filter.sort === defaultSort : true
    const isOrderDefault = query.filter.order ? query.filter.order === defaultOrder : true
    setIsDefault(isSortDefault && isOrderDefault)
  }, [query])

  const clear = () => {
    push(deepMerge(query, { filter: { sort: undefined, order: undefined } }))
  }

  const onSortSelect = (sort: ListingSort) => {
    push(deepMerge(query, { filter: { sort } }))
  }

  const onOrderSelect = (order: ListingOrder) => {
    push(deepMerge(query, { filter: { order } }))
  }

  return (
    <Popup
      onClose={onClose}
      open={open}
      size='2xl'
      head={
        <FilterHead.TitleSection>
          <FilterHead.Title>{t('mobile.title')}</FilterHead.Title>
          {!isDefault && <FilterHead.ClearButton onClear={() => clear()} />}
        </FilterHead.TitleSection>
      }
    >
      <SortSection selected={query.filter.sort} onSelect={onSortSelect} />
      <OrderSection selected={query.filter.order} onSelect={onOrderSelect} />
    </Popup>
  )
}

export default ListingMobileFilterSortPopup