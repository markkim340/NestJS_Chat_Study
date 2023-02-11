import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat() {}

  @Post(':id/chats')
  postChats() {}
}
