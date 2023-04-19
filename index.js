const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');

search.addEventListener('submit', onSearch);

function onSearch(e) {
	e.preventDefault();
	const { days, query } = e.currentTarget.elements;
	getWeather(query.value, days.value)
		.then(data => (list.innerHTML = createMarkup(data.forecast.forecastday)))
		.catch(error => console.log(error));
}

function getWeather(city, days) {
	// http://api.weatherapi.com/v1/forecast.json?key=5c4ca287ef1d430683681350231904&q=Paris&days=5
	const BASE_URL = 'http://api.weatherapi.com/v1/';
	const API_KEY = '5c4ca287ef1d430683681350231904';

	return fetch(`${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=${days}`).then(resp => {
		if (!resp.ok) {
			throw new Error(resp.statusText);
		}
		return resp.json();
	});
}

function createMarkup(arr) {
	return arr
		.map(
			({date, day:{avgtemp_c, condition:{icon, text}}}) => `<li><img src="${icon}" alt="${text}">
  <p>${text}</p>
<h2>${date}</h2>
<h3>${avgtemp_c}</h3></li>`
		)
		.join('');
}
