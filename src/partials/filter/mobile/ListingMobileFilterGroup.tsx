type Props = {
  title: string
  values: string
  onClick: () => void
  horizontal?: boolean
}

const ListingMobileFilterGroup: React.FC<Props> = ({ title, values, onClick, horizontal }) => {
  return (
    <div className='border-b py-2' onClick={onClick}>
      <div className={`relative ${horizontal ? '' : 'flex items-center justify-between'}`}>
        <div className='grow text-lg font-bold text-gray-700 dark:text-gray-200'>{title}</div>
        <div className={`text-sm text-secondary`}>{values}</div>
      </div>
    </div>
  )
}

export default ListingMobileFilterGroup
