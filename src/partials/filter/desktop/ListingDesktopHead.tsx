import ListingFilterClearButton from "../shared/ListingFilterClearButton"


type TitleProps = {
  className?: string
}

type ListingDesktopHeadType = React.FC<React.PropsWithChildren> & {
  Title: typeof Title
  Clear: typeof ListingFilterClearButton
}

const Title: React.FC<React.PropsWithChildren<TitleProps>> = ({ children, className }) => {
  return <div className={`font-bold text-gray-700 dark:text-gray-200 ${className ? className : ''}`}>{children}</div>
}

const ListingDesktopHead: ListingDesktopHeadType = ({ children }) => {
  return <div className='flex justify-between items-center mb-2'>{children}</div>
}

ListingDesktopHead.Title = Title
ListingDesktopHead.Clear = ListingFilterClearButton

export default ListingDesktopHead
