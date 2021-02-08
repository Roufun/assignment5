//----------------------------- Item List After Search -------------------
const foodItemList = () => {
    const InputSearch = document.getElementById('Input-search').value;
    const foodItems = document.getElementById('food-items');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${InputSearch}`)
        .then(res => res.json())
        .then(data => {
            data.meals.forEach(foodItem => {
                const foodCard = document.createElement('div');
                foodCard.className = 'food-card';
                const thumb = foodItem.strMealThumb;
                const foodTitle = foodItem.strMeal;
                foodCard.innerHTML = `
                    <div class = "details" onclick="showDetails('${foodTitle}')">
                        <div class="food-icon">
                            <img src="${thumb}" alt="">
                        </div>
                        <h5 class="food-name">${foodTitle}</h5>
                    </div>
                `;
                foodItems.appendChild(foodCard);
            });
        })
        .catch(err => alert('No match found'));
}

//----------------------------- Item Details After Click --------------------
const showDetails = name => {
    const container = document.getElementById('details');
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            const item = data.meals[0];
            container.innerHTML = `
            <div class = "detail-modal">
                <p class = "detail-back" onclick="hideDetails()">Return to home </p>
                <div class="detail-img-container">
                    <img class="detail-img" src="${item.strMealThumb}" alt="">
                </div>
                <h2 class="detail-heading">${item.strMeal}</h2>
                <h5 class="detail-heading-2">Ingredients</h5>
                <ul class="detail-ul">
                    <li class="ingredients">${item.strIngredient1}</li>
                    <li class="ingredients">${item.strIngredient2}</li>
                    <li class="ingredients">${item.strIngredient3}</li>
                    <li class="ingredients">${item.strIngredient4}</li>
                    <li class="ingredients">${item.strIngredient5}</li>
                    <li class="ingredients">${item.strIngredient6}</li>
                    <li class="ingredients">${item.strIngredient7}</li>
                </ul>
            </div>
            `  
        })
}

const btn = document.getElementById('basic-addon2');
btn.addEventListener('click', foodItemList);

const hideDetails = () => {
    document.querySelector('.detail-modal').style.display = 'none';
}