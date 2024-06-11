import { ReactElement, ChangeEvent } from 'react';
import classes from './ActivityRow.module.css';
import { TripActivity } from '../../../types/TripDay';
import { Button } from '../../Button';
import { FileUploader } from '../../FileUploader';
import { TextArea } from '../../TextArea';
import { FaTrash } from 'react-icons/fa';

type ActivityRowProps = {
	activity: TripActivity;
	onChange: (field: keyof TripActivity, value: string) => void;
	onImageUpload: (file: File | null) => void;
	onRemove: () => void;
};

export const ActivityRow = ({
	activity,
	onChange,
	onImageUpload,
	onRemove,
}: ActivityRowProps): ReactElement => {
	const handleChangeActivity = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange('activity', e.target.value);
	};
	const handleChangeImportant = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange('importantInformation', e.target.value);
	};
	const handleChangeOther = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange('otherInformation', e.target.value);
	};
	return (
		<tr>
			<td>
				<TextArea
					value={activity.activity}
					onChange={handleChangeActivity}
					required
					label="Activity"
					hideLabel
				/>
			</td>
			<td>
				<TextArea
					value={activity.importantInformation ?? ''}
					onChange={handleChangeImportant}
					required
					label="Important Information"
					hideLabel
				/>
			</td>
			<td>
				<TextArea
					value={activity.otherInformation ?? ''}
					onChange={handleChangeOther}
					required
					label="Other Information"
					hideLabel
				/>
			</td>
			<td>
				<div className={classes.fileUploaderContainer}>
					<FileUploader
						file={activity.image ?? null}
						onChange={onImageUpload}
						label="Upload image"
						hideLabel
					/>
				</div>
			</td>
			<td>
				<Button
					onClick={onRemove}
					variant="danger"
					aria-label="Delete activity"
					icon={<FaTrash />}
				/>
			</td>
		</tr>
	);
};
