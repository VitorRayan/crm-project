import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(body: any) {
    return await this.prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        role: 'CLIENT',
      },
    });
  }
  async login(body: any) {
  const user = await this.prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== body.password) {
    throw new Error('Invalid password');
  }

  const { password, ...userWithoutPassword } = user;

  return {
    message: 'Login successful',
    user: userWithoutPassword,
  };
}
}

