import { HttpException, Logger } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private authService: AuthService
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.authService.verifyToken(client.handshake.auth.token).catch((e: HttpException) => {
      this.logger.error("try to connect socket");
      client.disconnect(true);
      throw e;
    })

    this.logger.log(`Client connected ${client.id} by user id ${user.sub}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat.world')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('chat.world.reply', payload);
  }
}
