const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE dishes (
        dishId INTEGER PRIMARY KEY,
        dishName TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        isPublished BOOLEAN NOT NULL
    )`);

    const stmt = db.prepare(`INSERT INTO dishes (dishId, dishName, imageUrl, isPublished) VALUES (?, ?, ?, ?)`);
    const dishes = [
        { dishId: 1, dishName: "Jeera Rice", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg", isPublished: true },
        { dishId: 2, dishName: "Paneer Tikka", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg", isPublished: true },
        { dishId: 3, dishName: "Rabdi", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg", isPublished: true },
        { dishId: 4, dishName: "Chicken Biryani", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg", isPublished: true },
        { dishId: 5, dishName: "Alfredo Pasta", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg", isPublished: true },
    ];

    dishes.forEach(dish => {
        stmt.run(dish.dishId, dish.dishName, dish.imageUrl, dish.isPublished);
    });

    stmt.finalize();
});

module.exports = db;
