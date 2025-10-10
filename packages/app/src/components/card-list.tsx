import React from 'react'
import Image from 'next/image'
import { LinkComponent } from './link-component'

interface ListItemType {
  title: string
  description: string
  image: string
  url?: string
}

interface Props {
  className?: string
  title?: string
  items: ListItemType[]
}

export const CardList = React.memo(function CardList(props: Props) {
  const className = props.className ?? ''

  return (
    <section className={className}>
      {props.title && <h3 className='text-lg mb-4'>{props.title}</h3>}

      <div className='flex flex-col gap-4'>
        {props.items.map((i, index) => {
          return (
            <div key={`${index}_${i.title}`} className='card-ticket'>
              <div className='flex items-center p-6'>
                <div className='flex items-center justify-center shrink-0 mr-6'>
                  <figure>
                    <Image
                      height={60}
                      width={60}
                      src={i.image}
                      alt={i.title}
                      placeholder='blur'
                      blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                      sizes='100vw'
                      className='object-cover opacity-70'
                    />
                  </figure>
                </div>
                <div>
                  {i.url && (
                    <LinkComponent href={i.url}>
                      <h4 className='card-title text-lg font-semibold mb-2 hover:text-indigo-300 transition-colors'>
                        {i.title}
                      </h4>
                    </LinkComponent>
                  )}
                  {!i.url && <h4 className='card-title text-lg font-semibold mb-2'>{i.title}</h4>}
                  <p className='text-slate-400'>{i.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
})
