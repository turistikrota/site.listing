import { FC } from "react";
import ListingDesktopCityGroup from "./ListingDesktopCityGroup";
import ListingDesktopDistanceGroup from "./ListingDesktopDistanceGroup";
import ListingDesktopQueryGroup from "./ListingDesktopQueryGroup";

const ListingFilterSection : FC = () => {
    return <>
        <ListingDesktopQueryGroup />
        <ListingDesktopCityGroup />
        <ListingDesktopDistanceGroup />
    </>
}

export default ListingFilterSection