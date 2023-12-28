import React from 'react'

type BaseProps = {
  className?: string
}

type KeyValueType = React.FC<React.PropsWithChildren<BaseProps>> & {
  Item: React.FC<Props>
}

type Props = {
  label: string
  value: string
  valueClassName?: string
  reversed?: boolean
}

const Item: React.FC<Props> = ({ label, value, valueClassName, reversed }) => {
  return (
    <>
      <div className={reversed ? 'col-span-2' : 'col-span-1'}>
        <div className='text-sm text-gray-600 dark:text-gray-400'>{label}</div>
      </div>
      <div className={`flex justify-end ${reversed ? 'col-span-1' : 'col-span-2'}`}>
        <div className={`text-sm font-bold ${valueClassName ? valueClassName : 'text-gray-600 dark:text-gray-400'}`}>
          {value}
        </div>
      </div>
    </>
  )
}

const KeyValue: KeyValueType = ({ children, className }) => {
  return <div className={`grid grid-cols-3 gap-2 ${className ? className : ''}`}>{children}</div>
}

KeyValue.Item = Item

export default KeyValue
