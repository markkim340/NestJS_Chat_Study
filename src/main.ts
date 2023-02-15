import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as mysqlStore from 'express-mysql-session';
import { sessionStoreOptions } from './common/sessionStoreOptions';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
      store: new mysqlStore(sessionStoreOptions),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
  console.log(`🔰listening on port ${PORT}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
