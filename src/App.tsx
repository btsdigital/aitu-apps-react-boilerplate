import React, {FC, useEffect, useState} from 'react'
import aituBridge from '@btsd/aitu-bridge'
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
	IonList,
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

const App: FC = () => {
	const [tasks, setTasks] = useState<TTask[]>([]),
		[showModal, setShowModal] = useState(false),
		[content, setContent] = useState(''),
		[showToast, setShowToast] = useState(false)

	const getTasks = async () => {
		try {
			const data = await aituBridge.storage.getItem('tasks'),
				parsed = JSON.parse(data!) as TTask[]
			setTasks(parsed)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (aituBridge.isSupported()) {
			getTasks().then()
		}
	}, [])

	const createTask = async () => {
		if (!content)
			setShowToast(true)
		else if (aituBridge.isSupported()) {
			const data = await aituBridge.storage.getItem('tasks')
			let parsed = JSON.parse(data!) as TTask[]
			const newTask: TTask = {
				id: parsed.length,
				content,
				isCompleted: false
			}
			parsed.push(newTask)
			await aituBridge.storage.setItem('tasks', JSON.stringify(parsed))
		}
	}

	return (
		<IonApp>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Tasks</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					{tasks.map(task => <Task key={task.id} data={task}/>)}
				</IonList>
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
						<IonInput value={content} placeholder='Enter task' autofocus
								  onIonChange={e => setContent(e.detail.value!)}/>
					</IonItem>
					<IonButton expand='full' onClick={createTask}>Create</IonButton>
				</IonModal>
				<IonToast position='top' isOpen={showToast} duration={1000}
						  onDidDismiss={() => setShowToast(false)} message='Enter some content.'
				/>
				<pre>
					{JSON.stringify(tasks, null, 2)}
				</pre>
			</IonContent>
		</IonApp>
	)
}

export default App
