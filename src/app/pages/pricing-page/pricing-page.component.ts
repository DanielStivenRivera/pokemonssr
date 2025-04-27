import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);


  ngOnInit() {
    /* if (!isPlatformServer(this.platform)) {
      document.title = 'Pricing Page';
    } */
    this.title.setTitle('pricing page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi pricing page' });
    this.meta.updateTag({ name: 'og:tittle', content: 'pricing page' });
    this.meta.updateTag({ name: 'keywords', content: 'angular, pricing, page' });
  }

}
