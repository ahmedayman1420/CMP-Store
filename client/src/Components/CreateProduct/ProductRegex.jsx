// ======= --- ======= <| Regex |> ======= --- ======= //

export const validTitle = new RegExp(
  //Minimum two characters, Maximum 30 characters, no number and one special character;
  // /^[a-zA-Z ]{2,30}$/
  /^(.|\s)*[a-zA-Z]+(.|\s)*$/
);

export const validPrice = new RegExp(
  // Valid price
  /^\d+(,\d{1,2})?$/
);

export const validDescription = new RegExp(
  //Minimum two characters, Maximum 100 characters, no number and one special character;
  // /^[a-zA-Z ]{2,100}$/
  /^(.|\s)*[a-zA-Z]+(.|\s)*$/
);

export const validStock = new RegExp(
  // Valid Stock
  /^\d+(,\d{1,2})?$/
);

export const validBrand = new RegExp(
  //Minimum two characters, Maximum 30 characters, no number and one special character;
  // /^[a-zA-Z ]{2,30}$/
  /^(.|\s)*[a-zA-Z]+(.|\s)*$/
);

export const validCategory = new RegExp(
  //Minimum two characters, Maximum 30 characters, no number and one special character;
  // /^[a-zA-Z ]{2,30}$/
  /^(.|\s)*[a-zA-Z]+(.|\s)*$/
);

export const validDiscountPercentage = new RegExp(
  // Valid Discount Percentage
  // /^[1-9][0-9]?$|^100$/
  /^(?=.*\d)\d{0,2}(?:\.\d{0,2})?$/
);
