import Image from 'next/image';

// Types
import { PersonProps } from '@/types/PersonProps';

export const Person = (props: PersonProps) => {
  const { person } = props;

  return (
    <section className='overflow-hidden'>
      <div className='relative max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 lg:py-20'>
        <svg
          className='absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden'
          width={784}
          height={404}
          fill='none'
          viewBox='0 0 784 404'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200 dark:text-gray-800'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={784}
            height={404}
            fill='url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)'
          />
        </svg>

        <svg
          className='hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2'
          width={404}
          height={784}
          fill='none'
          viewBox='0 0 404 784'
          aria-hidden='true'
        >
          <defs>
            <pattern
              id='56409614-3d62-4985-9a10-7ca758a8f4f0'
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200 dark:text-gray-800'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill='url(#56409614-3d62-4985-9a10-7ca758a8f4f0)'
          />
        </svg>

        <div className='relative lg:flex lg:items-center'>
          <div className='hidden lg:block lg:flex-shrink-0'>
            <Image
              width={500}
              height={500}
              className='h-64 w-52 rounded-xl xl:h-80 xl:w-64'
              src={person.imageUrl}
              alt=''
            />
          </div>

          <div className='relative lg:ml-10'>
            <blockquote className='relative'>
              <div className='text-2xl leading-9 font-medium'>
                <p>{person.bio}</p>
              </div>
              <footer className='mt-8'>
                <div className='flex'>
                  <div className='flex-shrink-0 lg:hidden'>
                    <Image
                      width={500}
                      height={500}
                      className='h-64 w-52 rounded-lg'
                      src={person.imageUrl}
                      alt=''
                    />
                  </div>
                  <div className='ml-4 lg:ml-0'>
                    <div className='text-base font-medium'>{person.name}</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
