import Api from "../index";

export type Pokemon = {
    name: "pikachu";
};

export class _PokemonApi {
    api: Api;

    constructor() {
        this.api = new Api("https://pokeapi.co/api/v2");
    }

    async getPokemon(): Promise<Pokemon[]> {
        const response = await this.api.get("/pokemon/ditto");

        return response.data as Pokemon[];
    }
}

export const PokemonApi = new _PokemonApi();
