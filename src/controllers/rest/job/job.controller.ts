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
import { Job } from '@prisma/client';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Pagination } from '~/src/core/decorators/pagination.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import {
  GetPaginateResponse,
  PaginationInput,
} from '~/src/core/utils/commonTypes/pagination.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { multerOptions } from '~/src/core/utils/helpers/multerOptions.utils';
import { StrictValidationPipe } from '~/src/core/validations/validationPipes';
import { JobService } from '~/src/services/job/job.service';

import { CreateJobDto } from './dto/addJob.dto';
import { GetFeaturedJobsQueryDto, GetJobsQueryDto } from './dto/getJobs.dto';
import { JobObject } from './dto/job.model';
import { UpdateJobDto } from './dto/updateJob.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  /**
   *for params and response explanation
   *@see [Pagination] at (src\core\decorators\pagination.decorator.ts)
   */

  @Get()
  getJobs(
    @Query(StrictValidationPipe) params: GetJobsQueryDto,
    @Pagination() paginationInput: PaginationInput,
  ): GetPaginateResponse<{ normal: JobObject[]; premium: JobObject[] }> {
    return this.jobService.getJobs(paginationInput, params);
  }

  @Get('featured')
  getFeaturedJobs(
    @Query(StrictValidationPipe) params: GetFeaturedJobsQueryDto,
  ): Promise<JobObject[]> {
    return this.jobService.getFeaturedJobs(params);
  }

  @Get('/:jobId')
  async getJob(@Param('jobId', ParseIntPipe) jobId: number): Promise<Job> {
    return this.jobService.getJob(jobId);
  }

  @Roles('ADMIN', 'MEMBER')
  @Post()
  @UseInterceptors(
    FileInterceptor('file', multerOptions('./public/images/jobs')),
  )
  addJob(
    @Body() input: CreateJobDto,
    @AuthUser() { id }: TokenUser,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Job> {
    const filePath = file?.path.replace('public', '');
    return this.jobService.createJob(id, { ...input, filePath });
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/:jobId')
  @UseInterceptors(
    FileInterceptor('file', multerOptions('./public/images/jobs')),
  )
  updateJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() input: UpdateJobDto,
    @AuthUser() { id }: TokenUser,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Job> {
    const filePath = file?.path.replace('public', '');
    return this.jobService.updateJob(id, jobId, { ...input, filePath });
  }
  @Roles('ADMIN', 'MEMBER')
  @Delete('/:jobId')
  deleteJob(
    @Param('jobId', ParseIntPipe) jobId: number,
    @AuthUser() { id }: TokenUser,
  ): Promise<Job> {
    return this.jobService.deleteJob(id, jobId);
  }
}
