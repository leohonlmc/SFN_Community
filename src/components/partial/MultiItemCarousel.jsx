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
      src: "https://upload.wikimedia.org/wikipedia/en/e/ec/Feed_Ontario_logo.png",
      title: "Feed Ontario",
      text: "",
      link: "https://feedontario.ca/take-action-against-hunger/?gclid=Cj0KCQjwqP2pBhDMARIsAJQ0CzrSppJDMPEQkNYOmwTOqsFeimTDEoh5htBGHUhcX3OGlnbZ7NgbgnwaAve2EALw_wcB",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Food_Banks_Canada_logo.svg/2560px-Food_Banks_Canada_logo.svg.png",
      title: "Food Banks Canada",
      text: "",
      link: "https://web.foodbankscanada.ca/cn/avlfe/holiday-digital-1/?utm_campaign=12997_FBC_Holiday-Digital&utm_source=google&utm_medium=search&apl=DMHOLIDAY2023&pck=googlesearch&gad=1&gclid=Cj0KCQjwqP2pBhDMARIsAJQ0CzoM_inAXeouwCEa5qJ5qjWEg5FiHYuddwXtVR8RXaG_ibyzYDYUcoYaAiwZEALw_wcB",
    },
    {
      src: "https://mma.prnewswire.com/media/1220980/Daily_Bread_Food_Bank_Daily_Bread_Food_Bank_Study_Reveals_Food_I.jpg?p=facebook",
      title: "Daily Bread Food Bank",
      text: "",
      link: "https://www.dailybread.ca/",
    },
    {
      src: "https://blog.secondharvest.ca/wp-content/uploads/2022/02/Second-Harvest-Logo-2021-RGB-EN-1024x435.png",
      title: "Second Harvest",
      text: "",
      link: "https://secondharvest.ca/",
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
      <Link to={info.link} className="carousel-card-button">
        <Button variant="success">Check it out</Button>
      </Link>
    </Card.Body>
  </Card>
);

export default MultiItemCarousel;
