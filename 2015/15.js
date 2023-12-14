const cookieScore = (sprinkles, peanutButter, frosting, sugar) => {
    let capacity = Math.max(0, sprinkles * 5 - peanutButter - sugar)
    let durability = Math.max(0, 3 * peanutButter - sprinkles - frosting)
    let flavor = Math.max(0, 4 * frosting)
    let texture = Math.max(0, 2 * sugar)

    return capacity * durability * flavor * texture
}

let max = { score: 0 }
let max500 = { score: 0 }

for (let sprinkles = 0; sprinkles <= 100; sprinkles++) {
    for (let peanutButter = 0; peanutButter + sprinkles <= 100; peanutButter++) {
        for (let frosting = 0; frosting + peanutButter + sprinkles <= 100; frosting++) {
            let sugar = 100 - (frosting + peanutButter + sprinkles)
            let calories = 5 * sprinkles + peanutButter + 6 * frosting + 8 * sugar
            let score = cookieScore(sprinkles, peanutButter, frosting, sugar)
            
            if (score > max.score) {
                max = { score, sprinkles, peanutButter, frosting, sugar }
            }
            if (calories == 500 && score > max500.score) {
                max500 = { score, calories, sprinkles, peanutButter, frosting, sugar }
            }
        }
    }
}

console.log('part 1: ', max)
console.log('part 2: ', max500)
