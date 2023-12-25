type Props = {
    title: string
    values: string
    onClick: () => void
  }
  
  const ListingMobileFilterGroup: React.FC<Props> = ({ title, values, onClick }) => {
    return (
      <div className='border-b py-2' onClick={onClick}>
        <div className='flex justify-between items-center relative'>
          <div className='font-bold text-lg text-gray-700 dark:text-gray-200 grow'>{title}</div>
          <div className={`text-secondary text-sm`}>{values}</div>
        </div>
      </div>
    )
  }
  
  export default ListingMobileFilterGroup