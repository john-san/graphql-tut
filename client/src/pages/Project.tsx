import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import ClientInfo from '../components/ClientInfo'
import DeleteProjectButton from '../components/DeleteProjectButton'
import EditProjectForm from '../components/EditProjectForm'
export default function Project() {
	const { id } = useParams<{ id: string }>()
	const { loading, error, data } = useQuery(GET_PROJECT, {
		variables: { id },
	})
	if (loading) return <Spinner />
	if (error) return <p>Something went wrong</p>
	const project = data.project
	return (
		<>
			{!loading && !error && (
				<div className='mx-auto w-75 card p-5'>
					<Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
						Back
					</Link>
					<h1>{project.name}</h1>
					<p>{project.description}</p>
					<h5 className='mt-3'>Project</h5>
					<p className='lead'>{project.status}</p>
					<ClientInfo client={project.client} />

					<EditProjectForm project={project} />
					<DeleteProjectButton projectId={project.id} />
				</div>
			)}
		</>
	)
}
