function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			enemyHealth: 100,

			round: 0,

			winner: null,

			logs: [],
		};
	},
	methods: {
		attackMonster() {
			const damage = generateRandomNumber(12, 6);
			this.enemyHealth -= damage;
			this.attackPlayer();

			this.addLog('Player Attacked Monster', damage, 'player');
		},
		attackPlayer() {
			const damage = generateRandomNumber(15, 8);
			this.playerHealth -= damage;
			this.round++;

			this.addLog('Monster Attacked Player', damage, 'monster');
		},
		specialAttack() {
			const damage = generateRandomNumber(20, 35);
			this.enemyHealth -= damage;
			this.attackPlayer();

			this.addLog('Player Attacked Monster', damage, 'player');
		},
		healPlayer() {
			this.round++;

			const heal = generateRandomNumber(20, 24);
			if (this.playerHealth + heal > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += heal;
			}
			this.attackPlayer();

			this.addLog('Player Healed Himself', heal, 'heal');
		},
		startNewGame() {
			this.playerHealth = 100;
			this.enemyHealth = 100;
			this.round = 0;
			this.winner = null;
			this.logs = [];
		},
		surrender() {
			this.winner = 'Monster Won';
		},
		addLog(action, value, style) {
			this.logs.unshift({
				action,
				value,
				style,
			});
		},
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.enemyHealth <= 0) {
				this.winner = 'Draw Game';
			} else if (value <= 0) {
				this.playerHealth = 0;
				this.winner = 'Monster Won';
			}
			this.counter++;
		},
		enemyHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = 'Draw Game';
			} else if (value <= 0) {
				this.enemyHealth = 0;
				this.winner = 'Player Won';
			}
			this.counter++;
		},
	},
});

app.mount('#game');
