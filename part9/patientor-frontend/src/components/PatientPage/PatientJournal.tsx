import {
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PatientJournalProps, Entry } from '../../types';

const PatientJournal = (props: PatientJournalProps) => {
	if (props.entries.length === 0) {
		return (
			<div>
				<Typography variant='h6' style={{ marginTop: 10 }}>
					Patient Journal
				</Typography>
				<Typography>No entries yet.</Typography>
			</div>
		);
	}

	return (
		<div>
			<Typography variant='h6' style={{ marginTop: 10 }}>
				Patient Journal
			</Typography>
			{props.entries.map((entry: Entry) => {
				return (
					<Accordion key={entry.id}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>{entry.date}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>{entry.description}</Typography>
							{entry.diagnosisCodes && (
								<div>
									<Typography fontWeight='bold'>Diagnoses</Typography>
									{entry.diagnosisCodes.map((code: string) => (
										<Typography key={code}>- {code}</Typography>
									))}
								</div>
							)}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
};

export default PatientJournal;
