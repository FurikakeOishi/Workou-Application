import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule ,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  private readonly apiUrl = environment.DATABASE_URL;
  
  exerciseList: any|'';

  addWorkoutForm = this.fb.group({
    duration: ['', [Validators.required]],
    date: ['', Validators.required],
    name: ['', Validators.required],
    timeatcompletion: ['', Validators.required],
    exercises: this.fb.array([])
  });

  exerciseForm = this.fb.group({
    exerciseName: ['', [Validators.required]],
  }) 
  

  get getExercises(){
    return  this.addWorkoutForm.controls["exercises"] as FormArray;
  }


  addExercise() {
    //console.log(`this is the name ${exerciseForm.controls.exerciseName}`)
    this.getExercises.push(this.exerciseForm)
  }


  get duration() {
    return this.addWorkoutForm.get('duration');
  }

  get name() {
    return this.addWorkoutForm.get('name');
  }

  get timeatcompletion() {
    return this.addWorkoutForm.get('timeatcompletion');
  }

  get date() {
    return this.addWorkoutForm.get('date');
  }


  //called on new workout submit
  submit() {
    const { date, timeatcompletion, name, duration, exercises } = this.addWorkoutForm.value;

    const url = `${this.apiUrl}/createworkout/${this.usersService.currentUserUid$}`;
    console.log(url);
    const data = {date, timeatcompletion, name, duration, exercises}
    console.log(data)
    this.http.post<any>(url,data).subscribe(data=>{
      console.log('returned to front');
      this.router.navigate(['/home']);
    })
  }   

  ngOnInit(): void {
    const url = `${this.apiUrl}/getexercises/`;
    console.log(url);
    // 1. GET http req to the url
    this.http.get<any>(url).subscribe(data=>{
      console.log(data);
      this.exerciseList = data;
    })
  }
} 
