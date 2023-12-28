export enum Services {
  Auth = 'auth',
  Account = 'account',
  Place = 'place',
  Listing = 'listing',
  Category = 'category',
}

export const ApiUrls: Record<Services, string> = {
  [Services.Auth]: process.env.NEXT_PUBLIC_AUTH_API_URL!,
  [Services.Account]: process.env.NEXT_PUBLIC_ACCOUNT_API_URL!,
  [Services.Place]: process.env.NEXT_PUBLIC_PLACE_API_URL!,
  [Services.Listing]: process.env.NEXT_PUBLIC_LISTING_API_URL!,
  [Services.Category]: process.env.NEXT_PUBLIC_CATEGORY_API_URL!,
}

export const apiUrl = (service: Services, path: string) => `${ApiUrls[service]}${path}`
