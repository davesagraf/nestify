import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from 'src/entity/lecture.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from 'src/entity/interface/userEntity.interface';
import { IApplyData } from 'src/entity/interface/lectureEntity.interface';
import { User } from 'src/entity/user.entity';

@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lectures')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Post()
  async createLecture(@Body() createLectureDto: CreateLectureDto) {
    return await this.lectureService.createLecture(createLectureDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/apply')
  async applyLecture(@Body() applyData: IApplyData): Promise<Omit<User[], 'password'>> {
    return await this.lectureService.applyLecture(applyData);
  }

  @Get()
  async getAllLectures(): Promise<Lecture[]> {
    return await this.lectureService.getAllLectures();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:lectureId/users')
  async getAllLectureUsers(@Param('lectureId') lectureId: string): Promise<Omit<User[], 'password'>> {
    return await this.lectureService.getAllLectureUsers(+lectureId);
  }

  @Get('/:lectureId')
  async getLecture(@Param('lectureId', ParseIntPipe) id: string) {
    return await this.lectureService.getLecture(+id);
  }

  @Put('/:lectureId')
  async update(
    @Param('lectureId') id: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    return await this.lectureService.updateLecture(+id, updateLectureDto);
  }

  @Delete('/:lectureId')
  async remove(@Param('lectureId') id: string) {
    return await this.lectureService.deleteLecture(+id);
  }
}
