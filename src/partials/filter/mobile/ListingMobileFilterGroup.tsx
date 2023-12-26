type Props = {
    title: string
    values: string
    onClick: () => void
    horizontal?: boolean
  }
  
  const ListingMobileFilterGroup: React.FC<Props> = ({ title, values, onClick, horizontal }) => {
    return (
      <div className='border-b py-2' onClick={onClick}>
        <div className={`relative ${horizontal ? '' : 'flex justify-between items-center'}`}>
          <div className='font-bold text-lg text-gray-700 dark:text-gray-200 grow'>{title}</div>
          <div className={`text-secondary text-sm`}>{values}</div>
        </div>
      </div>
    )
  }
  
  export default ListingMobileFilterGroup