import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}
    async signUp(singUpDto: SignUpDto) {
        const existingUser = await this.userService.findByEmail(singUpDto.email);
        if(existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(singUpDto.password, 10);

        this.userService.create({...singUpDto, password: hashedPassword});

        return {success: true, message: 'User created successfully'};
        
    }

    async signIn(signInDto: SignInDto) {
        const {email, password} = signInDto;
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const arePasswordMatch = await bcrypt.compare(password, user.password);

        if(!arePasswordMatch) {
            throw new BadRequestException('Invalid credentials');
        }

        const jwtPayload = {email: user.email};

        const accessToken = this.jwtService.sign(jwtPayload);

        return {accessToken};
        
    }
}