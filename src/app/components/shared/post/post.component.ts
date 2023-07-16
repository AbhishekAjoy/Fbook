import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post:string = 'content-loading';
  @Input() userName:string = 'content-loading';
  @Input() date: string = 'content-loading';
  
}
