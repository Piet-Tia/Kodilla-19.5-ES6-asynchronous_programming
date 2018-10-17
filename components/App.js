
//PRZEPISAC REQUESTa UZYWAJAC FETCH


App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},



	getGif: function (searchingText) {  // 1.
		const GIPHY_API_URL = 'https://api.giphy.com';
		const GIPHY_PUB_KEY = 'hwhFYYSAZaZFQaREf8tSB78oNchTFjYU';
		const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.

		return fetch(url)
			.then(function(response){
				return response.json()
			})
			.then(function(myJson) {
				const data = myJson.data;
					const gif = {
						url: data.fixed_width_downsampled_url,
						sourceUrl: data.url
					};
					return gif;
					
			})



/*		return new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest();  // 3.
			xhr.open('GET', url);
			xhr.onload = function () {
				if (xhr.status === 200) {
					const data = JSON.parse(xhr.responseText).data; // 4.
					const gif = {  // 5.
						url: data.fixed_width_downsampled_url,
						sourceUrl: data.url
					};
					resolve(gif);
					return;
					// 6.
				}
				reject({ error: 'no data' })
			};
			xhr.send();
		})
*/
	},

	handleSearch: function (searchingText) {  // 1.
		this.setState({
			loading: true  // 2.
		});
		this.getGif(searchingText)



		// tutaj mozna dodac caly kod z "onload" (20-31)			
			.then(gif => {  // 3.
				this.setState({  // 4
					loading: false,  // a
					gif: gif,  // b
					searchingText: searchingText  // c
				});
				return 0;
			},
				error => console.log(error)
			)
			.then();
	},

	render: function () {

		const styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Wyszukiwarka GIFow!</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
				<Search onSearch={this.handleSearch} />
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});
