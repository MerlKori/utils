const pattern = {
	pointer: new RegExp('\\{([\\./a-zA-Z\\_]+)\\}'),
	variable: new RegExp('\\$\\(([a-zA-Z\\_]+)\\)'),
	refBodyParam: new RegExp('\\$\\(([\\./a-zA-Z\\_]+)\\)')
}

export default class Utilities {
	static deepCopyEmulation (obj) {
		return JSON.parse(JSON.stringify(obj));
	}
	/* extendsJSON
		** jsonData - obj
		** rootObj, directoryPath - when calling a function, they aren't passed
	*/
	static extendsJSON (jsonData, rootObj = null,  directoryPath = null) {
		const rootData = rootObj !== null ? rootObj : jsonData
		const checkPoint = point => {
			if (typeof point === 'string') {
				const poitParts = point.split('}').filter(part => part.trim().length > 0)
				return poitParts.length === 1 ? point.includes('/') : false
			}
		}
		const checkDuplicates = (objSource, objRewritable ) => {
			const objSourceKeys = (typeof objSource === 'object') ? Object.keys(objSource) : 0
			if (objSourceKeys.length > 0) {
				objSourceKeys.forEach(key => {
					if (key in objRewritable) {
						delete objRewritable[key]
					}
				})
			}
			return objRewritable
		}
		for (let key in jsonData) {
			const currentDirectory = directoryPath !==null ? `${directoryPath}${key}/` : `${key}/`
			if (typeof jsonData[key] === 'object') {
				this.extendsJSON(jsonData[key], rootData, currentDirectory);
			} else if (key === 'extends' && checkPoint(jsonData[key])) {
				const pathToAddedObj = jsonData[key].match(pattern.pointer)[1];
				const partsCurrentDirectory = currentDirectory.split('/').filter(part => part.trim().length > 0);
				partsCurrentDirectory.splice(partsCurrentDirectory.length - 1, 1); /* remove key extends from parts */
				const pathToExtendsObj = partsCurrentDirectory.join('/');
				const oldContent = getDataFromPoint(pathToExtendsObj, rootData);
				let extendsData = this.deepCopyEmulation(getDataFromPoint(pathToAddedObj, rootObj, pathToExtendsObj))
				if (extendsData !== null && typeof extendsData === 'object') {
					delete oldContent['extends'];
					extendsData = checkDuplicates(oldContent, extendsData)
					Object.assign(getDataFromPoint(pathToExtendsObj, rootObj), extendsData , oldContent); /* set new content */
				} else if (extendsData !== null) {
					oldContent['extends'] = extendsData,
					Object.assign(getDataFromPoint(pathToExtendsObj, rootObj), oldContent); /* set new content */
				}
			}
		}
		return jsonData;
	}
	static expandsParams (paramsFromParse, rootData, currentDirectory) {
		const paramsList = typeof paramsFromParse === 'string' ? paramsFromParse.split('&').filter(el => el.trim().length > 0) : [];
		const checkValue = val => {
			if (val !== undefined) {
				const pathToObj = val.match(pattern.refBodyParam)
				const expandData = pathToObj !== null ? getDataFromPoint(pathToObj[1], rootData, currentDirectory) : null
				const data = typeof expandData === 'object' ? this.deepCopyEmulation(expandData) : expandData
				return data !== null ? data : val
			} else {
				return null
			}
		}
		if (typeof paramsFromParse === 'string' && paramsList.length > 0) {
			const params = [];
			paramsList.forEach(item => {
				const partsItem = item.split('=')
				params.push({
					key: partsItem[0],
					value: checkValue(partsItem[1])
				})
			});
			return params;
		} else {
			console.log('parameters are empty');
			return null
		}
	}
	static replaceTokens (fullParamsTree, tokensList) {
		const variablesSearch = params => {
			for (let paramsKey in params) {
				if (typeof params[paramsKey] === 'object') {
					variablesSearch(params[paramsKey]);
				} else {
					if (pattern.variable.test(params[paramsKey])) {
						for (let tokenKey in tokensList) {
							if (tokenKey === params[paramsKey].match(pattern.variable)[1]) {
								params[paramsKey] = tokensList[tokenKey];
								break;
							}
						}
					}
				}
			}
		}
		variablesSearch(fullParamsTree);
		return fullParamsTree;
	}
}
