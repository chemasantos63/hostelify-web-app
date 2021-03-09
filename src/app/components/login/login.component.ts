import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  async handleSubmit() {
    console.log(this.loginForm.value);
    const loginResponse = await this.authService.singin(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    console.log(loginResponse);

    localStorage.setItem(`currentToken`, loginResponse.token);
  }
  ngOnInit(): void {}
}
