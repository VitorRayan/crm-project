import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClientsModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
