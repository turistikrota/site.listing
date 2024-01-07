import { Services, apiUrl } from '~/config/services'
import { httpClient } from '~/utils/http'

export type PaymentConfig = {
  comissionRate: number
}

export const fetchPaymentConfig = async (): Promise<PaymentConfig> => {
  const res = await httpClient.get(apiUrl(Services.Pay, '/config')).catch(() => ({
    data: {
      comissionRate: 0,
    },
  }))
  return res.data
}
