import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { GET_PROJECTS } from '../queries/projectQueries'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { useMutation } from '@apollo/client'
import { Project } from '../__generated__/graphql'

export default function DeleteProjectButton({
	projectId,
}: {
	projectId: string
}) {
	const navigate = useNavigate()
	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: { id: projectId },
		onCompleted: () => navigate('/'),
		refetchQueries: [{ query: GET_PROJECTS }],
		// TODO: find out why this doesn't work
		// update(cache, { data: { deleteProject } }) {
		// 	const { projects } = cache.readQuery({ query: GET_PROJECTS }) as {
		// 		projects: Project[]
		// 	}
		// cache.writeQuery({
		// 	query: GET_PROJECTS,
		// 	data: {
		// 		projects: projects.filter(project => project.id !== deleteProject.id),
		// 	},
		// })
		// },
	})

	const handleClick = () => {
		if (window.confirm('Are you sure you want to delete this project?')) {
			try {
				deleteProject({ variables: { id: projectId } })
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<div className='d-flex mt-5 ms-auto'>
			<button className='btn btn-danger m-2' onClick={handleClick}>
				<FaTrash className='icon' /> Delete Project
			</button>
		</div>
	)
}
