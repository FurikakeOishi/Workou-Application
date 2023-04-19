import { Controller, Get, Param, Header, Post, Body, Delete } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService){};

    @Get('getworkouts/:uid')
    //disable the CORS
    @Header('Access-Control-Allow-Origin', '*')
    getWorkouts(@Param('uid') uid: string): any {
      return this.workoutService.getWorkoutsForUser(uid);
    }

    @Post('createworkout/:uid')
    //disable the CORS
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Credentials','true')
    createWorkout(@Param('uid') uid: string, @Body() data:any): any {
      return this.workoutService.createNewWorkout(uid, data);
    }

    @Delete('deleteworkout/:uid')
    //disable the CORS
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Credentials','true')
    deleteWorkout(@Param('uid') uid: string): any {
      return this.workoutService.deleteWorkoutById(uid);
    }

}
