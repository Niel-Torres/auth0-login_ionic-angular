import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {

  user = {
    picture: './../../../assets/img/avatar-login.JPG',
    name: 'Niel',
    email: 'niel.torres08@gmail.com'
  };

  constructor() { }

  ngOnInit() {}

}
