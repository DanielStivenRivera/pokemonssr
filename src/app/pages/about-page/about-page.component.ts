import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent {

  private title = inject(Title);
  private meta = inject(Meta);


  ngOnInit() {
    this.title.setTitle('About page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi about page' });
    this.meta.updateTag({ name: 'og:tittle', content: 'about page' });
    this.meta.updateTag({ name: 'keywords', content: 'angular, about, page' });
  }

}
