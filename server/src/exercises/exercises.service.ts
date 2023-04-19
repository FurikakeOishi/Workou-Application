import { Injectable } from '@nestjs/common';
import { firestore } from "firebase-admin";
import * as firebase from 'firebase-admin';
var path = require("path");

import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;
import { Exercise } from 'src/dto/exercise.dto';



@Injectable()
export class ExercisesService {

    db = firebase.firestore();

    getAllExercises():any{
        return this.db.collection('exercises')
        .get()
        .then((querySnapshot: any) => {
            if (querySnapshot.empty) {
            return [];
            }

            const exercises: Exercise[] = [];
            for (const doc of querySnapshot.docs) {
                exercises.push(this.transformExercise(doc));
            }
            return exercises;
        });
    }

    private transformExercise(querySnapshot: DocumentSnapshot<Exercise>) {
        if (!querySnapshot.exists) {
          throw new Error(`no exercise found with the given id`);
        }
        const exercise = querySnapshot.data();
        return {
          id: querySnapshot.id,
          ...exercise,
        };
    }

    createNewExercise(uid: string, data: any):any{
        const newData ={
          name: data.name,
          description: data.description,
          musclegroup: data.musclegroup,
        }
        this.db.collection('exercises').add(newData).then((doc)=>{
          console.log(doc.id)
        })
         console.log('this is the data for the new exercise: '+ JSON.stringify(data))
    }
}
