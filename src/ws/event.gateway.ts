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

  @SubscribeMessage('connection')
  t(
    @MessageBody()
    data: {
      username: string;
    },
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    client.emit('join', async (client) => {
      client.join(data.username);
    });
    return { event: 'join', data: '服务端推送到客户端' };
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody()
    data: {
      to: string;
    },
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    client.broadcast.emit('showMessage');
    client.emit('showMessage');
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
