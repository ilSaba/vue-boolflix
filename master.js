Vue.config.devtools = true;

var app = new Vue(
    {
        el: '#root',
        data: {
            query:'',
            movies: [],
            api_key: '0390f3d9f2a983b3502231d2a9d8b0ec',
            lang: 'it',
            uri: 'https://api.themoviedb.org/3',
            flags: ['en', 'es', 'fr', 'hr', 'it', 'ja', 'pt', 'sv', 'us'],
            bg: '',
        },
        methods: {
            search: function () {
                axios.get(`${ this.uri }/search/movie?api_key=${ this.api_key }&query=${ this.query }&language=${ this.lang }`)
                .then((response) => {
                    this.movies = [...this.movies, ...response.data.results]
                })
                axios.get(`${ this.uri }/search/tv?api_key=${ this.api_key }&query=${ this.query }&language=${ this.lang }`)
                .then((response) => {
                    this.movies = [...this.movies, ...response.data.results]
                })
            },
            getTitle: function (obj) {
                if (obj.title) {
                    return obj.title;
                } else {
                    return obj.name;
                }
            },
            getOriginalTitle: function (obj) {
                if (obj.original_title) {
                    return obj.original_title;
                } else {
                    return obj.original_name;
                }
            },
            getStars: function (vote) {
                let stars = '';

                for (var i = 1; i <= 5; i++) {
                    if (i <= Math.ceil(vote/2)) {
                        stars += '<i class="fas fa-star"></i>';                   
                    } else {
                        stars += '<i class="far fa-star"></i>';                   
                    }                  
                }
                return stars;
            }
        },
        computed: {
        },
    },
);