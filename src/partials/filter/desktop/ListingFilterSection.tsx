import { FC } from "react";
import ListingDesktopCityGroup from "./ListingDesktopCityGroup";
import ListingDesktopQueryGroup from "./ListingDesktopQueryGroup";

const ListingFilterSection : FC = () => {
    return <>
        <ListingDesktopQueryGroup />
        <ListingDesktopCityGroup />
    </>
}

export default ListingFilterSection