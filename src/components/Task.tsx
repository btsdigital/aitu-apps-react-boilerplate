import React, {FC} from 'react'
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from '@ionic/react'
import {TTask} from '../App'
import {checkmarkOutline, closeOutline, trashOutline} from 'ionicons/icons'

type Props = {
	data: TTask,
	updateTask: (id: number, completed: boolean) => void
	deleteTask: (id: number) => void
}

export const Task: FC<Props> = ({data, updateTask, deleteTask}) => {
	return (
		<IonItemSliding>
			<IonItem>
				<IonLabel>
					{data.content}
				</IonLabel>
			</IonItem>
			<IonItemOptions side='end'>
				<IonItemOption color='danger' className='task-delete-option' slot='icon-only' onClick={() => {
					deleteTask(data.id)
				}}>
					<IonIcon icon={trashOutline}/>
				</IonItemOption>
				<IonItemOption color={!data.isCompleted ? 'success' : 'warning'} className='task-complete-option'
							   slot='icon-only' onClick={() => {
					if (!data.isCompleted)
						updateTask(data.id, true)
					else
						updateTask(data.id, false)
				}}>
					{!data.isCompleted ? (
						<IonIcon icon={checkmarkOutline}/>
					) : (
						<IonIcon icon={closeOutline}/>
					)}
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	)
}