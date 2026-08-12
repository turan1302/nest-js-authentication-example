import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entity/client.entity';
import { JwtService } from '@nestjs/jwt';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
    
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
        private readonly jwtService: JwtService,
    ) {}


    async login(clientDto: ClientDto): Promise<{ user: ClientEntity, access_token: string }> {
        try {
            const client = await this.clientRepository.findOne({ where: { email: clientDto.email } });
            if (!client) {
                throw new UnauthorizedException('Invalid credentials');
            }
            
            const payload = { id: client.id, email: client.email };
            const token = this.jwtService.sign(payload);

            return {
                user: client,
                access_token: token
            };

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async register(clientDto: ClientDto): Promise<{ user: ClientEntity }> {
        try {
            const client = await this.clientRepository.findOne({ where: { email: clientDto.email } });
            if (client) {
                throw new BadRequestException('Client already exists');
            }
            const newClient = this.clientRepository.create(clientDto);
            const result = await this.clientRepository.save(newClient);
            return {
                user: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new BadRequestException('Failed to register client');
        }
    }

    async profile(user: { id: number, email: string }): Promise<ClientEntity> {
        try {
            const client = await this.clientRepository.findOne({ where: { id: user.id } });
            if (!client) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return client;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}