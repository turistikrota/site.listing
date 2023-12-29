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
    <div
      className={className}
      style={{
        marginLeft: `${childLevel * 1}rem`,
      }}
    >
      <div className={`grid max-h-60 grid-cols-12 gap-2 overflow-y-auto ${childLevel === 0 ? 'pr-2' : ''}`}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <RichSelectionItem
              key={idx}
              image={item.image}
              name={item.name}
              selected={selectedIds.includes(item.id)}
              onClick={() => onToggle(item)}
            />
            {item.children && item.children.length > 0 && (
              <RichSelection
                items={item.children}
                onToggle={onToggle}
                selectedIds={selectedIds}
                childLevel={childLevel + 1}
                className='col-span-12'
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const RichSelectionItem: React.FC<ItemProps> = ({ image, name, selected, onClick }) => {
  return (
    <div
      className={`relative col-span-12 grid cursor-pointer grid-cols-12 items-center rounded-md border transition-colors duration-200 ${
        selected
          ? 'border-transparent bg-primary-200 bg-opacity-10 text-primary dark:bg-primary-700 dark:bg-opacity-10'
          : 'hover:border-transparent hover:bg-second'
      }`}
      onClick={onClick}
    >
      <div
        className='max-w-11 col-span-2 h-11 max-h-11 min-h-max w-11 min-w-max rounded-l-md bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className='col-span-10 w-full p-2'>{name}</div>
      {selected && (
        <span className='absolute right-2 top-2'>
          <i className='bx bx-sm bx-check text-xl text-primary' />
        </span>
      )}
    </div>
  )
}

export default RichSelection
