import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { BanneritemsModule } from './banneritems/banneritems.module';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { BranchmenuModule } from './branchmenu/branchmenu.module';


@Module({
  imports: [MenuModule, BanneritemsModule, CompaniesModule, BranchesModule, BranchmenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
