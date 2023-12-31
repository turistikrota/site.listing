import Button from '@turistikrota/ui/button'
import PerfectImage from '@turistikrota/ui/image/perfect'
import React, { FC, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
  content: string
}

type ImageProps = {
  src: string
  alt: string
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

const MarkdownContent: FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className='mb-3 text-center text-2xl font-bold'>{children}</h1>,
        h2: ({ children }) => (
          <h2
            className='my-3 text-xl font-bold text-gray-900 dark:text-gray-200
            '
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className='mb-1 mt-2 text-lg font-bold text-gray-800 dark:text-gray-300'>{children}</h3>
        ),
        h4: ({ children }) => <h4 className='text-base font-bold'>{children}</h4>,
        h5: ({ children }) => <h5 className='text-base font-bold'>{children}</h5>,
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
          <strong className='text-base font-bold text-gray-800 dark:text-gray-300'>{children}</strong>
        ),
        br: () => <br className='hideable' />,
        hr: ({ children }) => <hr className='my-2'>{children}</hr>,
        b: ({ children }) => <b className='text-base font-bold text-gray-800 dark:text-gray-300'>{children}</b>,
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
