// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import Autoplay module CSS
import { Autoplay } from "swiper/modules";

export default function Carousel() {
  const imagesSample = [
    {
      id: 1,
      url: "https://tinyurl.com/523aema7",
    },
    {
      id: 2,
      url: "https://tinyurl.com/2k4xh4mu",
    },
    {
      id: 3,
      url: "https://tinyurl.com/4454fkx6",
    },
  ];

  return (
    <section>
      <Swiper
        slidesPerView={1}
        // navigation={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 3000, // Delay between slide transitions in milliseconds
          disableOnInteraction: false, // Allow autoplay to continue after user interaction
        }}
        modules={[Autoplay]} // Add Autoplay module
      >
        {imagesSample.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.url}
              className="h-96 object-cover w-full"
              alt="tweets"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}