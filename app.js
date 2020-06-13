let myWeapon;
let currentPlayer = 'player-one';
let hoverColor = 'player-one-hover';
let isGameOver = false;

const topLeftTile = document.getElementById('top-left');
const topMidTile = document.getElementById('top-mid');
const topRightTile = document.getElementById('top-right');
const midLeftTile = document.getElementById('mid-left');
const midMidTile = document.getElementById('mid-mid');
const midRightTile = document.getElementById('mid-right');
const botLeftTile = document.getElementById('bot-left');
const botMidTile = document.getElementById('bot-mid');
const botRightTile = document.getElementById('bot-right');

class UI {
   static hideKano() {
      document.querySelector('.overlay').remove();
   }
}

class Enemy {

}

class Player {

   static animateWeapons() {
      let winner;
      const generateWeapon = setInterval(function () {
         winner = Player.evaluateKanoWinner(Player.generateMyRandomWeapon(), Player.generateRandomEnemyWeapon());
      }, 99);

      setTimeout(() => {
         clearInterval(generateWeapon);

         if (winner === 'me') {
            $('#playerBlueKanoWinnerModal').modal();
         } else if (winner === 'enemy') {
            $('#playerRedKanoWinnerModal').modal();
         } else if (winner === 'tie') {
            $('#tieKanoWinnerModal').modal();
         }
      }, 5000);

   }

   static selectWeapon(target) {
      if (target.id === 'btn-scissor' || target.parentElement.id === 'btn-scissor') {
         myWeapon = 'scissors';
      }
      if (target.id === 'btn-rock' || target.parentElement.id === 'btn-rock') {
         myWeapon = 'rock';
      }
      if (target.id === 'btn-paper' || target.parentElement.id === 'btn-paper') {
         myWeapon = 'paper';
      }
      const myWeaponBox = document.querySelector('.myWeaponBox');
      const i = document.createElement('i');
      i.className = `fas fa-hand-${myWeapon} weapon`;

      if (document.querySelector('.weapon') != null) {
         document.querySelector('.weapon').remove();
      }

      myWeaponBox.appendChild(i);
   }

   static generateMyRandomWeapon() {
      let myWeapon = ['scissors', 'rock', 'paper'];
      let randNum;


      randNum = Math.floor(Math.random() * 3);

      const myWeaponBox = document.querySelector('.myWeaponBox');
      const i = document.createElement('i');
      i.className = `fas fa-hand-${myWeapon[randNum]} weapon`;

      if (document.querySelector('.weapon') != null) {
         document.querySelector('.weapon').remove();
      }

      myWeaponBox.appendChild(i);

      return myWeapon[randNum];
   }

   static generateRandomEnemyWeapon() {
      let enemyWeapon = ['scissors', 'rock', 'paper'];
      let randNum;

      randNum = Math.floor(Math.random() * 3);

      const enemyWeaponBox = document.querySelector('.enemyWeaponBox');
      const i = document.createElement('i');
      i.className = `fas fa-hand-${enemyWeapon[randNum]} enemy-weapon`;

      if (document.querySelector('.enemy-weapon') != null) {
         document.querySelector('.enemy-weapon').remove();
      }

      enemyWeaponBox.appendChild(i);

      return enemyWeapon[randNum];
   }

   static evaluateKanoWinner(myWeapon, enemyWeapon) {
      // Me As A Winner
      if (myWeapon === 'scissors' && enemyWeapon === 'paper') {
         return 'me';
      }
      if (myWeapon === 'paper' && enemyWeapon === 'rock') {
         return 'me';
      }
      if (myWeapon === 'rock' && enemyWeapon === 'scissors') {
         return 'me';
      }

      // Enemy As A Winner
      if (myWeapon === 'paper' && enemyWeapon === 'scissors') {
         return 'enemy';
      }
      if (myWeapon === 'rock' && enemyWeapon === 'paper') {
         return 'enemy';
      }
      if (myWeapon === 'scissors' && enemyWeapon === 'rock') {
         return 'enemy';
      }

      // Tie
      if (myWeapon === 'scissors' && enemyWeapon === 'scissors') {
         return 'tie';
      }
      if (myWeapon === 'rock' && enemyWeapon === 'rock') {
         return 'tie';
      }
      if (myWeapon === 'paper' && enemyWeapon === 'paper') {
         return 'tie';
      }
   }

   static showEnemy() {
      document.querySelector('.enemy').classList.replace('d-none', 'd-flex');
   }

   static showMe() {
      document.querySelector('.me').classList.remove('d-none');

   }

   static hideWeaponButtons() {
      document.querySelector('.buttons').classList.add('d-none');
      // document.getElementById('youText').classList.remove('d-none');
   }

   static switchTurn(player) {
      if (player === 'player-one') {
         currentPlayer = 'player-two';
         hoverColor = 'player-two-hover';

         document.getElementById('player-red-box').classList.add('bg-danger');
         document.getElementById('player-red-box').classList.remove('bg-secondary');

         document.getElementById('player-blue-box').classList.add('bg-secondary');
         document.getElementById('player-blue-box').classList.remove('bg-primary');
      }

      if (player === 'player-two') {
         currentPlayer = 'player-one';
         hoverColor = 'player-one-hover';


         document.getElementById('player-red-box').classList.remove('bg-danger');
         document.getElementById('player-red-box').classList.add('bg-secondary');

         document.getElementById('player-blue-box').classList.remove('bg-secondary');
         document.getElementById('player-blue-box').classList.add('bg-primary');
      }
   }
}

class Board {
   static listenForVacantTiles() {
      const tiles = document.querySelectorAll('.vacant');
      const randTileNum = Math.floor(Math.random() * tiles.length);

      tiles.forEach(function (tile, index) {
         if (index === randTileNum) {
            console.log(randTileNum);
            console.log(tile);
            if (isGameOver === false) {
               tile.classList.add('player-two');
               tile.innerHTML = '<i class="far fa-circle text-dark occupied"></i>';
               tile.classList.replace('vacant', 'occupied');
            }
         }
         // Board.occupyTile(tile.randTileNum);
      });

      Board.listenForWinner();

   }

   static randomlyOccupyATile() {
      const tiles = document.querySelectorAll('.vacant');
      const randTileNum = Math.floor(Math.random() * tiles.length);

      tiles.forEach(function (tile, index) {
         if (index === randTileNum) {
            console.log(randTileNum);
            console.log(tile);
            if (isGameOver === false) {
               tile.classList.add('player-two');
               tile.innerHTML = '<i class="far fa-circle text-dark occupied"></i>';
               tile.classList.replace('vacant', 'occupied');
            }
         }
      });
   }

   static occupyTile(tile, player) {

      if (!(tile.classList.contains('occupied'))) {

         tile.classList.add('player-one');
         tile.innerHTML = '<i class="fas fa-times text-dark occupied"></i>';

         // if (player === 'player-one') {
         // tile.classList.add('player-one');
         // tile.innerHTML = '<i class="fas fa-times text-dark occupied"></i>';
         // }

         // if (player === 'player-two') {
         //    tile.classList.add('player-two');
         //    tile.innerHTML = '<i class="far fa-circle text-dark occupied"></i>';
         // }

         tile.classList.replace('vacant', 'occupied');
         // Player.switchTurn(currentPlayer);

         Board.listenForVacantTiles();
      }
   }

   static listenForWinner() {
      // TOP HORIZONTAL LINE
      if (
         topLeftTile.classList.contains('player-one') &&
         topMidTile.classList.contains('player-one') &&
         topRightTile.classList.contains('player-one')
      ) {
         Board.getWinner(topMidTile);
         isGameOver = true;
         console.log(topMidTile);
      } else if (
         // MIDDLE HORIZONTAL LINE
         midLeftTile.classList.contains('player-one') &&
         midMidTile.classList.contains('player-one') &&
         midRightTile.classList.contains('player-one')
      ) {
         Board.getWinner(midMidTile);
         isGameOver = true;
         console.log(midMidTile);
      } else if (
         // BOTTOM HORIZONTAL LINE
         botLeftTile.classList.contains('player-one') &&
         botMidTile.classList.contains('player-one') &&
         botRightTile.classList.contains('player-one')
      ) {
         Board.getWinner(botMidTile);
         isGameOver = true;
         console.log(botMidTile);
      } else if (
         // LEFT VERTICAL LINE
         topLeftTile.classList.contains('player-one') &&
         midLeftTile.classList.contains('player-one') &&
         botLeftTile.classList.contains('player-one')
      ) {
         Board.getWinner(midLeftTile);
         isGameOver = true;
         console.log(midLeftTile);
      } else if (
         // MIDDLE VERTICAL LINE
         topMidTile.classList.contains('player-one') &&
         midMidTile.classList.contains('player-one') &&
         botMidTile.classList.contains('player-one')
      ) {
         Board.getWinner(midMidTile);
         isGameOver = true;
         console.log(midMidTile)
      } else if (
         // RIGHT VERTICAL LINE
         topRightTile.classList.contains('player-one') &&
         midRightTile.classList.contains('player-one') &&
         botRightTile.classList.contains('player-one')
      ) {
         Board.getWinner(midRightTile);
         isGameOver = true;
         console.log(midRightTile)

      } else if (
         // FORWARD DIAGONAL LINE
         topRightTile.classList.contains('player-one') &&
         midMidTile.classList.contains('player-one') &&
         botLeftTile.classList.contains('player-one')
      ) {
         Board.getWinner(midMidTile);
         isGameOver = true;
         console.log(midMidTile)

      } else if (
         // BACKWARD DIAGONAL LINE
         topLeftTile.classList.contains('player-one') &&
         midMidTile.classList.contains('player-one') &&
         botRightTile.classList.contains('player-one')
      ) {
         Board.getWinner(midMidTile);
         isGameOver = true;
         console.log(midMidTile)

      } else {
         // PLAYER TWO

         // TOP HORIZONTAL LINE
         if (
            topLeftTile.classList.contains('player-two') &&
            topMidTile.classList.contains('player-two') &&
            topRightTile.classList.contains('player-two')
         ) {
            Board.getWinner(topMidTile);
            isGameOver = true;
            console.log(topMidTile);
         }

         // MIDDLE HORIZONTAL LINE
         if (
            midLeftTile.classList.contains('player-two') &&
            midMidTile.classList.contains('player-two') &&
            midRightTile.classList.contains('player-two')
         ) {
            Board.getWinner(midMidTile);
            isGameOver = true;
            console.log(midMidTile);

         }

         // BOTTOM HORIZONTAL LINE
         if (
            botLeftTile.classList.contains('player-two') &&
            botMidTile.classList.contains('player-two') &&
            botRightTile.classList.contains('player-two')
         ) {
            Board.getWinner(botMidTile);
            isGameOver = true;
            console.log(botMidTile);

         }

         // LEFT VERTICAL LINE
         if (
            topLeftTile.classList.contains('player-two') &&
            midLeftTile.classList.contains('player-two') &&
            botLeftTile.classList.contains('player-two')
         ) {
            Board.getWinner(midLeftTile);
            isGameOver = true;
            console.log(midLeftTile);

         }

         // MIDDLE VERTICAL LINE
         if (
            topMidTile.classList.contains('player-two') &&
            midMidTile.classList.contains('player-two') &&
            botMidTile.classList.contains('player-two')
         ) {
            Board.getWinner(midMidTile);
            isGameOver = true;
            console.log(midMidTile);

         }

         // RIGHT VERTICAL LINE
         if (
            topRightTile.classList.contains('player-two') &&
            midRightTile.classList.contains('player-two') &&
            botRightTile.classList.contains('player-two')
         ) {
            Board.getWinner(midRightTile);
            isGameOver = true;
            console.log(midRightTile);

         }

         // FORWARD DIAGONAL LINE
         if (
            topRightTile.classList.contains('player-two') &&
            midMidTile.classList.contains('player-two') &&
            botLeftTile.classList.contains('player-two')
         ) {
            Board.getWinner(midMidTile);
            isGameOver = true;
            console.log(midMidTile);

         }

         // BACKWARD DIAGONAL LINE
         if (
            topLeftTile.classList.contains('player-two') &&
            midMidTile.classList.contains('player-two') &&
            botRightTile.classList.contains('player-two')
         ) {
            Board.getWinner(midMidTile);
            isGameOver = true;
            console.log(midRightTile);

         }
      }

      if (
         topLeftTile.classList.contains('occupied') &&
         topMidTile.classList.contains('occupied') &&
         topRightTile.classList.contains('occupied') &&
         midLeftTile.classList.contains('occupied') &&
         midMidTile.classList.contains('occupied') &&
         midRightTile.classList.contains('occupied') &&
         botLeftTile.classList.contains('occupied') &&
         botMidTile.classList.contains('occupied') &&
         botRightTile.classList.contains('occupied')
      ) {
         if (isGameOver === false) {
            $("#tieModal").modal();
            isGameOver = true;
         }
      }
   }

   static getWinner(tile) {
      if (tile.classList.contains('player-one')) {
         $("#playerOneWinnerModal").modal();
      } else {
         $("#playerTwoWinnerModal").modal();
      }
   }
}

document.querySelectorAll('.tile').forEach(function (tile) {

   tile.addEventListener('click', function (e) {
      if (e.target.classList.contains('tile') || e.target.parentElement.classList.contains('tile')) {
         Board.occupyTile(e.target, currentPlayer);

         // Board.listenForWinner();


      }
   });

   tile.addEventListener('mouseover', function (e) {
      if (e.target.classList.contains('tile') || e.target.parentElement.classList.contains('tile')) {
         if (e.target.classList.contains('tile') && !(e.target.classList.contains('occupied'))) {
            e.target.classList.add(`${hoverColor}`);
         }
         if (e.target.parentElement.classList.contains('tile') && !(e.target.parentElement.classList.contains('occupied'))) {
            e.target.parentElement.classList.add(`${hoverColor}`);
         }

      }
   });
   tile.addEventListener('mouseout', function (e) {
      if (e.target.classList.contains('tile') || e.target.classList.contains('tile')) {
         if (e.target.classList.contains('tile') && !(e.target.classList.contains('occupied'))) {
            e.target.classList.remove(`${hoverColor}`);
         }
         if (e.target.parentElement.classList.contains('tile') && !(e.target.parentElement.classList.contains('occupied'))) {
            e.target.parentElement.classList.remove(`${hoverColor}`);
         }

      }
   });
});

document.querySelectorAll('[data-weapon]').forEach(function (btnWeapon) {
   btnWeapon.addEventListener('click', function (e) {
      // Player.selectWeapon(e.target);

      Player.hideWeaponButtons();
      Player.showMe();
      Player.showEnemy();


      Player.animateWeapons();


      // const generateWeapon = setInterval(function () {
      //    Player.generateRandomEnemyWeapon();
      // }, 100);

      // setTimeout(function () {
      //    clearInterval(generateWeapon);
      // }, 5000);


      // Player.evaluateKanoWinner(Player.generateMyRandomWeapon(), Player.generateRandomEnemyWeapon()));
   });
});

$(".modal-result, #tieKanoWinnerModal").on("hidden.bs.modal", function () {
   window.location.reload();
});

$(".modal-kano").on("hidden.bs.modal", function () {
   UI.hideKano();
});
$("#playerRedKanoWinnerModal").on("hidden.bs.modal", function () {
   Board.randomlyOccupyATile();
});