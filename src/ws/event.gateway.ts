import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;
  private users: { [key: string]: Socket } = {};

  @SubscribeMessage('connection')
  async handleConnect(
    @ConnectedSocket() client: Socket,
    @MessageBody() user: string,
  ) {
    this.users[user] = client;
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody()
    { to }: { to: string },
  ): WsResponse<unknown> {
    if (to && this.users[to]) {
      this.users[to].emit('showMessage');
    }
    return;
  }

  //@SubscribeMessage('connection')
  // handleJoinRoom(
  //   @MessageBody() body: { room: string },
  //   @ConnectedSocket() client: Socket,
  // ): void {
  //   const room = body.room;
  //   console.log(`Client ${client.id} joining room ${room}`);
  //   client.join(room);
  // }

  // @SubscribeMessage('roomMessage')
  // handleRoomMessage(
  //   @MessageBody() body: { room: string; ctx: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const room = body.room;
  //   const ctx = body.ctx;
  //   console.log(
  //     `Received room message: ${ctx} from client ${client.id} in room ${room}`,
  //   );
  //   client.to(room).emit('roomMessage', { ctx: ctx });
  // }
}
