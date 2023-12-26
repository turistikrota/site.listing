import React from 'react'

export type SelectionItem = {
  image: string
  name: string
  id: string
  children?: SelectionItem[]
}

type Props = {
  items: SelectionItem[]
  selectedIds: string[]
  onToggle: (item: SelectionItem) => void
  childLevel?: number
  className?: string
}

type ItemProps = {
  image: string
  name: string
  selected: boolean
  onClick: () => void
}

const RichSelection: React.FC<Props> = ({ items, onToggle, selectedIds, childLevel = 0, className }) => {
  return (
    <div className={className} style={{
      marginLeft: `${childLevel * 1}rem`,
    }}>
      <div className={`grid max-h-60 grid-cols-12 gap-2 overflow-y-auto ${childLevel === 0 ? 'pr-2' : ''}`}>
        {items.map((item, idx) => <React.Fragment key={idx}>
          <RichSelectionItem
            key={idx}
            image={item.image}
            name={item.name}
            selected={selectedIds.includes(item.id)}
            onClick={() => onToggle(item)}
          />
          {item.children && item.children.length > 0 && <RichSelection
            items={item.children}
            onToggle={onToggle}
            selectedIds={selectedIds}
            childLevel={childLevel + 1}
            className='col-span-12'
          />}
        </React.Fragment>)}
      </div>
    </div>
  )
}

const RichSelectionItem: React.FC<ItemProps> = ({ image, name, selected, onClick }) => {
  return <div className={`col-span-12 grid grid-cols-12 rounded-md cursor-pointer transition-colors items-center relative duration-200 border ${selected ? 'bg-primary-200 dark:bg-primary-700 dark:bg-opacity-10 text-primary bg-opacity-10 border-transparent' : 'hover:bg-second hover:border-transparent'}`} onClick={onClick}>
    <div className='col-span-2 h-11 w-11 min-w-max min-h-max max-h-11 max-w-11 bg-cover rounded-l-md bg-center bg-no-repeat' style={{
      backgroundImage: `url(${image})`,
    }}>
      </div>
      <div className='col-span-10 w-full p-2'>
        {name}
      </div>
      {selected && <span className='absolute top-2 right-2'>
          <i className='bx bx-sm bx-check text-xl text-primary' />
        </span>}
  </div>
}

export default RichSelection