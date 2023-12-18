import Button from '@turistikrota/ui/button'
import Link from 'next/link'

type Props = {
  href: string
  active?: boolean
}

export default function TopSiteLink({ href, active = false, children }: React.PropsWithChildren<Props>) {
  return (
    <Link href={href}>
      <Button
        size='sm'
        variant={active ? 'primary' : 'transparent'}
        className={!active ? 'hover:!bg-primary-500 dark:hover:!bg-primary-600' : ''}
      >
        {children}
      </Button>
    </Link>
  )
}
