import Button from "@turistikrota/ui/button"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import { FC } from "react"
import { makeBusinessAvatar } from "~/utils/cdn"

type Props = {
    nickName: string
}

const ListingDetailBusinessSection : FC<Props> = ({
    nickName
}) => {
    const { t } = useTranslation('listing')
    return <section className="flex items-center justify-between gap-2 text-ellipsis overflow-hidden">
        <div className="flex items-center justify-start gap-2 text-ellipsis overflow-hidden">
        <Image src={makeBusinessAvatar(nickName)} alt={nickName} width={32} height={32} className="rounded-md bg-second object-cover w-12 h-12 min-w-max" />
        <div className="flex flex-col overflow-hidden text-ellipsis">
            <div className="text-base font-bold overflow-hidden text-ellipsis">~{nickName}</div>
            <div className="text-sm">{t('words.from-business')}</div>
        </div>
        </div>
        <div className="flex items-center justify-end">
            <Button size="sm" variant="secondary" className="flex items-center justify-center gap-2" block={false}>
                <i className="bx text-lg bx-link-external"></i>
                {t('business.see-profile')}
            </Button>
        </div>
    </section>
}

export default ListingDetailBusinessSection