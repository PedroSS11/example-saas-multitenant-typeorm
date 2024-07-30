import { AppServer } from './server';

function bootstrap() {
  const app = new AppServer(3000);
  app.start();
}

bootstrap();
