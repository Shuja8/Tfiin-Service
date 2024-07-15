let isLogin = true;
let auth = null;
let menu = [
    { id: 1, name: 'Chicken Curry', price: 250, image: 'https://media.istockphoto.com/id/177126541/photo/indian-chicken-jalfrezi-curry.jpg?s=612x612&w=0&k=20&c=lOkmRiBFovpKW5FA9hn0_yXg5HOTx78Can4E3JavpFE=' },
    { id: 2, name: 'Paneer Butter Masala', price: 180, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7obO58mwR6VU7QAxk2wPPGAHWk0oQNNU1A&=' },
    { id: 3, name: 'Dosa', price: 25, image: 'https://t3.ftcdn.net/jpg/00/37/81/84/360_F_37818424_iEAeI3ngDZ3pNwQ8iZvm2AIDzVDRQmhz.jpg' },
    { id: 4, name: 'Idly', price: 10, image: 'https://img.freepik.com/premium-photo/idly-idli-south-indian-main-breakfast-item-which-is-beautifully-arranged-earthen-ware_527904-2855.jpg' },
    { id: 5, name: 'Puri', price: 20, image: 'https://www.shutterstock.com/image-photo/chole-bhature-spicy-chick-peas-260nw-1867969534.jpg' }
];

let reviews = [];
let selectedRating = 0;

function toggleAuth() {
    isLogin = !isLogin;
    document.getElementById('auth-title').innerText = isLogin ? 'Login' : 'Register';
    document.getElementById('auth-button').innerText = isLogin ? 'Login' : 'Register';
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        // Simulate login
        auth = { email };
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('main-section').style.display = 'block';
        loadMenu();
        loadCart();
        loadReviews();
    } else {
        // Simulate registration
        auth = { email };
        alert('Registered successfully');
        toggleAuth();
    }
}

function loadMenu() {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';
    menu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-price">₹${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        menuList.appendChild(card);
    });
}

let cart = [];

function addToCart(itemId) {
    const item = menu.find(i => i.id === itemId);
    cart.push(item);
    alert(`${item.name} added to cart`);
    loadCart();
}

function loadCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    loadCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('No items in cart');
        return;
    }
    alert('Order placed successfully');
    cart = [];
    loadCart();
}

function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${review.email}: ${review.review} - ${review.rating} stars`;
        reviewsList.appendChild(listItem);
    });
}

function submitReview() {
    const newReview = document.getElementById('new-review').value;

    if (!newReview) {
        alert('Review cannot be empty');
        return;
    }

    if (selectedRating === 0) {
        alert('Please select a rating');
        return;
    }

    reviews.push({ email: auth.email, review: newReview, rating: selectedRating });
    document.getElementById('new-review').value = '';
    resetStars();
    loadReviews();
}

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            resetStars();
            highlightStars(selectedRating);
        });
    });
});

function resetStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('selected');
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('selected');
        }
    });
}
