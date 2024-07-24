$(document).ready(function() {
    // Sample book data
    const books = [
        { id: 1, title: "General Science", author: "Robert Jefford", description: "The book Encyclopedia of General Science has been prepared after analysis the recent pattern of competitive exams like SSC, UPSC & State Level PCS, etc. serving as an ideal book for competitive examinations.", image: "image1.jpg", price: 20, imageSize: "large" },
        { id: 2, title: "Ikigai", author: "Héctor García and Francesc Miralles", description: "Ikigai: The Japanese Secret to a Long and Happy Life explores the Japanese concept of ikigai, or 'a reason for being.' The book provides insights from the long-lived residents of Okinawa on finding purpose, staying active, and enjoying life. It offers practical advice for discovering your own ikigai to achieve a fulfilling and happy life.", image: "image2.jpg", price: 250, imageSize: "medium" },
        { id: 3, title: "Palace of Illusion", author: "Chitra Banerjee Divakaruni", description: " 'The Palace of Illusions' by Chitra Banerjee Divakaruni offers a captivating retelling of the Indian epic Mahabharata, focusing on Draupadi's perspective. Born from fire and married to five brothers, Draupadi narrates her life story, revealing her complex relationships, innermost thoughts, and struggles for identity. Through lyrical prose and vivid storytelling, Divakaruni brings ancient India to life, exploring themes of love, loyalty, and destiny in a patriarchal society.", image: "image3.jpg", price: 750, imageSize: "large" },
        { id: 4, title: "The Alchemist", author: "Paul Coelho", description: "'The Alchemist' by Paulo Coelho is a captivating novel about Santiago, a young shepherd who embarks on a journey to find a treasure in the Egyptian pyramids. Guided by dreams and wise mentors, he learns profound life lessons about following his heart, pursuing his Personal Legend, and understanding the interconnectedness of all things. This inspirational tale emphasizes the importance of the journey and the transformative power of dreams.", image: "image4.jpg", price: 450, imageSize: "medium" }
        // Add more books as needed
    ];

    function addToCart(bookId) {
        const book = books.find(b => b.id == bookId);
        if (book) {
            // Get the current cart from local storage or initialize an empty array
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            // Add the book to the cart
            cart.push(book);
            // Save the updated cart to local storage
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(`Added '${book.title}' to cart.`);
            alert(`Added '${book.title}' to cart.`);
        } else {
            console.error("Book not found.");
        }
    }

    function removeFromCart(bookId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(book => book.id != bookId);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Removed book with ID '${bookId}' from cart.`);
        updateCart();
    }

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartHtml = '';
        cart.forEach(book => {
            cartHtml += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${book.title}
                    <button class="btn btn-danger btn-sm remove-from-cart" data-id="${book.id}">Remove</button>
                </li>
            `;
        });
        $('#cart-items').html(cartHtml);
        
        // Bind remove button click event
        $('.remove-from-cart').click(function() {
            const bookId = $(this).data('id');
            removeFromCart(bookId);
        });
    }

    function displayBooks(bookList) {
        let featuredBooksHtml = '';
        bookList.forEach(book => {
            const imageSizeClass = book.imageSize === "large" ? "large-image" : book.imageSize === "medium" ? "medium-image" : "small-image";
            featuredBooksHtml += `
                <div class="col-md-3">
                    <div class="card product-card">
                        <img src="${book.image}" class="card-img-top ${imageSizeClass}" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}</p>
                            <a href="product-detail.html?id=${book.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            `;
        });
        $('#featured-books').html(featuredBooksHtml);
    }

    $('#search').on('input', function() {
        const query = $(this).val().toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    });

    $('#sort-price').click(function() {
        const sortedBooks = [...books].sort((a, b) => a.price - b.price);
        displayBooks(sortedBooks);
    });

    $('#sort-title').click(function() {
        const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
        displayBooks(sortedBooks);
    });

    // Initial display of books
    displayBooks(books);

    if (document.getElementById('product-detail')) {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('id');
        const book = books.find(b => b.id == bookId);

        if (book) {
            const imageSizeClass = book.imageSize === "large" ? "large-image" : book.imageSize === "medium" ? "medium-image" : "small-image";
            const productDetailHtml = `
                <div class="col-md-4">
                    <img src="${book.image}" class="img-fluid ${imageSizeClass}" alt="${book.title}">
                </div>
                <div class="col-md-8">
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p>${book.description}</p>
                    <p><strong>Price:</strong> $${book.price}</p>
                    <button class="btn btn-success" id="add-to-cart">Add to Cart</button>
                </div>
            `;
            $('#product-detail').html(productDetailHtml);

            // Handle "Add to Cart" button click
            $('#add-to-cart').click(function() {
                addToCart(book.id);
            });
        } else {
            $('#product-detail').html('<p>Book not found.</p>');
        }
    }

    // Update cart on cart page
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});
