import React from 'react'

type SectiontitleProps = {
    title: string;
}

const Sectiontitle = ({title}: SectiontitleProps) => {
  return (
    <h2 className=' uppercase text-main-color font-lato font-bold'>{title}</h2>
  )
}

export default Sectiontitle;