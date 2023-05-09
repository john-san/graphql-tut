import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { Client, Project } from '../__generated__/graphql'
import { GET_CLIENTS } from '../queries/clientQueries'

export default function AddProjectModal() {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [status, setStatus] = useState('')
	const [clientId, setClientId] = useState('')

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, status, clientId },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS }) as {
				projects: Project[]
			}
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			})
		},
	})

	// Get Clients for select
	const { loading, error, data } = useQuery(GET_CLIENTS)

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(name, description, clientId)
		if (name === '' || description === '' || status == '' || clientId === '')
			return alert('Please fill all fields')

		try {
			addProject({ variables: { name, description, status, clientId } })
		} catch (error) {
			console.log(error)
		}

		setName('')
		setDescription('')
		setStatus('new')
		setClientId('')
	}

	if (loading) return null
	if (error) return <p>Something went wrong.</p>
	const clients = data.clients

	return (
		<>
			{!loading && !error && (
				<>
					<button
						type='button'
						className='btn btn-primary'
						data-bs-toggle='modal'
						data-bs-target='#addProjectModal'
					>
						<div className='-flex align-items-center'>
							<FaList className='icon' />
							<div>New Project</div>
						</div>
					</button>

					<div
						className='modal fade'
						id='addProjectModal'
						tabIndex={1}
						aria-labelledby='addProjectModalLabel'
						aria-hidden='true'
					>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title ' id='addProjectModalLabel'>
										New Project
									</h5>
									<button
										type='button'
										className='btn-close'
										data-bs-dismiss='modal'
										aria-label='Close'
									></button>
								</div>
								<div className='modal-body'>
									<form onSubmit={submitHandler}>
										<div className='mb-3'>
											<label htmlFor='name' className='form-label'>
												Name
											</label>
											<input
												type='text'
												className='form-control'
												id='name'
												value={name}
												onChange={e => setName(e.target.value)}
											/>
										</div>
										<div className='mb-3'>
											<label htmlFor='description' className='form-label'>
												Description
											</label>
											<textarea
												className='form-control'
												id='description'
												value={description}
												onChange={e => setDescription(e.target.value)}
											></textarea>
										</div>
										<div className='mb-3'>
											<label htmlFor='status' className='form-label'>
												Status
											</label>
											<select
												name='status'
												id='status'
												className='form-select'
												value={status}
												onChange={e => setStatus(e.target.value)}
											>
												<option value='new'>Not Started</option>
												<option value='progress'>In Progress</option>
												<option value='completed'>Completed</option>
											</select>
										</div>
										<div className='mb-3'>
											<label htmlFor='clientId' className='form-label'>
												Client
											</label>
											<select
												name='clientId'
												id='clientId'
												className='form-select'
												value={clientId}
												onChange={e => setClientId(e.target.value)}
											>
												<option value=''>Select Client</option>
												{clients.map((client: Client) => (
													<option key={client.id} value={client.id ?? ''}>
														{client.name}
													</option>
												))}
											</select>
										</div>
										<button
											type='submit'
											data-bs-dismiss='modal'
											className='btn btn-primary'
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}
