import { Coordinates } from "@turistikrota/location-tr"
import { I18nTranslation } from "@turistikrota/ui"
import { Services, apiUrl } from "~/config/services"
import { httpClient } from "~/utils/http"

export type PlaceListItem = {
    images: PlaceImage[]
    translations: I18nTranslation<TranslationItem>
    averageTimeSpent: TimeSpent
    review: Review
    coordinates: Coordinates
    isPayed: boolean
    type: Type
  }
  
export type TranslationItem = {
    title: string
    description: string
    slug: string
  }
  

export type Review = {
    total: number
    averagePoint: number
  }
  
export type TimeSpent = {
    min: number
    max: number
  }
  
export type PlaceImage = {
    url: string
    order: number
  }

  export enum Type {
    Eating = 'eating',
    Coffee = 'coffee',
    Bar = 'bar',
    Beach = 'beach',
    Amaze = 'amaze',
    Shopping = 'shopping',
    Transport = 'transport',
    Culture = 'culture',
    Nature = 'nature',
    Health = 'health',
    Sport = 'sport',
    Nightlife = 'nightlife',
    Garden = 'garden',
    Temple = 'temple',
    Museum = 'museum',
    Antique = 'antique',
    ThemePark = 'themePark',
    Other = 'other',
  }

  export const fetchNearestPlaces = async (coordinates: Coordinates) : Promise<PlaceListItem[]> => {
    const res = await httpClient.post(apiUrl(Services.Place, `/?page=1&limit=100`), {
        coordinates: coordinates,
        distance: 7,
    })
    return res.data?.list || []
  }