import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent {

  private title = inject(Title);
  private meta = inject(Meta);


  ngOnInit() {
    this.title.setTitle('contact page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi contact page' });
    this.meta.updateTag({ name: 'og:tittle', content: 'contact page' });
    this.meta.updateTag({ name: 'keywords', content: 'angular, contact, page' });
  }

}
