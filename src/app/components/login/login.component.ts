import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.authService.currentUserValue) {
      this.router.navigate(['home']);
    }
  }
  async handleSubmit() {
    const loginResponse = await this.authService.singin(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    if (!(loginResponse == null)) {
      this.router.navigate(['home']);
    }
  }
  ngOnInit(): void {}
}
