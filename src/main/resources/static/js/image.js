const battle = {
    monster: {
        hp: 100,
        image: 'monster.png' // Replace with the actual image
    }
};

let monsterImage = monsterImage = document.getElementById("1");
// Replace with the actual ID of the monster image ID


//event listener
battle.addEventListener('change', function() {
    const hpPercentage = (battle.monster.hp / 100) * 100;
    if (hpPercentage <= 75) {
        monsterImage.src = 'new-stage-image.png'; //again, replace with the actual image
    } else  if (hpPercentage <= 50) {
        monsterImage.src = 'new-stage-image.png'; //again, replace with the actual image
    } else  if (hpPercentage <= 25) {
        monsterImage.src = 'new-stage-image.png'; //again, replace with the actual image
    } else  if (hpPercentage === 0) {
        monsterImage.src = 'new-stage-image.png'; //again, replace with the actual image
    }
});