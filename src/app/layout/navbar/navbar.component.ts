import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/orders/auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  isAuthorized:boolean=false;
  constructor(private router: Router,private _authService: AuthGuardService) { }

  ngOnInit(): void {
    this.isAuthorized=this._authService.gettoken();
  }
  login(){
    this.router.navigate(['/user/login']);
  }
 
  
}
