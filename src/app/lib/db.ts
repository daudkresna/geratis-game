import prisma from "./prisma";

export const addNewUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const bcrypt = require("bcrypt");
  const saltRounds: number = 10;
  const genSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword: string = await bcrypt.hash(password, genSalt);

  // const user = await prisma.user.create({
  //     data: {
  //         name,
  //         email,
  //         hashedPassword: await bcrypt.hash(password),
  //     },
  // });
};
