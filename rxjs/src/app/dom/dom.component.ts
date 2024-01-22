import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styleUrls: ['./dom.component.scss']
})
export class DomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.dir('consoles whole document in object format',document)
    // console.log('get all forms', document.forms);

  }

}
