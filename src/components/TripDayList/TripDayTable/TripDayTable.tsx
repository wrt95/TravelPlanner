import { ReactElement, useState } from 'react';
import classes from './TripDayTable.module.css';
import { ActivityRow } from '../ActivityRow';
import { TripActivity } from '../../../types/Trip';
import { Button } from '../../Button';
import {
	FaArrowDown,
	FaArrowUp,
	FaClipboardList,
	FaImage,
	FaInfoCircle,
	FaPlus,
	FaTasks,
	FaTrash,
} from 'react-icons/fa';
import cn from 'classnames';

type TripDayTableProps = {
	day: number;
	activities: TripActivity[];
	onAddActivity: () => void;
	onRemoveActivity: (activityIndex: number) => void;
	onActivityChange: (
		activityIndex: number,
		field: keyof TripActivity,
		value: string
	) => void;
	onImageUpload: (activityIndex: number, file: File | null) => void;
	onDeleteDay: () => void;
};

export const TripDayTable = ({
	day,
	activities,
	onAddActivity,
	onRemoveActivity,
	onActivityChange,
	onImageUpload,
	onDeleteDay,
}: TripDayTableProps): ReactElement => {
	const [isOpen, setIsOpen] = useState<boolean>(true); // TODO - Save on state

	const lastIndex = activities.length - 1;
	const lastElementActivity = activities[lastIndex].activity;
	const isLastElementAcitivityEmpty = lastElementActivity === '';

	const handleClickButton = () => {
		setIsOpen((currentState) => !currentState);
	};
	return (
		<div className={classes.wrapper}>
			<button
				onClick={handleClickButton}
				className={cn(
					classes.tripDayButton,
					isOpen && classes.tripDayButtonOpen
				)}
			>
				<h3 className={classes.tripHeader}>Day {day}</h3>
				{isOpen ? (
					<FaArrowUp className={classes.accordionIcon} />
				) : (
					<FaArrowDown className={classes.accordionIcon} />
				)}
			</button>
			{isOpen && (
				<div className={classes.tripDay}>
					<table className={classes.table}>
						<thead>
							<tr>
								<th>
									Activity
									<FaTasks className={classes.icon} />
								</th>
								<th>
									Important Information
									<FaInfoCircle className={classes.icon} />
								</th>
								<th>
									Other Information
									<FaClipboardList className={classes.icon} />
								</th>
								<th>
									Image Upload
									<FaImage className={classes.icon} />
								</th>
								<th className={classes.deleteTableHeader}>Delete activity</th>
							</tr>
						</thead>
						<tbody>
							{activities.map((activity, index) => (
								<ActivityRow
									key={index}
									activity={activity}
									onChange={(field, value) =>
										onActivityChange(index, field, value)
									}
									onImageUpload={(file) => onImageUpload(index, file)}
									onRemove={() => onRemoveActivity(index)}
								/>
							))}
						</tbody>
					</table>
					<div className={classes.dayActions}>
						<Button
							onClick={onAddActivity}
							disabled={isLastElementAcitivityEmpty}
							icon={<FaPlus />}
							className={
								isLastElementAcitivityEmpty ? classes.disabled : undefined
							}
							title={
								isLastElementAcitivityEmpty
									? 'Add some text to the acitivy on the final row to be able to add more activities'
									: 'Add another activity'
							}
						>
							Add another activity
						</Button>
						<Button onClick={onDeleteDay} variant="danger" icon={<FaTrash />}>
							Delete day
						</Button>
					</div>
				</div>
			)}
		</div>
	);
	/*return (
		<div className={classes.tripDay}>
			<h3 className={classes.tripHeader}>Day {day}</h3>
			<table className={classes.table}>
				<thead>
					<tr>
						<th>
							Activity
							<FaTasks className={classes.icon} />
						</th>
						<th>
							Important Information
							<FaInfoCircle className={classes.icon} />
						</th>
						<th>
							Other Information
							<FaClipboardList className={classes.icon} />
						</th>
						<th>
							Image Upload
							<FaImage className={classes.icon} />
						</th>
						<th className={classes.deleteTableHeader}>Delete activity</th>
					</tr>
				</thead>
				<tbody>
					{activities.map((activity, index) => (
						<ActivityRow
							key={index}
							activity={activity}
							onChange={(field, value) => onActivityChange(index, field, value)}
							onImageUpload={(file) => onImageUpload(index, file)}
							onRemove={() => onRemoveActivity(index)}
						/>
					))}
				</tbody>
			</table>
			<div className={classes.dayActions}>
				<Button
					onClick={onAddActivity}
					disabled={isLastElementAcitivityEmpty}
					icon={<FaPlus />}
					className={isLastElementAcitivityEmpty ? classes.disabled : undefined}
					title={
						isLastElementAcitivityEmpty
							? 'Add some text to the acitivy on the final row to be able to add more activities'
							: 'Add another activity'
					}
				>
					Add another activity
				</Button>
				<Button onClick={onDeleteDay} variant="danger" icon={<FaTrash />}>
					Delete day
				</Button>
			</div>
		</div>
	);
	*/
};
