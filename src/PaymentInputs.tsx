import React from "react";
import { getCardTypeByValue } from "./helpers/cardTypes";
import {
  getCardNumberError,
  getExpiryDateError,
  getCVCError,
} from "./helpers/validator";
import { formatCardNumber, formatExpiry } from "./helpers/formatters";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import CardImage from "./components/cardImage";
import { IError } from "./types";

function PaymentInputs() {
  const cardNumberField = React.useRef<HTMLInputElement>(null);
  const expiryDateField = React.useRef<HTMLInputElement>(null);
  const cvcField = React.useRef<HTMLInputElement>(null);

  const [cardNumber, setCardNumber] = React.useState<string>("");
  const [cardType, setCardType] = React.useState<string>("");
  const [expiryDate, setExpiryDate] = React.useState<string>("");
  const [cvc, setCvc] = React.useState<string>("");
  const [error, setError] = React.useState<IError>({
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  });

  const handleChangeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCardNumber = e.target.value || "";
    const cardNumber = formattedCardNumber.replace(/\s/g, "");

    const rawCardNumber = cardNumber.replace(/\s/g, "");
    const cardType = getCardTypeByValue(rawCardNumber);

    cardType && setCardType(cardType.type);

    setCardNumber(formatCardNumber(formattedCardNumber));
  };

  const handleBlurCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardNumberError = getCardNumberError(cardNumber);
    setError({ ...error, cardNumber: cardNumberError });
  };

  const handleChangeExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expiryDate = formatExpiry(e);
    setExpiryDate(expiryDate);

    if (expiryDate.length === 7) {
      const expiryDateError = getExpiryDateError(
        expiryDateField.current!.value
      );
      if (expiryDateError === false) cvcField.current!.focus();
      setError({ ...error, expiryDate: expiryDateError });
    }
  };

  const handleBlurExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expiryDateError = getExpiryDateError(expiryDateField.current!.value);
    if (expiryDateError === false) cvcField.current!.focus();
    setError({ ...error, expiryDate: expiryDateError });
  };

  const handleChangeCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cvc = e.target.value || "";
    setCvc(cvc);
  };

  const handleBlurCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cvcError = getCVCError(cvcField.current!.value);
    setError({ ...error, cvc: cvcError });
  };

  return (
    <>
      <InputGroup className={error ? "is-invalid" : ""}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white">
            <CardImage cardType={cardType} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          name="cardNumber"
          className="card-number"
          value={cardNumber}
          placeholder="1111 2222 3333 4444"
          type="tel"
          innerRef={cardNumberField}
          onChange={(e) => handleChangeCardNumber(e)}
          onBlur={(e) => handleBlurCardNumber(e)}
        />
        <Input
          name="expiryDate"
          className="expiry-date"
          value={expiryDate}
          placeholder="MM/YY"
          type="tel"
          innerRef={expiryDateField}
          onChange={(e) => handleChangeExpiryDate(e)}
          onBlur={(e) => handleBlurExpiryDate(e)}
        />
        <Input
          name="cvc"
          className="cvc"
          value={cvc}
          placeholder="CVC"
          type="tel"
          innerRef={cvcField}
          onChange={(e) => handleChangeCvc(e)}
          onBlur={(e) => handleBlurCvc(e)}
        />
      </InputGroup>
      {Object.values(error) &&
        Object.values(error).map((item, index) => (
          <div key={index} className="invalid-feedback">
            {item}
          </div>
        ))}
    </>
  );
}

export default PaymentInputs;
