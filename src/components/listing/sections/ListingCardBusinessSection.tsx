import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FC } from "react";
import { makeBusinessAvatar } from "~/utils/cdn";

type Props = {
    nickName: string
}

const ListingCardBusinessSection : FC<Props> = ({nickName}) => {
    const { t } = useTranslation('listing')
    return <div className="col-span-6 flex items-center justify-start gap-2 text-ellipsis overflow-hidden">
        <Image src={makeBusinessAvatar(nickName)} alt={nickName} width={32} height={32} className="rounded-md bg-second object-cover w-9 h-9" />
        <div className="flex flex-col overflow-hidden text-ellipsis">
            <div className="text-sm font-bold overflow-hidden text-ellipsis">~{nickName}</div>
            <div className="text-xs">{t('words.from-business')}</div>
        </div>
    </div>
}

export default ListingCardBusinessSection