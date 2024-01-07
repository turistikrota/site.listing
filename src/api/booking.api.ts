import { Services, apiUrl } from '~/config/services'
import { httpClient } from '~/utils/http'

export type CreatorParams = {
  uuid: string
  adult: number
  kid?: number
  baby?: number
  start: string
  end: string
}

type CreateErrorResult = {
  message: string
  status: number
}

type CreateOkResult = {
  uuid: string
}

export const createBooking = async ({ uuid, adult, kid, baby, start, end }: CreatorParams): Promise<any> => {
  return httpClient
    .post(apiUrl(Services.Booking, `/${uuid}`), {
      startDate: start,
      endDate: end,
      isPublic: false,
      people: {
        adult: adult,
        kid: kid,
        baby: baby,
      },
    })
    .catch((err) => {
      if (err && err.response && err.response.data && err.response.data.message) {
        return { message: err.response.data.message, status: err.response.status }
      }
      return null
    })
}

export const checkAvailability = async (
  uuid: string,
  start: string,
  end: string,
  locale: string,
): Promise<[boolean, string?]> => {
  const res = await httpClient
    .get(apiUrl(Services.Booking, `/${uuid}/check-availability?start=${start}&end=${end}`), {
      headers: {
        'Accept-Language': locale,
      },
    })
    .catch((err) => {
      return {
        data: false,
        error: (err && err.response && err.response.data && err.response.data.message) || err.message,
      }
    })
  return res && typeof res.data === 'boolean' ? [res.data] : [false, res.data.error]
}

export function isCreateErrorResult(data: any): data is CreateErrorResult {
  return data && typeof data.message === 'string'
}

export function isCreateOkResult(data: any): data is CreateOkResult {
  return data && typeof data.uuid === 'string'
}
