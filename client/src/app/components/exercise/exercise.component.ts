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
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent {

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  private readonly apiUrl = environment.DATABASE_URL;

  addExerciseForm = this.fb.group({
    description: ['', [Validators.required]],
    musclegroup: ['', Validators.required],
    name: ['', Validators.required],
  });

  get description() {
    return this.addExerciseForm.get('description');
  }

  get name() {
    return this.addExerciseForm.get('name');
  }

  get musclegroup() {
    return this.addExerciseForm.get('musclegroup');
  }

  //called on new workout submit
  submit() {
    const { description, musclegroup, name } = this.addExerciseForm.value;

    const url = `${this.apiUrl}/createnewexercise/${this.usersService.currentUserUid$}`;
    console.log(url);
    const data = {description, musclegroup, name}
    console.log(data)
    this.http.post<any>(url,data).subscribe(data=>{
      console.log('returned to front');
      this.router.navigate(['/home']);
    })
  }   

  ngOnInit(): void {
   
  }
} 
