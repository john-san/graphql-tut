import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'
import { Client } from '../__generated__/graphql'

export default function ClientRow({ client }: { client: Client }) {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		// update(cache, { data: { deleteClient } }) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS }) as {
		// 		clients: Client[]
		// 	}

		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: {
		// 			clients: clients.filter(
		// 				(client: Client) => client.id !== deleteClient.id
		// 			),
		// 		},
		// 	})
		// },
	})

	const clickHandler = () => {
		deleteClient()
	}

	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className='btn btn-danger btn-sm' onClick={clickHandler}>
					<FaTrash />
				</button>
			</td>
		</tr>
	)
}
