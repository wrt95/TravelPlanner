import { ReactElement, ChangeEvent } from 'react';
import classes from './ActivityRow.module.css';
import { Input } from '../../Input';
import { TripActivity } from '../../../types/TripDay';
import { Button } from '../../Button';

type ActivityRowProps = {
	activity: TripActivity;
	onChange: (field: keyof TripActivity, value: string) => void;
	onImageUpload: (file: File) => void;
};

export const ActivityRow = ({
	activity,
	onChange,
	onImageUpload,
}: ActivityRowProps): ReactElement => {
	const handleChangeActivity = (e: ChangeEvent<HTMLInputElement>) => {
		onChange('activity', e.target.value);
	};
	const handleChangeImportant = (e: ChangeEvent<HTMLInputElement>) => {
		onChange('importantInformation', e.target.value);
	};
	const handleChangeOther = (e: ChangeEvent<HTMLInputElement>) => {
		onChange('otherInformation', e.target.value);
	};
	const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		onImageUpload(e.target.files![0]);
	};
	return (
		<tr>
			<td>
				<Input
					type="text"
					value={activity.activity}
					onChange={handleChangeActivity}
					required
					label="Activity"
					hideLabel
				/>
			</td>
			<td>
				<Input
					type="text"
					value={activity.importantInformation ?? ''}
					onChange={handleChangeImportant}
					required
					label="Important Information"
					hideLabel
				/>
			</td>
			<td>
				<Input
					type="text"
					value={activity.otherInformation ?? ''}
					onChange={handleChangeOther}
					required
					label="Other Information"
					hideLabel
				/>
			</td>
			<td>
				<input
					type="file"
					accept="image/png, image/jpeg, image/jpg, image/heic"
					onChange={handleChangeImage}
				/>
				{
					// Only show the name of the file
					activity.image && (
						<img
							src={activity.image}
							alt="uploaded"
							className={classes.uploadedImage}
						/>
					)
				}
			</td>
			<td>
				<Button onClick={() => {}}>Delete Row</Button>
			</td>
		</tr>
	);
};
