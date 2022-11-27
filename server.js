const express = require('express')
const path = require('path')
const app = express()
var router = express.Router();
const port = 3000
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')

const datas = [
	{
		id : 0,
		name : 'ant',
		img : 'data:image/jpeg;base64,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',
		disc : 'any of approximately 10,000 species of insects (order Hymenoptera) that are social in habit and live together in organized colonies. Ants occur worldwide but are especially common in hot climates. They range in size from about 2 to 25 mm (about 0.08 to 1 inch)'
	},
	{
		id : 1,
		name : 'bee',
		img : 'https://media.wired.com/photos/5bb532b7f8a2e62d0bd5c4e3/1:1/w_1800,h_1800,c_limit/bee-146810332.jpg',
		disc : 'Bees are closely related to certain types of wasps, the principal biological difference between them being that bees (except for parasitic bees) provide their young with a mixture of pollen and honey, whereas wasps feed their young animal food or provision their nests with insects or spiders.'
	}
]

   
router.get('/', function (request, response, next) {
    response.render(path.join(__dirname, './pages/index'), {title : 'Home', inc : 'lists', datas})
})

router.get('/:id', function (request, response, next) {
	const id = request.params.id
	const selected = datas[id]
    response.render(path.join(__dirname, './pages/index'), {title : 'Home', inc : 'viewer', selected})
})

router.post('/add', function (request, response, next) {
	const ids = datas[datas.length-1].id + 1
	const { name, img, desc} = request.body
	datas.push(
		{
			id : ids,
			name : name,
			img : img,
			disc : desc
		}
	)
    response.render(path.join(__dirname, './pages/index'), {title : 'Home', inc : 'lists', datas})
})


app.use(router);

app.listen(port, () => {
	console.log(`Express Server listening on ${port}`)
})

