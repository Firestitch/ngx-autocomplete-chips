import { Component, OnInit } from '@angular/core';
import { email } from '@firestitch/common';


@Component({
  selector: 'email-example',
  templateUrl: './email-example.component.html'
})
export class EmailExampleComponent implements OnInit {


  public model = ['bob@email.com'];

  public validateText = (e) => {
    return email(e);
  }

  ngOnInit() {
  }
}
