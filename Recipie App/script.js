const searchBox=document.querySelector(".searchBox");
const searchBtn=document.querySelector(".searchBtn");
const recipeCtn=document.querySelector(".recipeCtn");

const recipedetailscontent=document.querySelector(".recipe-details-content");
const recipecloseBtn=document.querySelector(".recipe-close-Btn");


const fetchRecipes = async (query)=>{
    recipeCtn.innerHTML="<h2>Fetching Recipes. . .</h2>";
    try {
        const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response=await data.json();
        //console.log(response.meals[0]);
        recipeCtn.innerHTML="";
        response.meals.forEach(meal => {
        let recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        console.log(meal);
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}" />
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}<span></p>`;//img is stored in strMealTHumb in Api

        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })

        recipeCtn.appendChild(recipeDiv);
    });
    } catch (error) {
        recipeCtn.innerHTML="Error In fetching API so please have patience";
    }
    
}
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput);   
})

const fetchIngredients=(meal)=>{
    let ingredientslist="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;
}

const openRecipePopup=(meal)=>{
    recipedetailscontent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>`
    
    recipedetailscontent.parentElement.style.display="block";
}
recipecloseBtn.addEventListener('click',()=>{
    recipedetailscontent.parentElement.style.display="none";
})

