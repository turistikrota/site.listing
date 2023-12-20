type Props = {
    className?: string
  }
  
  const ListingDesktopFilterContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={`px-4 pb-4 border-b ${className ? className : ''}`}>{children}</div>
  }
  
  export default ListingDesktopFilterContainer
  