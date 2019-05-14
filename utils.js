const getRandomNum = () => Math.floor(Math.random() * (1000000 - 50)) + 50;

/* emulation deep copy Object or Array */
const deepCopy = data => JSON.parse(JSON.stringify(data));

/* remove array element */
const removeFromArray = (arr, el) => {
	const idx = arr.indexOf(el);
	if (idx < 0) throw new Error('element is not found');
	arr.splice(idx, 1);
};

const isEqualObjects = (obj_1, obj_2, exceptionKeys = []) => {
	const checkKeys = Object.keys(obj_1).filter(el => !exceptionKeys.includes(el));
	let key;
	for (let idx = 0; idx < checkKeys.length; idx++) {
		key = checkKeys[idx];
		if (obj_1[key] !== obj_2[key]) return false;
	}
	return true;
};

const getValueByPath = (obj, path) => {
	const getChild = (parent, child) => {
		if (!parent || !parent[child]) {
			console.log(`${child} in is not define`);
			return null;
		}
		return parent[child];
	};
	return path.reduce((xs, x) => getChild(xs, x), obj);
};

/*
	_splitDataByIds
	data - arr
	markersIds - arr, ids by which create main group
*/
const splitDataByIds = (data, markersIds) => {
	const main = [];
	const other = [];

	data.forEach(item => {
		if (markersIds.includes(item.id)) {
			main.push(item);
		} else {
			other.push(item);
		}
	});
	return {main, other};
};

const dataSortingByKey = (arr, key, value) => arr.sort(a => (a[key] === value ? -1 : 0));

export default {
	getRandomNum,
	deepCopy,
	removeFromArray,
	isEqualObjects,
	getValueByPath,
	splitDataByIds,
	dataSortingByKey
};
