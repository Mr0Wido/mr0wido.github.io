window.simpleJekyllSearch = new SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json',
        searchResultTemplate: '<li><a href="{url}?query={query}">{title}</a></li>',
        noResultsText: 'No results found',
        limit: 5,
        fuzzy: false,
        exclude: ['Welcome']
    })
