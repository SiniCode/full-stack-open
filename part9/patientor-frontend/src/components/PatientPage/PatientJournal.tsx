import {
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EntryDetails from './EntryDetails';
import { Entry, Diagnosis } from '../../types';

interface Props {
	entries: Entry[];
	diagnoses: Diagnosis[];
}

const PatientJournal = (props: Props) => {
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

	const getCodeExplanation = (code: string) => {
		const diagnosis = props.diagnoses.find((d: Diagnosis) => d.code === code);
		if (diagnosis === undefined) {
			return '';
		}
		return diagnosis.name;
	};

	return (
		<div>
			<Typography variant='h6' style={{ marginTop: 20, marginBottom: 10 }}>
				Patient Journal
			</Typography>
			{props.entries.map((entry: Entry) => {
				return (
					<Accordion key={entry.id}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography fontWeight='bold'>{entry.date}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography fontStyle='italic'>{entry.description}</Typography>
							{entry.diagnosisCodes && (
								<div>
									<Typography fontWeight='bold'>Diagnoses</Typography>
									{entry.diagnosisCodes.map((code: string) => (
										<Typography key={code}>
											- {code} {getCodeExplanation(code)}
										</Typography>
									))}
								</div>
							)}
							<Typography>Specialist: {entry.specialist}</Typography>
							<EntryDetails entry={entry} />
						</AccordionDetails>
					</Accordion>
				);
			})}
		</div>
	);
};

export default PatientJournal;
