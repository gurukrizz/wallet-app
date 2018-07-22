import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('userId') != null) {
      this.router.navigate(['/home']);
    }
  }

  /**
   *  Function to login into the app using credentials.
   * @param username Username  from the form to login
   * @param password Password  from the form to login
   */
  onLogin(username, password): void {
    /*
    * We are saving the user id in the local storage to check user is authenticated to access the information.
    * We are saving the user id instead a security token because the original user auth is done via mock data.
    */
    this.userService.getUser(username).subscribe(
      (user) => {
        if (user.password === password){
          localStorage.setItem('userId', user.id);
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
