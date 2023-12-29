import Button from '@turistikrota/ui/button'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface NoResultsFoundProps {
  onResetFilters?: () => void
  isFiltered?: boolean
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ onResetFilters, isFiltered = true }) => {
  const { t } = useTranslation('common')
  return (
    <div className='flex flex-col items-center justify-center py-12 text-gray-600 dark:text-gray-200'>
      <i className='bx bx-2xl bx-search-alt'></i>
      <h1 className='mb-2 text-center text-2xl font-bold'>{t('notFound.title')}</h1>
      <p className='mb-2 text-center text-lg text-gray-700 dark:text-gray-300'>{t('notFound.description')}</p>
      {isFiltered && onResetFilters && (
        <Button onClick={() => onResetFilters()} block={false} variant='secondary'>
          {t('notFound.button')}
        </Button>
      )}
    </div>
  )
}

export default NoResultsFound
