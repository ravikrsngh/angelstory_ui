import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function MultiCarousel(props: {
  children: React.ReactNode;
  itemClass?: string;
}) {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={false}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass={props.itemClass}
    >
      {props.children}
    </Carousel>
  );
}
