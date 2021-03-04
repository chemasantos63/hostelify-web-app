import { RoomerService } from './../../services/roomer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roomer',
  templateUrl: './roomer.component.html',
  styleUrls: ['./roomer.component.sass'],
})
export class RoomerComponent implements OnInit {
  roomerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private roomerService: RoomerService
  ) {
    this.roomerForm = this.formBuilder.group({
      names: '',
      lastNames: '',
      documentNumber: '',
      nacionality: '',
      provenance: '',
      destination: '',
      occupation: '',
      phone: -1,
    });
  }
  async handleSubmit() {
    await this.roomerService.createRoomer(
      this.roomerForm.value.names,
      this.roomerForm.value.lastNames,
      this.roomerForm.value.documentNumber,
      this.roomerForm.value.nacionality,
      this.roomerForm.value.provenance,
      this.roomerForm.value.destination,
      this.roomerForm.value.occupation,
      this.roomerForm.value.phone
    );
  }
  ngOnInit(): void {}
}
