import { z } from "zod";

const User = z.object({
  name: z.string().min(5, { message: "Name too short" }),
  email: z.string().email(),
  password: z.string().min(5, { message: "Password too short" }),
});

export type User = z.infer<typeof User>;

export const validationUser = ({ data }: { data: User }) => {
  const newUser = User.safeParse(data);

  if (!newUser.success) {
    let errorMessage: string = "";
    newUser.error?.issues.forEach((issue) => {
      errorMessage += issue.message + "\n";
    });
    return { success: false, error: errorMessage };
  } else {
    return newUser;
  }
};
