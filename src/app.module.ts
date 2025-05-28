import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { BanneritemsModule } from './banneritems/banneritems.module';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { BranchmenuModule } from './branchmenu/branchmenu.module';
import { ComboFoodsModule } from './combo_foods/combo_foods.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from './common/common.module';

@Module({
  imports: [MenuModule, BanneritemsModule, CompaniesModule, BranchesModule, BranchmenuModule, 
    ComboFoodsModule, UsersModule, OrdersModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), 
    AuthModule,JwtModule.register({global: true}), CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
