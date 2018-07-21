import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datafield',
  templateUrl: './datafield.component.html',
  styleUrls: ['./datafield.component.css']
})
export class DatafieldComponent implements OnInit {
  @Input() label: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
