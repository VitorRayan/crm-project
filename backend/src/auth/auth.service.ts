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
}