import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  errorLogin: boolean= false;
  constructor(private _route: ActivatedRoute, private _userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    console.log("in login page");
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
  login(email:string, password:string){
    console.log(email, password);
    this._userService.login({email:email, password:password}).subscribe(res=>{
      if(res.data){
        localStorage.setItem('token',res.data);
        this.router.navigate(['/products']);
      }
      else
        this.errorLogin = true;
    })
  }

  register(){
    this.router.navigate(['/user/register']);

  }
}

