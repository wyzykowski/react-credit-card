import React from "react";
import { getCardImage } from "../helpers/images";

interface ICardImageProps {
  cardType: string;
}

function CardImage(props: ICardImageProps) {
  return (
    <img
      className="card-image"
      alt={`Icon ${props.cardType}`}
      src={getCardImage(props.cardType)}
    />
  );
}

export default CardImage;
