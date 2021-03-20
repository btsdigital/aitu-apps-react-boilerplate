import React, {FC} from 'react'
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel} from '@ionic/react'
import {TTask} from '../App'
import {checkmarkOutline, trashOutline} from 'ionicons/icons'

type Props = {
	data: TTask
}

export const Task: FC<Props> = ({data}) => {
	return (
		<IonItemSliding>
			<IonItem>
				<IonLabel>
					{data.content}
				</IonLabel>
			</IonItem>
			<IonItemOptions side='end'>
				<IonItemOption className='task-delete-option' slot='icon-only' onClick={() => {
					console.log(`delete ${data.id}`)
				}}>
					<IonIcon icon={trashOutline}/>
				</IonItemOption>
				<IonItemOption className='task-complete-option' slot='icon-only' onClick={() => {
					console.log(`complete ${data.id}`)
				}}>
					<IonIcon icon={checkmarkOutline}/>
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	)
}