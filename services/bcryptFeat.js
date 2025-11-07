import bcrypt from "bcrypt";

const createHashedPassword = async (password) => {
  console.log('salt',process.env.SALT)
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

export { createHashedPassword ,comparePassword};
