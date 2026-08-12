import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { Post, Body, Req } from '@nestjs/common';
import { ClientEntity } from './entity/client.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

   
    @Post('register')
    async register(@Body() clientDto: ClientDto): Promise<{ user: ClientEntity }> {
        return this.clientService.register(clientDto);
    }   

    @Post('login')
    async login(@Body() clientDto: ClientDto): Promise<{ user: ClientEntity, access_token: string }> {
        return this.clientService.login(clientDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async profile(@Req() req: { user: { id: number, email: string } }): Promise<ClientEntity> {
        return this.clientService.profile(req.user);
    }
}
