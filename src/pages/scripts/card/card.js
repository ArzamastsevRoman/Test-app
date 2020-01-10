import {apiImages} from '../index'

export default class Card {
    constructor (img, id) {
        this.img = img;
        this.id = id;

        this.create = this.create.bind(this);
        this.create();

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.popup = document.querySelector('.popup');

        this.popup.querySelector('.popup__close').onclick = this.close;
        this.resultCard.onclick = this.open;

        this.popupButton = this.popup.querySelector('.popup__button');
        this.popupForm = this.popup.querySelector('.popup__form');
		this.popupInputName = this.popupForm.elements.name;
		this.popupInputComment = this.popupForm.elements.comment;

        this.getComment = this.getComment.bind(this);
        this.createComment = this.createComment.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.popupButton.onclick = this.createComment;
        this.popupButton.addEventListener('click', this.clearForm);
        //this.popupButton.addEventListener('click', this.getComment);
    }

    create () {
        const resultCard = document.createElement('img');
		resultCard.classList.add('result__card');
        
        resultCard.setAttribute('src', `${this.img}`);
        resultCard.setAttribute('alt', 'Подгруженное изображение');

		this.resultCard = resultCard;
    }
    
    open() {
        this.popup.setAttribute('style', 'display: block');
        apiImages.getImagePopup(this.id);

        // apiImages.getComments(this.id)
        //     .then((data) => {
        //         console.log(data); 
        //     })
        //     .catch(err => { 
        //         alert(`${err}: ${err.status}`);
        //         console.log(`catch err: ${err}: ${err.status}`); 
        //     });

        this.popup.querySelector('.popup__image').setAttribute('src', `${this.img}`);
    }

    close() {
        this.popup.setAttribute('style', 'display: none');
    }

    getComment() {
        apiImages.addComments(this.popupInputName.value, this.id, this.popupInputComment.value);
    }

    createComment() {
        const contentComments = this.popup.querySelector('.popup__content-comments');
        
        const commentCard = document.createElement('div');
        commentCard.classList.add('popup__comments');
        contentComments.appendChild(commentCard);
        
        const commentData = document.createElement('p');
        commentData.classList.add('popup__comments-data');
        commentCard.appendChild(commentData);
        
        const commentText = document.createElement('p');
        commentText.classList.add('popup__comments-text');
        commentCard.appendChild(commentText);
        
        commentText.textContent = this.popupInputComment.value;

        const today = new Date();
        const today_date = today.getDate();
        const today_month = today.getMonth() + 1;
        const today_year = today.getFullYear();
        const date = `${today_date}.${today_month}.${today_year}`;

        commentData.textContent = date;

        apiImages.addComments(this.popupInputName.value, this.id, this.popupInputComment.value);
    }

    clearForm() {
        this.popupInputName.value = '';
        this.popupInputComment.value = '';
    }
}