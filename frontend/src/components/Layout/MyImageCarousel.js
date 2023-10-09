import React from "react";
import HoverCarousel from "hover-carousel";

const MyImageCarousel = () => {
  const images = [
    "https://randomyummyfood.files.wordpress.com/2020/12/20201229160340-burger.jpg?w=1024",
    "https://hips.hearstapps.com/hmg-prod/images/ghk040122savorweeknight-005-6477a1adb1c9f.jpg?crop=0.659xw:0.439xh;0.157xw,0.297xh&resize=640:*",
    "https://img.buzzfeed.com/buzzfeed-static/static/2017-07/7/16/campaign_images/buzzfeed-prod-fastlane-01/answer-these-random-questions-and-well-tell-you-w-2-8156-1499460843-2_dblbig.jpg?resize=1200:*",
    "https://imagevars.gulfnews.com/2021/05/30/shahenshah-thali-havelis-dubai_179be6160de_large.jpg",
    "https://indianfoodtimes.com/uploads/images/202304/image_750x_6446cb2085af3.jpg",
    "https://i.pinimg.com/564x/b1/76/db/b176dbc3d8d7946a4ced944efe5ce4b4.jpg",
    

    
    // Add more image URLs here
  ];

  return (
    
    <div >
      
      <p className="cartext">Speciality</p>

    <div className="carousel">
      <HoverCarousel images={images} />
    </div>
    </div>
  );
};

export default MyImageCarousel;