// Local imports
import { getPokemon } from '@pokebag/data-sdk'
import { Route } from '../../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const { pokemonID } = context.params

			const [POKEMON] = await getPokemon({
				ids: [pokemonID],
				includeSkills: true,
				patch: context.params.patchVersion,
			})

			POKEMON.id = pokemonID

			context.data = {
				pokemon: {
					[pokemonID]: POKEMON,
				},
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	},
	route: '/unite/:patchVersion/pokemon/:pokemonID',
})
