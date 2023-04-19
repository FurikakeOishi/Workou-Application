import { Controller,Get, Header, Post, Param , Body} from '@nestjs/common';
import { ExercisesService } from './exercises.service';



@Controller('')
export class ExercisesController {
    constructor(private readonly exerciseService: ExercisesService){};

    @Get('getexercises')
    //disable the CORS
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Credentials','true')
    getWorkouts(): any {
      return this.exerciseService.getAllExercises();
    }

    @Post('createnewexercise/:uid')
    //disable the CORS
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Credentials','true')
    createExercise(@Param('uid') uid: string, @Body() data:any): any {
      return this.exerciseService.createNewExercise(uid, data);
    }
}
