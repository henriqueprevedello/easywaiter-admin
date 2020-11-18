import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  @Input() label: string;
  @Input() total: string;
  @Input() icone = '';
  @Input() corIcone = 'white';

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
