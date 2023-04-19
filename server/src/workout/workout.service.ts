import { Injectable } from '@nestjs/common';
import { firestore } from "firebase-admin";
import * as firebase from 'firebase-admin';
var path = require("path");

import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;

import { Workout } from 'src/dto/workout.dto';

firebase.initializeApp({
    credential: firebase.credential.cert(path.resolve("./src/auth/firebaseServiceAccount.json")),
    databaseURL:'https://brain-project-a5a36.firebasedatabase.app',
})



@Injectable()
export class WorkoutService {

    db = firebase.firestore();

    getWorkoutsForUser(uid: string): any{
        return this.db.collection('workouts')
      .where("userId", "==", uid)
      .get()
      .then(async (querySnapshot: any) => {
        if (querySnapshot.empty) {
          return [];
        }

        const workouts: Workout[] = [];
        for (const doc of querySnapshot.docs) {
            workouts.push(await this.transformWorkout(doc));
        }
        return workouts;
      });
    }

    //transform exercise id to readable name of exercise
    private async transformWorkout(querySnapshot: DocumentSnapshot<Workout>) {
        if (!querySnapshot.exists) {
          throw new Error(`no workout found with the given id`);
        }
        const workout = querySnapshot.data();
        console.log(workout.exerciselist === undefined)
        return {
          id: querySnapshot.id,
          exerciseNames: workout.exerciselist === undefined ? ['no exercises']:await this.exerciseIdToName(workout.exerciselist),
          ...workout
        };
    }

    private async exerciseIdToName(idArray: string[]){
      const names: string[] = [];
      for(const id of idArray){
            names.push(await this.idtoname(id))
      }
      return names;
    }

    private idtoname(id: string): any{
      return this.db.collection('exercises').where(firebase.firestore.FieldPath.documentId(),"==",id).get().then((data)=>{
        return data.docs[0].data().name
      })
    }

    createNewWorkout(uid: string, data: any){
      const newData ={
        name: data.name,
        duration: data.duration,
        date: data.date,
        timeatcompletion: data.timeatcompletion,
        userId: uid,
        exerciselist: data.exercises.length === 0 ? [] : data.exercises[0].exerciseName,
      }
      this.db.collection('workouts').add(newData).then((doc)=>{
        console.log(doc.id)
      })
       console.log('this is the data for the new workout: '+ JSON.stringify(data))
    }

    async deleteWorkoutById(workoutUid: string){
      await this.db.collection('workouts').doc(workoutUid).delete()
      console.log(`Document with UID ${workoutUid} has been deleted from workouts`)
    }
}