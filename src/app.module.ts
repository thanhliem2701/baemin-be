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

@Module({
  imports: [MenuModule, BanneritemsModule, CompaniesModule, BranchesModule, BranchmenuModule, ComboFoodsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
