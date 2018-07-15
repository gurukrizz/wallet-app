import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * This function is to logout of app after deleting the useris from the localstorage.
   * Since we have to login inorder to access the content of our app we can set logout direclty.
   */
  onLogout(): void{
    if (localStorage.getItem('userId')){
      localStorage.removeItem('userId');
    }
    this.router.navigate(['/login']);
  }

}
