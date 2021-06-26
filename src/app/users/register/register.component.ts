import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from '../login/login.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  errorLogin: boolean= false;
  constructor(private _route: ActivatedRoute, private _userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

//must add event.prevent?
  hidePassword(event:any){
    this.hide = !this.hide;
    event.peventDefault();
    
  }
  register(email:string, password:string){
    console.log(email, password);
    this._userService.register({email:email, password:password}).subscribe(res=>{
      if(res.data){
        localStorage.setItem('token',res.data);
        this.router.navigate(['/products']);
      }
      else
        this.errorLogin = true;
    })
  }

  login(){
    this.router.navigate(['/user/login']);
  }
}
