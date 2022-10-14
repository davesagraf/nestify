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
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from 'src/entity/lecture.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/entity/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';

@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lectures')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Post()
  createLecture(@Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.createLecture(createLectureDto);
  }

  @Get()
  getAllLectures(): Promise<Lecture[]> {
    return this.lectureService.getAllLectures();
  }

  @Get(':lectureId')
  getLecture(@Param('lectureId', ParseIntPipe) id: string) {
    return this.lectureService.getLecture(+id);
  }

  @Put(':lectureId')
  update(
    @Param('lectureId') id: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    return this.lectureService.updateLecture(+id, updateLectureDto);
  }

  @Delete(':lectureId')
  remove(@Param('lectureId') id: string) {
    return this.lectureService.deleteLecture(+id);
  }
}
