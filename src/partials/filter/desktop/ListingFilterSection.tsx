import { FC } from "react";
import ListingDesktopCityGroup from "./ListingDesktopCityGroup";
import ListingDesktopDateGroup from "./ListingDesktopDateGroup";
import ListingDesktopDistanceGroup from "./ListingDesktopDistanceGroup";
import ListingDesktopPeopleGroup from "./ListingDesktopPeopleGroup";
import ListingDesktopQueryGroup from "./ListingDesktopQueryGroup";
import ListingDesktopValidationGroup from "./ListingDesktopValidationGroup";

const ListingFilterSection : FC = () => {
    return <>
    <ListingDesktopDateGroup />
    <ListingDesktopPeopleGroup />
        <ListingDesktopQueryGroup />
        <ListingDesktopValidationGroup />
        <ListingDesktopCityGroup />
        <ListingDesktopDistanceGroup />
    </>
}

export default ListingFilterSection