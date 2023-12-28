import Link from 'next/link'

const HeaderLogo = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex items-center'>
      <Link href={'/'} className={'flex items-center'}>
        <div className='mr-2 flex items-center justify-center rounded-full'>{children}</div>
      </Link>
    </div>
  )
}

export default HeaderLogo
