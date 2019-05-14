const toDateTime = dateMs => {
	const dateParts = new Date(dateMs).toUTCString().split(' ');
	return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]}`;
};

const toDate = dateMs => {
	const dateParts = new Date(dateMs).toUTCString().split(' ');
	return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;
};

const dateToIsoString = dateMs => new Date(dateMs).toISOString().substr(0, 10);

export default {
	toDateTime,
	toDate,
	dateToIsoString
};
