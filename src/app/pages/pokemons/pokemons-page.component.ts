import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import type { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {

  isLoading = signal(true);
  pokemons = signal<SimplePokemon[]>([]);

  private pokemonsServices = inject(PokemonsService);


  route = inject(ActivatedRoute);
  router = inject(Router);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => isNaN(+page) ? 1 : + page),
      map(page => Math.max(1, page)),
    ),
  )

  ngOnInit() {

    this.loadPokemons(0);
  }

  public loadPokemons(page = 0) {

    const pageToLoad = this.currentPage()! + page;
    console.log('pageToLoad', pageToLoad);

    this.pokemonsServices.loadPage(pageToLoad)
      .pipe(
        tap(() => {
          this.router.navigate([], { queryParams: { page: pageToLoad } });
        }),
      ).subscribe((res) => {
        this.pokemons.set(res);
      });
  }


}
