exports.seed = function(knex, Promise) {
    return knex('payments').del()
        .then(function() {
            return knex('orders').del();
        })
        .then(function() {
            return knex('cars').del();
        })
        .then(function() {
            return knex('cars').insert([
                {car_category: "vintage", car_type: "antique", car_color: "black", car_amount: "400", car_description: "A black vintage antique.", car_image_url: "https://s3.amazonaws.com/react-store/vintage-cars/black-antique.png"},
                {car_category: "vintage", car_type: "hot rod", car_color: "gold", car_amount: "300", car_description: "A gold vintage hot rod.", car_image_url: "https://s3.amazonaws.com/react-store/vintage-cars/gold-hot-rod.png"},
                {car_category: "vintage", car_type: "american", car_color: "blue", car_amount: "200", car_description: "A blue vintage american.", car_image_url: "https://s3.amazonaws.com/react-store/vintage-cars/blue-american.png"},
                {car_category: "vintage", car_type: "spyder", car_color: "red", car_amount: "100", car_description: "A red vintage spyder.", car_image_url: "https://s3.amazonaws.com/react-store/vintage-cars/red-spyder.png"},

                {car_category: "luxury", car_type: "limousine", car_color: "black", car_amount: "400", car_description: "A black luxury limousine.", car_image_url: "https://s3.amazonaws.com/react-store/luxury-cars/black-limousine.png"},
                {car_category: "luxury", car_type: "sedan", car_color: "red", car_amount: "300", car_description: "A red luxury sedan.", car_image_url: "https://s3.amazonaws.com/react-store/luxury-cars/red-sedan.png"},
                {car_category: "luxury", car_type: "convertible", car_color: "white", car_amount: "200", car_description: "A white luxury convertible.", car_image_url: "https://s3.amazonaws.com/react-store/luxury-cars/white-convertible.png"},
                {car_category: "luxury", car_type: "suv", car_color: "white", car_amount: "100", car_description: "A white luxury suv.", car_image_url: "https://s3.amazonaws.com/react-store/luxury-cars/white-suv.png"},

                {car_category: "sports", car_type: "super sports", car_color: "orange", car_amount: "400", car_description: "An orange super sports.", car_image_url: "https://s3.amazonaws.com/react-store/sports-cars/orange-super-sports.png"},
                {car_category: "sports", car_type: "coupe", car_color: "red", car_amount: "300", car_description: "A red sports coupe.", car_image_url: "https://s3.amazonaws.com/react-store/sports-cars/red-coupe.png"},
                {car_category: "sports", car_type: "coupe", car_color: "white", car_amount: "200", car_description: "A white sports coupe.", car_image_url: "https://s3.amazonaws.com/react-store/sports-cars/white-coupe.png"},
                {car_category: "sports", car_type: "coupe", car_color: "yellow", car_amount: "100", car_description: "A yellow sports coupe.", car_image_url: "https://s3.amazonaws.com/react-store/sports-cars/yellow-coupe.png"},

                {car_category: "racing", car_type: "lemans", car_color: "black", car_amount: "400", car_description: "A black racing lemans.", car_image_url: "https://s3.amazonaws.com/react-store/racing-cars/black-lemans.png"},
                {car_category: "racing", car_type: "rally", car_color: "green", car_amount: "300", car_description: "A green racing rally.", car_image_url: "https://s3.amazonaws.com/react-store/racing-cars/green-rally.png"},
                {car_category: "racing", car_type: "dragster", car_color: "orange", car_amount: "200", car_description: "An orange racing dragster.", car_image_url: "https://s3.amazonaws.com/react-store/racing-cars/orange-dragster.png"},
                {car_category: "racing", car_type: "motor-sports", car_color: "red", car_amount: "100", car_description: "A red racing motor-sports.", car_image_url: "https://s3.amazonaws.com/react-store/racing-cars/red-motor-sports.png"}
            ]);
        }).then(function() {
            return knex('customers').del();
        }).then(function() {
            return knex('customers').insert([
                {first_name: "John", last_name: "Smith", email_address: "john.smith@email.com"}
            ]);
        });
}