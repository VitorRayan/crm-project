import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ClientsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
