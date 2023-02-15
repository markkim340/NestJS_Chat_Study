import { NotLoggedInGaurd } from './../auth/not-logged-in.guard';
import { LocalAuthGuard } from './../auth/local-auth.gaurd';
import { JoinRequestDto } from './dto/join.request.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { getUsers } from 'src/common/users.decorator';
import { Users } from 'src/entities/Users';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.user;
  }

  @UseGuards(NotLoggedInGaurd)
  @Post() //회원가입
  postUsers(@Body() data: JoinRequestDto) {
    const { email, nickname, password } = data;
    return this.usersService.createUsers(email, nickname, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login') //로그인
  logIn(@getUsers() user: Users) {
    // console.log('TEST:', user);
    return user;
  }

  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
