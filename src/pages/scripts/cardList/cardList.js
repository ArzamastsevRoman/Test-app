import Card from '../card/card'

export default class CardList {
    constructor (container, array) {
        this.container = container;
        this.array = array;

        this.render = this.render.bind(this);
    }

    render() {
        if (window.innerWidth < 768) {
            for (let i = 0; i < 3; i++) {
                const { resultCard } = new Card(this.array[i].url, this.array[i].id);
                this.container.appendChild(resultCard);
                this.resultCard = resultCard;
            }
        } else if (this.array.length > 0) {
            for (let i = 0; i < this.array.length; i++) {
                const { resultCard } = new Card(this.array[i].url, this.array[i].id);
                this.container.appendChild(resultCard);
                this.resultCard = resultCard;
            }
        }
    }
}