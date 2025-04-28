import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {

  pokemonServices = inject(PokemonsService);
  route = inject(ActivatedRoute);

  pokemon = signal<Pokemon | null>(null);

  private title = inject(Title);
  private meta = inject(Meta);



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.pokemonServices.loadPokemon(id).pipe(
      tap(pokemon => {
        const pageTitle = `#${pokemon.id} - ${pokemon.name}`;
        const description = `Página de pokemon ${pokemon.name}`
        this.title.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'og:title', content: pageTitle });
        this.meta.updateTag({ name: 'og:description', content: description });
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` });
      })
    ).subscribe(pokemon => {
      this.pokemon.set(pokemon);
    });
  }
}
