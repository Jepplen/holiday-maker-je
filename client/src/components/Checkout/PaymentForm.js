import React from "react";

import { paymentFormStyle } from "./PaymentStyles";
import { Box, InputLabel } from "@material-ui/core";
import Cleave from "cleave.js/react";

export default function PaymentForms({
  handleCredit,
  cvc,
  expire,
  cardNum,
  cardImg,
  onCreditCardTypeChanged,
}) {
  const classes = paymentFormStyle();

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <Box className={classes.wrapper}>
        <InputLabel className={classes.label} htmlFor={"cardNumber"}>
          Card Number
          <Cleave
            className={classes.inputCardNum}
            name="creditCard"
            placeholder="0000 0000 0000 0000"
            value={cardNum}
            options={{
              creditCard: true,
              onCreditCardTypeChanged,
            }}
            onChange={handleCredit}
          />
        </InputLabel>
        <Box className={classes.imgWrapper}>
          <img className={classes.image} src={cardImg || ""} alt="" />
        </Box>
      </Box>
      <Box className={classes.wrapper}>
        <InputLabel className={classes.label} htmlFor={"expiryDate"}>
          Expiry Date
          <Cleave
            className={classes.inputDate}
            name="expire"
            placeholder="MM / YY"
            value={expire}
            options={{ date: true, datePattern: ["m", "d"] }}
            onChange={handleCredit}
          />
        </InputLabel>
        <InputLabel className={classes.label} htmlFor={"cvc"}>
          CVC
          <Cleave
            className={classes.inputCVC}
            name="cvc"
            placeholder="000"
            value={cvc}
            options={{
              blocks: [3],
              numericOnly: true,
            }}
            onChange={handleCredit}
          />
        </InputLabel>
      </Box>
    </form>
  );
}
