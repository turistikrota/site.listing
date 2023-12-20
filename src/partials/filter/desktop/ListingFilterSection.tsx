import { FC } from "react";
import ListingDesktopCityGroup from "./ListingDesktopCityGroup";
import ListingDesktopDistanceGroup from "./ListingDesktopDistanceGroup";
import ListingDesktopPeopleGroup from "./ListingDesktopPeopleGroup";
import ListingDesktopQueryGroup from "./ListingDesktopQueryGroup";

const ListingFilterSection : FC = () => {
    return <>
    <ListingDesktopPeopleGroup />
        <ListingDesktopQueryGroup />
        <ListingDesktopCityGroup />
        <ListingDesktopDistanceGroup />
    </>
}

export default ListingFilterSection