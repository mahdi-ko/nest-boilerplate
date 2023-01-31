import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Job, Service, User } from '@prisma/client';
import { Pagination } from 'src/core/decorators/pagination.decorator';
import { UserService } from 'src/services/user/user.service';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import {
  GetPaginateResponse,
  PaginationInput,
} from '~/src/core/utils/commonTypes/pagination.types';
import { deleteResponse } from '~/src/core/utils/commonTypes/response.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { multerOptions } from '~/src/core/utils/helpers/multerOptions.utils';

import { CreateUserDto } from './dto/addUser.dto';
import { GetJobsQueryDto } from './dto/getUserJobs.dto';
import { GetUsersQueryDto } from './dto/getUsers.dto';
import { GetUserResponse } from './dto/response';
import { UpdateSelfDto } from './dto/updateSelf.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserObject } from './dto/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN', 'MEMBER')
  @Get('/getMe')
  getMe(@AuthUser() { id }: TokenUser): GetUserResponse {
    return this.userService.getSelf(id);
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/updateSelf')
  updateSelf(
    @AuthUser() { id }: TokenUser,
    @Body() input: UpdateSelfDto,
  ): GetUserResponse {
    return this.userService.updateSelf(id, input);
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/updateSelfImage')
  @UseInterceptors(
    FileInterceptor('image', multerOptions('./public/images/user/', false)),
  )
  updateSelfImage(
    @AuthUser() { id }: TokenUser,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imagePath = image?.path.replace('public', '');
    return this.userService.updateSelfImage(id, imagePath);
  }

  /**
   *for params and response explanation
   *@see [Pagination] at (src\core\decorators\pagination.decorator.ts)
   */

  @Roles('ADMIN')
  @Get()
  getUsers(
    @Query() params: GetUsersQueryDto,
    @Pagination() paginationInput: PaginationInput,
  ): GetPaginateResponse<UserObject[]> {
    return this.userService.getUsers(paginationInput, params);
  }

  @Get('/:userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get('/jobs/:userId')
  async getUserJobs(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() input: GetJobsQueryDto,
  ): Promise<Job[]> {
    return this.userService.getUserJobs(userId, input);
  }

  @Get('/services/:userId')
  async getUserServices(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Service[]> {
    return this.userService.getUserServices(userId);
  }

  @Roles('ADMIN')
  @Post()
  addUser(@Body() input: CreateUserDto): GetUserResponse {
    return this.userService.addUser(input);
  }

  @Roles('ADMIN')
  @Put('/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() input: UpdateUserDto,
  ): GetUserResponse {
    return this.userService.updateUser(userId, input);
  }

  @Roles('ADMIN')
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): GetUserResponse {
    return this.userService.deleteUser(userId);
  }

  @Roles('ADMIN')
  @Delete('/')
  clearUsers(): deleteResponse {
    return this.userService.clearUsers();
  }
}
