import Button from '@turistikrota/ui/button'
import PerfectImage from '@turistikrota/ui/image/perfect'
import React, { FC, PropsWithChildren, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
  decreaseHeight?: boolean
}

type HeightProps = {
  level: number
  center?: boolean
}

type ImageProps = {
  src: string
  alt: string
}

const Height: FC<PropsWithChildren<HeightProps>> = ({ level, center = false, children }) => {
  switch (level) {
    case 1:
      return <h1 className='mb-3 text-center text-2xl font-bold'>{children}</h1>
    case 2:
      return (
        <h2 className={`my-3 text-xl font-bold text-gray-900 dark:text-gray-200 ${center ? 'text-center' : ''}`}>
          {children}
        </h2>
      )
    case 3:
      return <h3 className='mb-1 mt-2 text-lg font-bold text-gray-800 dark:text-gray-300'>{children}</h3>
    case 4:
      return <h4 className='mb-1 mt-2 text-base font-semibold'>{children}</h4>
    case 5:
      return <h5 className='mb-1 mt-2 text-base font-semibold'>{children}</h5>
    case 6:
      return <h6 className='text-base font-semibold'>{children}</h6>
    default:
      return <p className='hide-br-before-em br.hideable text-base text-gray-700 dark:text-gray-400'>{children}</p>
  }
}

const ImageLoader: React.FC<ImageProps> = ({ src, alt }) => {
  const [loading, setLoading] = useState(true)
  return (
    <span className={`md-img ${loading ? 'relative z-10 my-2 flex h-72 min-h-full w-full rounded-md md:h-128' : ''}`}>
      <PerfectImage
        imgClassName='h-auto object-cover my-4 z-10 mx-auto rounded-md'
        loadingClassName='rounded-md'
        src={src}
        alt={alt}
        onImageLoaded={() => setLoading(false)}
      />
    </span>
  )
}

const MarkdownContent: FC<Props> = ({ content, decreaseHeight = false }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <Height level={decreaseHeight ? 2 : 1} center>
            {children}
          </Height>
        ),
        h2: ({ children }) => <Height level={decreaseHeight ? 3 : 2}>{children}</Height>,
        h3: ({ children }) => <Height level={decreaseHeight ? 4 : 3}>{children}</Height>,
        h4: ({ children }) => <Height level={decreaseHeight ? 5 : 4}>{children}</Height>,
        h5: ({ children }) => <Height level={decreaseHeight ? 6 : 5}>{children}</Height>,
        h6: ({ children }) => <h6 className='text-base font-bold'>{children}</h6>,
        p: ({ children }) => (
          <p className='hide-br-before-em br.hideable text-base text-gray-700 dark:text-gray-400'>{children}</p>
        ),
        a: ({ children, href }) => (
          <a href={href} target='_blank' rel='noreferrer'>
            <Button className='mt-2 flex items-center justify-center gap-2' block={false}>
              <i className='bx bx-link-external text-lg'></i>
              {children}
            </Button>
          </a>
        ),
        ul: ({ children }) => <ul className='list-inside list-disc text-base'>{children}</ul>,
        li: ({ children }) => <li className='text-base text-gray-700 dark:text-gray-400'>{children}</li>,
        strong: ({ children }) => (
          <strong className='text-base font-semibold text-gray-800 dark:text-gray-300'>{children}</strong>
        ),
        br: () => <br className='hideable' />,
        hr: ({ children }) => <hr className='my-2'>{children}</hr>,
        b: ({ children }) => <b className='text-base font-semibold text-gray-800 dark:text-gray-300'>{children}</b>,
        img: ({ src, alt }) => src && alt && <ImageLoader src={src} alt={alt} />,
        em: ({ children }) => <em className='text-base italic'>{children}</em>,
      }}
      className='md-container'
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownContent
