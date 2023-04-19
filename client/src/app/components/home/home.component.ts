import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  workouts: any;

  user$ = this.usersService.currentUserProfile$;
  

  constructor(
    private usersService: UsersService,
    private http: HttpClient,
    ) {}

  private readonly apiUrl = environment.DATABASE_URL;
  
  //get workouts on page load
  ngOnInit(): void {
    const url = `${this.apiUrl}/getworkouts/${this.usersService.currentUserUid$}`;
    this.http.get<any>(url).subscribe(data=>{
      this.workouts = data;
    })
  }

  //delete workout by it's uid
  deleteWorkout(workoutId: string){
    console.log(`deleting ${workoutId}`)

    const url = `${this.apiUrl}/deleteworkout/${workoutId}`;

    console.log(url);

    this.http.delete<any>(url).subscribe(data=>{
      console.log(data);
      location.reload();
    })
  }

}
