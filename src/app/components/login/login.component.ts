import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  
  loading = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  

  constructor(private authService: AuthService, private tokenStorage: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    console.log('Calling login');
    this.loading = true;
    this.authService.login(this.loginForm.value)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.loading = false;
        console.log(e)
      }
    })
    // .subscribe((data) => {
    //   console.log(data)
    //   this.tokenStorage.saveToken(data.token);
    //   this.tokenStorage.saveUser(data);
    //   this.isLoginFailed = false;
    //   this.isLoggedIn = true;
    //   this.reloadPage();
    // })
    // .subscribe({
    //   next: (data) => {
    //     console.log(data)
    //     this.tokenStorage.saveToken(data.accessToken);
    //     this.tokenStorage.saveUser(data);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     // this.roles = this.tokenStorage.getUser().roles;
    //     this.reloadPage();
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //     this.loading = false
    //   },
    //   complete: () => {
    //     console.log('Ended')
    //     this.loading = false
    //   }
    // });
  }

  reloadPage(): void {
    window.location.reload();
  }
}