import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { Project } from '../__generated__/graphql'

export default function EditProjectForm({ project }: { project: Project }) {
	const [name, setName] = useState(project.name)
	const [description, setDescription] = useState(project.description)
	const [status, setStatus] = useState('')

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
		// TODO: figure out how to update the cache
		// update(cache, { data: { updateProject } }) {
		// 	cache.writeQuery({
		// 		query: GET_PROJECT,
		// 		variables: { id: project.id },
		// 		data: { project: updateProject },
		// 	})
		// },
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (name === '' || description === '' || status === '') {
			return alert('Please fill all fields')
		}

		try {
			updateProject({
				variables: { id: project.id, name, description, status },
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='mt-5'>
			<h3>Update Project Details</h3>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label htmlFor='name' className='form-label'>
						Name
					</label>
					<input
						type='text'
						className='form-control'
						id='name'
						value={name ?? ''}
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
						value={description ?? ''}
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
				<button type='submit' className='btn btn-primary '>
					Submit
				</button>
			</form>
		</div>
	)
}
