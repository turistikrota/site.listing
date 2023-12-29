type Props = {
  className?: string
}

const ListingDesktopFilterContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={`border-b px-2 pb-2 ${className ? className : ''}`}>{children}</div>
}

export default ListingDesktopFilterContainer
