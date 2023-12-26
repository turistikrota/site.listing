type Props = {
    className?: string
  }
  
  const ListingDesktopFilterContainer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={`px-2 pb-2 border-b ${className ? className : ''}`}>{children}</div>
  }
  
  export default ListingDesktopFilterContainer
  