import Link from 'next/link'

const HeaderLogo = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex items-center'>
      <Link href={'/'} className={'flex items-center'}>
        <div className='flex items-center justify-center mr-2 rounded-full'>{children}</div>
      </Link>
    </div>
  )
}

export default HeaderLogo
