
const splitFilters = (filters) => filters.map(f => f.split(':', 2)).map(([key, value]) => ({key, value}))

const groupFilters = (filters) => filters
	.reduce((res, {key, value}) => {	
		if(key in res === false){
			res[key] = []
		}
		res[key].push(value)
		return res
	}, {})

module.exports = {
	splitFilters,
	groupFilters
}
