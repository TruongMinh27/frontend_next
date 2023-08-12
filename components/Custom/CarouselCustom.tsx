import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'
import Slider, { Settings } from 'react-slick'
import CustomButtonIcon from './CustomButtonIcon'

type RenderItemFunction<T> = (item: T, index: number) => React.ReactNode

interface Props<T> {
  data?: T[]
  renderItems?: RenderItemFunction<T>
}
function CarouselCustom<T>({ data, renderItems }: Props<T>) {
  // Settings slick
  const settings: Settings = {
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomButtonIcon icon={<ArrowRightOutlined />} className='absolute top-1/2' />,
    prevArrow: <CustomButtonIcon icon={<ArrowLeftOutlined />} className='absolute top-1/2 ' />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <Slider className='w-[90vw]  mx-auto mt-10' {...settings}>
      {data?.map((item, index) => {
        return renderItems?.(item, index)
      })}
    </Slider>
  )
}

export default CarouselCustom
