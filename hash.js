import bcrypt from "bcryptjs";

async function makeHash() {
  const password = "Iniprojectbk2025"; // ganti password admin di sini
  const hash = await bcrypt.hash(password, 12);

  console.log("Password Hash:", hash);
}

makeHash();
