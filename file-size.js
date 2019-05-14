const bytesInUnit = {
	kb: 1024,
	mb: 1048576,
	gb: 1073741824
};

const getSize = bytes => {
	if (bytes > 0 && bytes < bytesInUnit.mb) {
		return `${(bytes / bytesInUnit.kb).toFixed(2)} Kb`
	} else if (bytes >= bytesInUnit.mb && bytes < bytesInUnit.gb) {
		return `${(bytes / bytesInUnit.mb).toFixed(2)} Mb`
	} else if (bytes >= bytesInUnit.gb) {
		return `${(bytes / bytesInUnit.gb).toFixed(2)} Gb`
	} else {
		return 0
	}
};

export default getSize;
