import qwest from 'qwest'

// This is needed for the coors preflight otherwise we get an error.
qwest.setDefaultOptions({
	responseType: 'json',
	headers: {
		'Cache-Control': '',
	},
})

// Keep track so we can error out on the third try
let timesCalled = 0
export default async function fetchContent({ shouldError = false } = {}) {
	return new Promise((resolve, reject) => {
		timesCalled++
		setTimeout(async () => {
			if (shouldError || timesCalled % 3 === 0) {
				return reject('An error occured. We were not able to fetch your quote.')
			}
			const { response } = await qwest.get(
				'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
			)
			const quote = response[0]
			// Parse HTML that is returned from quote generator and just return the text.
			var html = quote.content
			var div = document.createElement('div')
			div.innerHTML = html
			const text = div.textContent || div.innerText || ''
			resolve({ ...quote, content: text })
		}, 2000)
	})
}
