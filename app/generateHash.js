const bcrypt = require("bcryptjs");

bcrypt.hash("passwordguru", 10).then((hash) => {
  console.log("HASH:", hash);
});
