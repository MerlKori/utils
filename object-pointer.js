
const reportErrors = () => {
	console.log(`Error: directive ${path} is undefined`);
	return null;
};

const transformPathToArr = pathStr => pathStr.split('/').filter(el => el !== '');

const transformRelativePath = (base, relativePath) => {
	const stack = base.split("/");
	const parts = relativePath.split("/");
	stack.pop();
	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === ".")
			continue;
		if (parts[i] === "..")
			stack.pop();
		else
			stack.push(parts[i]);
	}
	return stack.join("/");
};

const getValue = (obj, path) => path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : reportErrors(), obj);

// const setValue = (obj, path) => {
// 	if (path.length > 1) {
// 		const lastElIdx = pathArr.length - 1;
// 		const currentEl = pathArr.splice()
// 	}
// 	pathArr.reduce((xs, x) => (xs && xs[x]) ? xs[x] : this._msgErrorPath(), obj)
// }
