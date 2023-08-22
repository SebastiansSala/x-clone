export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
      />
    </svg>
  )
}

export const SearchFilledIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
      <path d='M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z' />
      <path
        fillRule='evenodd'
        d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z'
        clipRule='evenodd'
      />
    </svg>
  )
}
