import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
interface register {
  email: string;
  password: string;
  name: string;
}
interface login {
  email: string;
  password: string;
}
interface response {
  message: string;
  token?: string;
  status: number;
}
const jwt_secret: string = process.env.JWT_SECRET as string;
export class AuthService {
  async register(params: register): Promise<response> {
    try {
      const check = await prisma.user.findUnique({
        where: {
          email: params.email,
        },
      });
      if (check) {
        return { message: "User email already exists", status: 400 };
      }
      const user = await prisma.user.create({
        data: {
          email: params.email,
          password: params.password,
          name: params.name,
        },
      });
      const token = jwt.sign({ name:user.name,email:user.email }, jwt_secret, { expiresIn: "7d" });
      return { message: "User registered successfully",token:token, status: 200 };
    } catch (e) {
      console.log(e);
      return { message: "User registration failed", status: 500 };
    }
  }
  async login(params: login): Promise<response> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: params.email,
        },
      });
      if (!user) {
        return { message: "User not found", status: 404 };
      }
      if (user.password !== params.password) {
        return { message: "Invalid password", status: 401 };
      }
      const token = jwt.sign({ name:user.name,email:user.email }, jwt_secret, { expiresIn: "7d" });
      return { message: "User logged in successfully",token:token, status: 200 };
    } catch (e) {
      console.log(e);
      return { message: "User login failed", status: 500 };
    }
  }
}
