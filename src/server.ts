import * as bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import Logger from "jet-logger";

export class AppServer extends Server {
  private server_port;
  constructor(port: number) {
    super(process.env.NODE_ENV === "development");
    this.initializeMiddlewares();
    // this.setupControllers();
    this.server_port = port;
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  //   private setupControllers(): void {
  //     // EXAMPLE
  //     const dbConnObj = new SomeDbConnClass("credentials");

  //     const userController = new UserController(dbConnObj);
  //     const signupController = new SignupController(dbConnObj);

  //     super.addControllers([userController, signupController]);
  //   }

  public start(): void {
    this.app.listen(this.server_port, () => {
      Logger.imp("Server listening on port: " + this.server_port);
    });
  }
}
