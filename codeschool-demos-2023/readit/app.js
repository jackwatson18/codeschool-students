Vue.createApp({ 
    
        data: function() {
        return {
            bookName: "",
            bookAuthor: 0,
            bookRating: 0,
            books: []
        };
        },
    
        methods: {
            addBook: function() {
                var data = "title="+encodeURIComponent(this.bookName);
                data += "&author=" + encodeURIComponent(this.bookAuthor);
                data += "&rating=" + encodeURIComponent(this.bookRating);
    
                fetch("http://localhost:8080/books", {
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).then( response => {
                    if (response.status == 201) {
                        this.getBooksFromServer();
                    }
                });
            },
    
            getBooksFromServer: function() {
                fetch("http://localhost:8080/books").then( response => {
                    response.json().then( data => {
                        console.log("loaded books from server:", data);
                        this.books = data;
                    });
                });
            }
        },
    
        computed: {
            heading: function() {
                if (this.books.length == 1) {
                    return `${this.books.length} book`;
                }
                else {
                    return `${this.books.length} books`;
                }
            }
        },
    
        created: function() {
            this.getBooksFromServer();
        }
    
    
    
    }).mount("#app");
    // mounts app to the div with id "#app"
    