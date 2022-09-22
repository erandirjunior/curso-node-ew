class Hero {
	constructor({name, power, id}) {
		this.name = name;
		this.power = power;
		this.id = Number(id);
	}
}

module.exports = Hero;