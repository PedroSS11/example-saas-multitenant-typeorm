import { AppServer } from './server';
import 'tsconfig-paths/register';

function bootstrap() {
  const app = new AppServer(3000);
  app.start();
}

bootstrap();
