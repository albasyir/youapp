import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { ProfileService } from 'src/profile/profile.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }
  
  private async getCurrentUserOnSocketRequest(client: Socket) {
    const token = client.handshake.auth.token;

    if (!token) {
      this.logger.error("unauthorized user try connect, because token isnt found")
      client.disconnect()
      throw new UnauthorizedException("token not found");
    }

    const sessionUser = await this.authService.verifyToken(token).catch(e => {
      this.logger.error("unauthorized user try connect, because invalid token")
      throw e;
    });

    const user = await this.userService.findByUserId(sessionUser.sub);

    if (!user) {
      this.logger.error("unauthorized user try connect, because user not found");
      throw new UnauthorizedException();
    }

    return user;
  }

  afterInit(server: Server) {
    this.logger.log("WebSocket chat gateway Initialized");
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.getCurrentUserOnSocketRequest(client);

    this.logger.log(`Client connected ${client.id} by user id ${user.username}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat.world')
  async handleMessage(client: Socket, text: string): Promise<void> {
    const user = await this.getCurrentUserOnSocketRequest(client);

    this.server.emit('chat.world.reply', {
      username: user.username,
      text
    });
  }
}
