import { Services, apiUrl } from '~/config/services'
import { httpClient } from '~/utils/http'

export const createBooking = async () => {}

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
      console.log(err)
      return {
        data: false,
        error: err,
      }
    })
  return res && typeof res.data === 'boolean' ? [res.data] : [false, res.data.error]
}
