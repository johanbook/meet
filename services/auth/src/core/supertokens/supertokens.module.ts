import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from "@nestjs/common";

import {
  ConfigInjectionToken,
  SupertokensModuleConfig,
} from "./supertokens.interface";
import { AuthMiddleware } from "./supertokens.middleware";
import { SupertokensService } from "./supertokens.service";

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class SupertokensModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }

  static forRoot({
    connectionURI,
    appInfo,
  }: SupertokensModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: SupertokensModule,
    };
  }
}
