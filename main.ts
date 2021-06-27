namespace SpriteKind {
    export const Gap = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gap, function (sprite, otherSprite) {
    if (otherSprite.x - sprite.x < 2) {
        info.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (info.score() >= 120) {
        game.over(true, effects.bubbles)
    } else {
        game.over(false, effects.dissolve)
    }
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    火雞.vy = -100
    animation.setAction(火雞, ActionKind.Jumping)
    火雞.startEffect(effects.rings, 300)
})
let projectile: Sprite = null
let gapSprite: Sprite = null
let gapImage: Image = null
let bottomImage: Image = null
let topImage: Image = null
let 地圖 = 0
let 火雞: Sprite = null
class ActionKind {
    static Walking = 0
    static Idle = 1
    static Jumping = 2
}
scene.setBackgroundColor(0)
game.splash("去你的鳥鳥")
game.splash("遊戲規則:倒數25秒得到120分即為獲勝。")
info.setScore(0)
effects.blizzard.startScreenEffect()
火雞 = sprites.create(img`
    . . . . . . . . . . b 4 b . . . 
    . . 2 . . . . . . b 4 b . . . . 
    . . 2 2 2 . . . . b c . . . . . 
    . . . . 2 2 2 2 b b b b . . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 . . . 
    . 2 2 . b f f f 1 f 4 4 f f . . 
    2 . . . b 4 f f f f 4 d 2 c . . 
    2 2 2 4 b 4 4 d f f d d 2 4 . . 
    4 4 2 4 b b d 4 4 4 4 4 2 2 2 2 
    b 2 2 4 4 4 b 4 4 4 2 2 2 4 b . 
    b 4 c 4 4 4 4 d 4 2 2 4 4 b . . 
    c 4 2 c d 4 4 b 2 2 4 4 4 4 b . 
    c b 2 4 c c b 4 4 4 4 4 4 4 b . 
    . c 4 4 2 2 4 4 4 4 4 4 4 d b . 
    . . c b 4 2 4 4 4 4 4 4 b b . . 
    . . . c c c c c c c c b b . . . 
    `, SpriteKind.Player)
火雞.ay = 300
let 火雞非 = animation.createAnimation(ActionKind.Jumping, 25)
火雞非.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    2 2 . . . . . . . . . . . . . . 
    . 2 2 . . . . . . b 4 4 b . . . 
    . . 2 . . . b b b b b b . . . . 
    . . . 2 2 2 2 2 2 2 2 2 b . . . 
    . b b b b b 4 4 2 2 2 2 4 b . . 
    . b d 4 b 4 f 4 2 2 4 4 4 b . . 
    . . b 4 2 b 4 f 1 f 4 d 4 f . . 
    . . b d 4 4 b f f f 2 2 2 c . . 
    b b d b 4 2 4 d f b 2 2 2 4 b . 
    b d d c d 4 2 b 4 4 4 2 2 2 2 2 
    c d d d c c b 4 4 4 2 2 4 4 b . 
    c b d d d d d 4 4 4 4 4 4 4 b . 
    . c d d d d d d 4 4 4 4 4 d b . 
    . . c b d d d d d 4 4 4 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
火雞非.addAnimationFrame(img`
    . . . . . . . . . . . . . . . . 
    2 2 . . . . . . . . . . . . . . 
    . 2 2 . . . . . . b 4 4 b . . . 
    . . 2 . . . b b b b b b . . . . 
    . . . 2 2 2 2 2 2 2 2 2 b . . . 
    . b b b b b 4 4 2 2 2 2 4 b . . 
    . b d 4 b 4 f 4 2 2 4 4 4 b . . 
    . . b 4 2 b 4 f 1 f 4 d 4 f . . 
    . . b d 4 4 b f f f 2 2 2 c . . 
    b b d b 4 2 4 d f b 2 2 2 4 b . 
    b d d c d 4 2 b 4 4 4 2 2 2 2 2 
    c d d d c c b 4 4 4 2 2 4 4 b . 
    c b d d d d d 2 4 4 4 4 4 4 b . 
    . c d d d d d d 4 2 4 4 4 d b . 
    . . c b d d d d d 4 2 4 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
火雞非.addAnimationFrame(img`
    . . . . . . . . . . b 4 b . . . 
    2 . . . . . . . . b 4 b . . . . 
    . 2 2 . . . . . . b c . . . . . 
    . . 2 2 2 2 b b b b b b . . . . 
    . 2 2 . . 2 2 2 2 2 2 2 b . . . 
    . . . . b f f f 1 f 4 4 d f . . 
    . . . . b 4 4 f f f 2 2 4 c . . 
    . . . . b 4 4 d f b d 2 2 4 . . 
    b d d d b b d 4 4 4 4 2 2 2 2 2 
    b b d 2 2 4 b 4 2 2 2 2 4 4 b . 
    b d c 4 4 2 4 d 4 4 4 4 4 b . . 
    c d d c d 4 4 b 4 4 2 4 4 4 b . 
    c b d d c c b 4 4 4 2 4 4 4 b . 
    . c d d d d d d 4 2 2 4 4 d b . 
    . . c b d d d d d 2 4 4 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
火雞非.addAnimationFrame(img`
    . . . 2 2 . . . . . b 4 b . . . 
    . 2 . . 2 . . . . b 4 b . . . . 
    . . 2 2 2 . b b b b b b . . . . 
    . . 2 2 2 2 2 2 2 2 2 2 b . . . 
    . 2 2 . b b f f 1 f 4 d 2 c . . 
    . 2 . . b 4 4 f f f d d 2 2 2 2 
    . . . . b 2 4 d f b 4 2 2 4 b . 
    . . . b d 2 4 4 4 2 2 2 4 b . . 
    . . b d d 2 2 4 4 4 4 4 4 b . . 
    . b d d d d 4 2 2 4 4 4 2 4 b . 
    b d d d b b b 4 2 4 4 2 4 4 b . 
    c d d b 2 4 d c 4 2 2 4 4 4 b . 
    c b b d 4 d c d 4 2 4 4 4 4 b . 
    . b 2 2 b c d d 4 4 4 4 4 d b . 
    b b c c c d d d d 4 4 2 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
火雞非.addAnimationFrame(img`
    . . . 2 2 . . . . . b 4 b . . . 
    . 2 . . 2 . . . . b 4 b . . . . 
    . . 2 2 2 . b b b b b b . . . . 
    . . 2 2 2 2 2 2 2 2 2 2 b . . . 
    . 2 2 . b b f f 1 f 4 d 2 c . . 
    . 2 . . b 4 4 f f f d d 2 2 2 2 
    . . . . b 2 4 d f b 4 2 2 4 b . 
    . . . b d 2 4 4 4 2 2 2 4 b . . 
    . . b d d 2 2 4 4 4 4 4 4 b . . 
    . b d d d d 4 2 2 4 4 4 2 4 b . 
    b d d d b b b 4 2 4 4 2 4 4 b . 
    c d d b 2 4 d c 4 2 2 4 4 4 b . 
    c b b d 4 d c d 4 2 4 4 4 4 b . 
    . b 2 2 b c d d 4 4 4 4 4 d b . 
    b b c c c d d d d 4 4 2 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
火雞非.addAnimationFrame(img`
    . . . . . . . . . . b 4 b . . . 
    . . 2 . . . . . . b 4 b . . . . 
    . . 2 2 2 . b b b b c b . . . . 
    . . . . 2 2 2 2 b b b b b . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 f . . 
    . 2 2 . b f f f 1 f 4 4 f f . . 
    2 . . . b 4 f f f f 4 d 2 c . . 
    2 2 2 4 b 4 4 d f f d d 2 4 4 b 
    4 4 2 4 b b d 4 4 4 4 4 2 2 2 2 
    b 2 2 4 4 4 b 4 4 4 2 2 2 4 b . 
    b 4 c 4 4 4 4 d 4 2 2 4 4 b b . 
    c 4 2 c d 4 4 b 2 2 4 4 4 4 b . 
    c b 2 4 c c b 4 4 4 4 4 4 4 b . 
    . c 4 4 2 2 4 4 4 4 4 4 4 d b . 
    . . c b 4 2 4 4 4 4 4 4 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
animation.attachAnimation(火雞, 火雞非)
game.onUpdate(function () {
    if (火雞.x > 0) {
        animation.setAction(火雞, ActionKind.Idle)
    }
    if (火雞.x > 120 || 火雞.x < 0) {
        game.over(false)
    }
    if (火雞.x >= 120) {
        game.over(false)
    }
})
game.onUpdateInterval(1300, function () {
    地圖 = randint(0, 0)
    while (info.score() >= 120) {
        if (true) {
            game.over(true, effects.bubbles)
        }
    }
    if (地圖 == 0) {
        topImage = img`
            ....fffffffffffffff.....
            ...ffffffffffffffff.....
            ...fffffffffffffffff....
            ..fffdddddddddddddff....
            ...ffdfffffffffffdf.....
            ....ff22fffffffffff.....
            ....f444eeeee4e2fff.....
            ....242eeeeee44422......
            ....44eeeeeeeee422......
            ...244e44eeeeee422......
            ...222e4ee4ee444e22.....
            ...2..e4ee44e444222.....
            ...222eeeee4e4ee222.....
            .....22eeee42ee22b......
            ......2224242222b.......
            ........24442e22........
            `
        bottomImage = img`
            ........................
            ........................
            ............2...........
            ............22..........
            ...........242..........
            ...........242..........
            .........d2242..........
            ...2.....22e4222........
            ..22.....2ee4e22........
            ..22.....2e4e222........
            ..222....2e4e222........
            ..2.22...2e4e22222e.....
            ..2222222ffccc24422.....
            ...2222224222244222.....
            ...2ee22442224422222....
            ..22ee22242222222222....
            ..2eee42242244422222....
            ..22ee42244422422222....
            ...4ee4e22222442e222....
            ...44444222244222222....
            ...44eee24e44e4e2222....
            ....222ee44444ee2222....
            ....282eeee48222222.....
            ....22222224e2ee222.....
            .....2ee2e2ee2ee222.....
            .....2eeee2ee2ee22......
            .....2e2222e22ee222.....
            .....2e222222eeeec22....
            .....222244eeeeee222....
            .....22224eee22ee2.2....
            .....22224eee22ee2.2....
            .....22ee4ee2e2ee2.2....
            ......2244ee2e2ee2.2....
            .......264ee2e222222....
            ......4442222222242.....
            ......4442222222442.....
            ....2.4e22222222222.....
            ...2224e22222224422.....
            ...2422e2222222222......
            ...2442222222242........
            ...224ee22222422........
            ....244422224222........
            .....22444424222........
            ......2e44224422........
            ......222222242222......
            ........222244444422....
            ........222224444422....
            ........22222222242.....
            ........22222224482.....
            .....22.22222224422.....
            ....2.222222222242......
            ....22c44442222242......
            .....2244222222444......
            .....2244422222244......
            ...2.2222222222442.f....
            ..f2222222ee22e442ff....
            ..fff2222222222222f.....
            ....f224444444422ff.....
            ....ffffffffffffffff....
            ..fffdffffffffffffdfff..
            ..fffddddddddddddddfff..
            ...ffffffffffffffffff...
            ....ffffffffffffffff....
            .....fffffffffffff......
            `
    }
    gapImage = image.create(2, scene.screenHeight())
    gapImage.fill(1)
    gapSprite = sprites.create(gapImage, SpriteKind.Gap)
    gapSprite.setFlag(SpriteFlag.AutoDestroy, true)
    gapSprite.setFlag(SpriteFlag.Invisible, true)
    gapSprite.left = scene.screenWidth()
    gapSprite.vx = -45
    projectile = sprites.createProjectileFromSide(topImage, -45, 0)
    projectile.top = 0
    projectile = sprites.createProjectileFromSide(bottomImage, -45, 0)
    projectile.bottom = scene.screenHeight()
})
