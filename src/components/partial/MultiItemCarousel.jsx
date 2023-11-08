import React, { useState, useEffect } from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function MultiItemCarousel() {
  const [numCards, setNumCards] = useState(getNumCards());
  const navigate = useNavigate();

  const imagesrc = [
    "https://upload.wikimedia.org/wikipedia/en/e/ec/Feed_Ontario_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Food_Banks_Canada_logo.svg/2560px-Food_Banks_Canada_logo.svg.png",
    "https://mma.prnewswire.com/media/1220980/Daily_Bread_Food_Bank_Daily_Bread_Food_Bank_Study_Reveals_Food_I.jpg?p=facebook",
    "https://blog.secondharvest.ca/wp-content/uploads/2022/02/Second-Harvest-Logo-2021-RGB-EN-1024x435.png",
  ];

  const imageInfo = [
    {
      src: "https://mma.prnewswire.com/media/964029/Sai_Dham_Food_Bank_Sai_Dham_Food_Bank_Announce_Fifth_Annual_Walk.jpg",
      title: "Said Ham Food Bank",
      text: "https://www.google.com/maps/place/7140+Goreway+Dr,+Mississauga,+ON+L4T+2T6/@43.7160664,-79.6382412,17z/data=!3m1!4b1!4m6!3m5!1s0x882b3bec31026c41:0x85b44143b208909d!8m2!3d43.7160626!4d-79.6356663!16s%2Fg%2F11b8v7klh6?entry=ttu",
      link: "https://saidhamfoodbank.com/?utm_source=Google&utm_medium=Maximum%20Conversion&utm_content=Drive%20traffic%20to%20homepage_SDFB&gclid=CjwKCAiA3aeqBhBzEiwAxFiOBg4HaPFX7PAQ3CCJ5vV5zMfXaY7YuY30vsPqYB-oCCOIdX37LLOehhoCqyAQAvD_BwE",
    },
    {
      src: "https://scarboroughfoodsecurityinitiative.myshopify.com/cdn/shop/files/Untitled_design-2_1200x1200.png?v=1614331973",
      title: "Scarborough Food Security Initiative",
      text: "https://www.google.com/maps/place/157+Byng+Ave,+Scarborough,+ON+M1L+3P3/@43.6970429,-79.2840526,17z/data=!3m1!4b1!4m5!3m4!1s0x89d4ce852a5f0781:0x35bfc6ed6da134ee!8m2!3d43.6970391!4d-79.2814777?entry=ttu",
      link: "https://scarboroughfoodsecurityinitiative.com",
    },
    {
      src: "https://dailybread.link2feed.ca/logo.png",
      title: "Daily Bread Food Bank",
      text: "https://www.google.com/maps/place/191+New+Toronto+St,+Etobicoke,+ON+M8V+2E7/@43.6066367,-79.5065314,17z/data=!3m1!4b1!4m6!3m5!1s0x882b49da781c5f07:0x1ebbbff86f3edff!8m2!3d43.6066328!4d-79.5039565!16s%2Fg%2F11bw3yr616?entry=ttu",
      link: "https://www.dailybread.ca/",
    },
    {
      src: "https://cornerstonechurch.ca/wp-content/uploads/2019/03/Cornerstone-WEB.png",
      title: "Cornerstone food bank",
      text: "https://www.google.com/maps/place/9680+Ninth+Line,+Markham,+ON+L6B+1A8/@43.9072041,-79.2456457,17z/data=!3m1!4b1!4m6!3m5!1s0x89d52834ed8de7f9:0x17a7be3c6c17f54c!8m2!3d43.9072003!4d-79.2430708!16s%2Fg%2F11cp5s01j9?entry=ttu",
      link: "https://cornerstonechurch.ca/foodpantry/",
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setNumCards(getNumCards());
  }

  function getNumCards() {
    return window.innerWidth < 768 ? 2 : 4;
  }

  const totalSlides = Math.ceil(imagesrc.length / numCards);

  return (
    <Carousel
      id="carouselExampleControls"
      interval={3000}
      controls={true}
      indicators={false}
    >
      {[...Array(totalSlides)].map((_, index) => (
        <Carousel.Item key={index}>
          <div className="cards-wrapper">
            {[...Array(numCards)].map((_, cardIndex) => {
              const imageIndex = index * numCards + cardIndex;
              if (imageIndex < imageInfo.length) {
                return (
                  <CarouselCard key={cardIndex} info={imageInfo[imageIndex]} />
                );
              }
              return null;
            })}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

const CarouselCard = ({ info }) => (
  <Card className="mx-2 carousel-card">
    <Card.Img
      variant="top"
      src={info.src}
      style={{
        width: "100%",
        textAlign: "center",
        margin: "auto",
      }}
    />
    <Card.Body className="carousel-card-body">
      <Card.Title>{info.title}</Card.Title>
      <br />
      <Link to={info.text} className="carousel-card-button">
        Address
      </Link>
      <Link to={info.link} className="carousel-card-button">
        <Button variant="success">Check it out</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default MultiItemCarousel;
