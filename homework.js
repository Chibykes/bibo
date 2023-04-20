class Foods {
    constructor (){
        this.foodList = [];
    }

    get foods(){
        return this.foodList;
    }

    addFood(name, desc, price, course, events, seasons){
        this.foodList.push({
            id: Math.ceil(Math.random() * 255), 
            name, 
            desc,
            price,
            course,
            events,
            seasons
        });
    }

    menu({ events, seasons, budget }){

        let foods_with_same_events = !events === "any" ? this.same_events_food(events) : this.foodList;
        let foods_with_same_seasons = !seasons === "any" ? this.same_seasons_food(seasons) : this.foodList;


        let final_menu = foods_with_same_events
            .filter(food_w_event => 
                foods_with_same_seasons
                    .some(food_w_season => food_w_event.id === food_w_season.id)
            );

        let result = [];

        for(let i=0; i < final_menu.length; i++){

            let cost = 0;
            let food_suggestion = [];
            let other_food_list = final_menu.filter(food => food.id != final_menu[i].id);

            if(Number(final_menu[i].price) > budget) break;

            cost += Number(final_menu[i].price);
            food_suggestion.push(final_menu[i]);

            for(let j=0; j < other_food_list.length; j++){

                let price = Number(other_food_list[j].price);
                if((cost + price) > budget) break;

                cost += Number(other_food_list[j].price);
                food_suggestion.push(other_food_list[j]);
            }

            result.push(food_suggestion);
        }

        return result;
        

    }

    same_events_food(events){
        return this.foodList.filter(food => { 
            return events
                .split(",")
                .every(single_event => food.events.includes(single_event.trim()))
        });
    }

    same_seasons_food(seasons){
        return this.foodList.filter(food => { 
            return seasons
                .split(",")
                .every(single_season => food.seasons.includes(single_season.trim()))
        });
    }
}

const my_food = new Foods();
my_food.addFood(
    "Jollof Rice",
    "Rice cooked in tomato sauce",
    400,
    "main",
    ["wedding", "birthdays", "holidays"], 
    ["winter"]
);
my_food.addFood(
    "Beans",
    "Rice cooked in tomato sauce",
    400,
    "main",
    ["wedding", "birthdays", "holidays"], 
    ["winter"]
);
my_food.addFood(
    "Ice cream",
    "Chocolate",
    100,
    "desert",
    ["wedding", "birthdays", "holidays"], 
    ["winter"]
);
console.log(my_food.menu({ events: "wedding", seasons: "winter", budget: 600 }));
// console.log(my_food.same_seasons_food("winter"));



// /**
//  * 
//  * Ovualtion Window = Avarage Length of cycles - 15days (for 5days)
//  * 
//  * 
//  * / 