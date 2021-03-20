import React, {FC, useEffect, useState} from 'react'
// import aituBridge from '@btsd/aitu-bridge'
import {
	IonApp,
	IonButton,
	IonButtons,
	IonContent,
	IonFab,
	IonFabButton,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonModal,
	IonTitle,
	IonToast,
	IonToolbar
} from '@ionic/react'

import './App.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import {Task} from './components/Task'
import {add} from 'ionicons/icons'

export type TTask = {
	id: number
	content: string | null
	isCompleted: boolean
}

export type TTasks = { [id: number]: TTask }

const App: FC = () => {
	// localStorage.removeItem('tasks')
	// return <></>

	const [upcomingTasks, setUpcomingTasks] = useState<TTasks>({}),
		[completedTasks, setCompletedTasks] = useState<TTasks>({}),
		[showModal, setShowModal] = useState(false),
		[content, setContent] = useState(''),
		[showToast, setShowToast] = useState(false)

	const getTasks = async () => {
		try {
			const data = await localStorage.getItem('tasks'),
				parsed = JSON.parse(data!) as TTasks
			const parsedUpcomingTasks: TTasks = {}
			for (const taskId in parsed) {
				if (parsed.hasOwnProperty(taskId) && !parsed[taskId].isCompleted)
					parsedUpcomingTasks[taskId] = parsed[taskId]
			}
			const parsedCompletedTasks: TTasks = {}
			for (const taskId in parsed) {
				if (parsed.hasOwnProperty(taskId) && parsed[taskId].isCompleted)
					parsedCompletedTasks[taskId] = parsed[taskId]
			}
			setUpcomingTasks(parsedUpcomingTasks)
			setCompletedTasks(parsedCompletedTasks)
		} catch (e) {
		}
	}

	useEffect(() => {
		getTasks().then()
	}, [])

	const createTask = () => {
		if (!content)
			setShowToast(true)
		const data = localStorage.getItem('tasks')
		let parsed = JSON.parse(data || '[]') as TTasks
		const newTask: TTask = {
			id: Object.keys(parsed).length,
			content,
			isCompleted: false
		}
		parsed[newTask.id] = newTask
		setUpcomingTasks(prevState => {
			prevState[newTask.id] = newTask
			return prevState
		})
		localStorage.setItem('tasks', JSON.stringify(parsed))
		setContent('')
		setShowModal(false)
	}

	const updateTask = async (id: number, completed: boolean) => {
		const task = upcomingTasks[id] || completedTasks[id]
		if (completed) {
			task.isCompleted = true
			await setCompletedTasks(prevState => {
				const newState = {...prevState}
				newState[id] = task
				return newState
			})
			await setUpcomingTasks(prevState => {
				const newState = {...prevState}
				delete newState[id]
				return newState
			})
		} else {
			task.isCompleted = false
			await setCompletedTasks(prevState => {
				const newState = {...prevState}
				delete newState[id]
				return newState
			})
			await setUpcomingTasks(prevState => {
				const newState = {...prevState}
				newState[id] = task
				return newState
			})
		}
		localStorage.setItem('tasks', JSON.stringify({...completedTasks, ...upcomingTasks}))
	}

	const deleteTask = async (id: number) => {
		if (id in upcomingTasks) {
			await setUpcomingTasks(prevState => {
				const newState = {...prevState}
				delete newState[id]
				return newState
			})
		} else {
			await setCompletedTasks(prevState => {
				const newState = {...prevState}
				delete newState[id]
				return newState
			})
		}
		localStorage.setItem('tasks', JSON.stringify({...completedTasks, ...upcomingTasks}))
	}

	return (
		<IonApp>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Tasks</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{Object.keys(upcomingTasks).length ? (
					<IonList>
						<IonListHeader>
							<IonLabel>
								Upcoming
							</IonLabel>
						</IonListHeader>
						{Object.keys(upcomingTasks).map(taskId => {
							const task = upcomingTasks[parseInt(taskId)]
							return <Task key={task.id} data={task} updateTask={updateTask} deleteTask={deleteTask}/>
						})}
					</IonList>
				) : <></>}
				{Object.keys(completedTasks).length ? (
					<IonList>
						<IonListHeader>
							<IonLabel>
								Completed
							</IonLabel>
						</IonListHeader>
						{Object.keys(completedTasks).map(taskId => {
							const task = completedTasks[parseInt(taskId)]
							return <Task key={task.id} data={task} updateTask={updateTask} deleteTask={deleteTask}/>
						})}
					</IonList>
				) : <></>}
				<IonFab vertical='bottom' horizontal='end' slot='fixed'>
					<IonFabButton onClick={() => setShowModal(true)}>
						<IonIcon icon={add}/>
					</IonFabButton>
				</IonFab>
				<IonModal isOpen={showModal}>
					<IonHeader>
						<IonToolbar>
							<IonTitle>Create task</IonTitle>
							<IonButtons slot='end'>
								<IonButton expand='full' onClick={() => setShowModal(false)}>Close</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonItem>
						<IonInput value={content} placeholder='Enter task' autofocus={true}
								  onIonChange={e => setContent(e.detail.value!)}/>
					</IonItem>
					<IonButton expand='full' onClick={createTask}>Create</IonButton>
				</IonModal>
				<IonToast position='top' isOpen={showToast} duration={1000}
						  onDidDismiss={() => setShowToast(false)} message='Enter some content.'
				/>
			</IonContent>
		</IonApp>
	)
}

export default App
