import * as cardTypes from "./cardTypes";

const MONTH_REGEX = /(0[1-9]|1[0-2])/;

export const EMPTY_CARD_NUMBER = "Enter a card number";
export const EMPTY_EXPIRY_DATE = "Enter an expiry date";
export const EMPTY_CVC = "Enter a CVC";
export const EMPTY_ZIP = "Enter a ZIP code";

export const INVALID_CARD_NUMBER = "Card number is invalid";
export const INVALID_EXPIRY_DATE = "Expiry date is invalid";
export const INVALID_CVC = "CVC is invalid";

export const MONTH_OUT_OF_RANGE = "Expiry month must be between 01 and 12";
export const YEAR_OUT_OF_RANGE = "Expiry year cannot be in the past";
export const DATE_OUT_OF_RANGE = "Expiry date cannot be in the past";

export const validateLuhn = (cardNumber: string) => {
  return (
    cardNumber
      .split("")
      .reverse()
      .map((digit: string) => parseInt(digit, 10))
      .map((digit: number, idx: number) => (idx % 2 ? digit * 2 : digit))
      .map((digit: number) => (digit > 9 ? (digit % 10) + 1 : digit))
      .reduce((accum: number, digit: number) => (accum += digit)) %
      10 ===
    0
  );
};
export const getCardNumberError = (cardNumber: string) => {
  if (!cardNumber) {
    return EMPTY_CARD_NUMBER;
  }

  const rawCardNumber = cardNumber.replace(/\s/g, "");
  const cardType = cardTypes.getCardTypeByValue(rawCardNumber);
  console.log(cardType);
  if (cardType && cardType.lengths) {
    const doesCardNumberMatchLength = cardType.lengths.includes(
      rawCardNumber.length
    );
    if (doesCardNumberMatchLength) {
      const isLuhnValid = validateLuhn(rawCardNumber);
      if (isLuhnValid) {
        return false;
      }
    }
  }
  return INVALID_CARD_NUMBER;
};

export const getExpiryDateError = (expiryDate: string) => {
  if (!expiryDate) {
    return EMPTY_EXPIRY_DATE;
  }
  const rawExpiryDate = expiryDate.replace(" / ", "").replace("/", "");
  if (rawExpiryDate.length === 4) {
    const month = rawExpiryDate.slice(0, 2);
    const year = `20${rawExpiryDate.slice(2, 4)}`;
    if (!MONTH_REGEX.test(month)) {
      return MONTH_OUT_OF_RANGE;
    }
    if (parseInt(year) < new Date().getFullYear()) {
      return YEAR_OUT_OF_RANGE;
    }
    if (
      parseInt(year) === new Date().getFullYear() &&
      parseInt(month) < new Date().getMonth() + 1
    ) {
      return DATE_OUT_OF_RANGE;
    }
    return false;
  }
  return INVALID_EXPIRY_DATE;
};

export const getCVCError = (cvc: string) => {
  if (!cvc) {
    return EMPTY_CVC;
  }
  if (cvc.length < 3) {
    return INVALID_CVC;
  }
  return false;
};
