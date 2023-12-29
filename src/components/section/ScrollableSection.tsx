type Props = {
  className?: string
  disableOverflow?: boolean
}

export default function ScrollableSection({
  className,
  children,
  disableOverflow = false,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={`${className ? className : 'mt-2 max-h-[50vh] space-y-2 md:space-y-1'} ${
        !disableOverflow ? 'overflow-y-auto overflow-x-hidden' : ''
      }`}
    >
      {children}
    </div>
  )
}
