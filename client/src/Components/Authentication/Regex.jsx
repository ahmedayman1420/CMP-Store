// ======= --- ======= <| Regex |> ======= --- ======= //

export const validEmail = new RegExp(
  //Valid email
  /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
);

export const validPassword = new RegExp(
  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character;
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=-])[A-Za-z\d@$!%*?&#^()_+=-]{8,}$/
);

export const validName = new RegExp(
  // Valid name
  /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
);
