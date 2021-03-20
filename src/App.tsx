import {FC, useEffect, useState} from 'react'
import aituBridge from '@btsd/aitu-bridge'
import {IonApp, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonList, IonTitle, IonToolbar} from '@ionic/react'

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
	const [tasks, setTasks] = useState<TTask[]>([])

	const getTasks = async () => {
		try {
			const data = aituBridge.storage.getItem('tasks')
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (aituBridge.isSupported()) {
			getTasks().then()
		}
	}, [])

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
					<IonFabButton>
						<IonIcon icon={add}/>
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonApp>
	)
}

export default App
