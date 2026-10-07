import React from 'react';

import Image from 'next/image';
import { ArrowUpRightIcon } from 'lucide-react';
import { renderInline } from '@/utilities/markdown';
import { formatMonth, formatPeriod } from '@/utilities/date';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Ventures as VenturesData, VentureProduct } from '@/types/Venture';

const ProductCard = ({ product }: { product: VentureProduct }) => (
  <article className='overflow-hidden rounded-xl border bg-card'>
    <a
      href={product.href}
      target='_blank'
      rel='noopener noreferrer'
      tabIndex={-1}
      aria-hidden='true'
      className='block border-b bg-muted'
    >
      <Image
        src={product.imageUrl}
        alt={product.imageAlt}
        width={1200}
        height={630}
        loading={'eager'}
        sizes='(min-width: 672px) 624px, 100vw'
        className='w-full h-auto'
      />
    </a>
    <div className='p-5 sm:p-6 space-y-5'>
      <header className='flex items-center gap-3'>
        <Image
          src={product.iconUrl}
          alt=''
          width={40}
          height={40}
          className='size-10 rounded-[10px] border'
        />
        <div>
          <h3 className='font-display text-base font-semibold tracking-tight'>
            {product.name}
          </h3>
          <p className='text-xs text-muted-foreground'>
            {product.role} since {formatMonth(product.start)}
          </p>
        </div>
      </header>

      <p className='text-base text-pretty max-w-prose'>{product.tagline}</p>

      <dl className='flex flex-wrap gap-x-10 gap-y-4 border-y py-4'>
        {product.highlights.map((highlight) => (
          <div key={highlight.label} className='flex flex-col-reverse gap-0.5'>
            <dt className='text-xs text-muted-foreground text-pretty'>
              {highlight.label}
            </dt>
            <dd className='font-display text-lg font-semibold tracking-tight whitespace-nowrap'>
              {highlight.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className='list-disc pl-4 marker:text-muted-foreground/60 space-y-1.5 text-sm text-pretty text-muted-foreground'>
        {product.bullets.map((bullet) => (
          <li key={bullet}>{renderInline(bullet)}</li>
        ))}
      </ul>

      <div className='flex flex-wrap items-center justify-between gap-4'>
        <ul className='flex flex-wrap gap-1.5' aria-label='Built with'>
          {product.stack.map((item) => (
            <li key={item}>
              <Badge variant='outline' className='font-normal'>
                {item}
              </Badge>
            </li>
          ))}
        </ul>
        <div className='flex flex-wrap gap-2'>
          {product.appStoreUrl && (
            <a
              href={product.appStoreUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'gap-1'
              )}
            >
              Get the iOS app
              <ArrowUpRightIcon className='size-3.5' aria-hidden='true' />
            </a>
          )}
          <a
            href={product.href}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(buttonVariants({ size: 'sm' }), 'gap-1')}
          >
            {product.linkLabel}
            <ArrowUpRightIcon className='size-3.5' aria-hidden='true' />
          </a>
        </div>
      </div>
    </div>
  </article>
);

export const Ventures = ({ ventures }: { ventures: VenturesData }) => {
  const { company, products } = ventures;

  return (
    <div className='space-y-8'>
      <div className='space-y-5'>
        <header className='flex items-center gap-3'>
          <span className='flex size-10 items-center justify-center rounded-full border bg-white'>
            <Image
              src={company.logoUrl}
              alt=''
              width={20}
              height={20}
              className='size-5'
            />
          </span>
          <div className='flex-1'>
            <h3 className='font-semibold leading-tight'>
              <a
                href={company.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 hover:text-primary'
              >
                {company.name}
                <ArrowUpRightIcon className='size-3.5' aria-hidden='true' />
              </a>
            </h3>
            <p className='text-xs text-muted-foreground'>
              {company.role}, {company.location}
            </p>
          </div>
          <p className='hidden sm:block text-xs tabular-nums text-muted-foreground'>
            {formatPeriod(company.start, null)}
          </p>
        </header>
        <p className='text-sm text-pretty max-w-prose'>{company.description}</p>
        <dl className='grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-x-6 text-sm'>
          {company.lines.map((line) => (
            <React.Fragment key={line.title}>
              <dt className='font-medium'>{line.title}</dt>
              <dd className='text-muted-foreground text-pretty -mt-2 sm:mt-0'>
                {line.text}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
};
