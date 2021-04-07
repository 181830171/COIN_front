const qs = require('qs')
params ={
	id:1,
	symbol:['arrow','pin']
}
console.log('params',qs.stringify(params,{ arrayFormat: 'repeat' }))
console.log('id',qs.stringify(params.id))
console.log('symbol',qs.stringify(params.symbol))