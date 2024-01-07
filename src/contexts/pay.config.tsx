import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { fetchPaymentConfig } from '~/api/pay.api'

type PayConfigContextType = {
  comissionRate: number
}

type ProviderProps = {
  initialComissionRate?: number
}

const PayConfigContext = createContext<PayConfigContextType | undefined>(undefined)

export const usePayConfig = (): PayConfigContextType => {
  const context = useContext(PayConfigContext)
  if (!context) {
    throw new Error('usePayConfig must be used within a PayConfigProvider')
  }
  return context
}

export const PayConfigProvider: FC<PropsWithChildren<ProviderProps>> = ({ children, initialComissionRate }) => {
  const [comissionRate, setComissionRate] = useState<number>(initialComissionRate || 0.5)

  useEffect(() => {
    if (initialComissionRate) return
    fetchPaymentConfig()
      .then((res) => {
        if (!res) return
        setComissionRate(res.comissionRate)
      })
      .catch(() => ({}))
  }, [])

  return (
    <PayConfigContext.Provider
      value={{
        comissionRate,
      }}
    >
      {children}
    </PayConfigContext.Provider>
  )
}
