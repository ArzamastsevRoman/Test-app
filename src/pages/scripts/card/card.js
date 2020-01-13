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
        this.addComment = this.addComment.bind(this);
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

        this.popupButton.onclick = this.addComment;
        this.popupButton.addEventListener('click', this.clearForm);

        apiImages.getComments(this.id)
            .then((data) => {
                for (let i=0; i<data.comments.length; i++) {
                    this.createComment(data.comments[i].text, data.comments[i].date);
                }
            })
            .catch(err => { 
                alert(`${err}: ${err.status}`);
                console.log(`catch err: ${err}: ${err.status}`); 
            });

        this.popup.querySelector('.popup__image').setAttribute('src', `${this.img}`);
    }

    close() {
        this.popup.setAttribute('style', 'display: none');
        this.popup.querySelector('.popup__content-comments').removeChild(this.popup.querySelector('.popup__comments'));
    }

    getComment() {
        apiImages.addComments(this.id);
    }

    createComment(comment, data) {
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
        
        commentText.textContent = comment;

        const today = new Date(data);
        const today_date = today.getDate();
        const today_month = today.getMonth() + 1;
        const today_year = today.getFullYear();
        const date = `${today_date}.${today_month}.${today_year}`;

        commentData.textContent = date;
    }

    addComment() {
        apiImages.addComments(this.popupInputName.value, this.id, this.popupInputComment.value);
        this.popup.querySelector('.popup__content-comments').removeChild(this.popup.querySelector('.popup__comments'));
        apiImages.getComments(this.id)
            .then((data) => {
                for (let i=0; i<data.comments.length; i++) {
                    this.createComment(data.comments[i].text, data.comments[i].date);
                }
            })
            .catch(err => { 
                alert(`${err}: ${err.status}`);
                console.log(`catch err: ${err}: ${err.status}`); 
            });
    }
    
    clearForm() {
        this.popupInputName.value = '';
        this.popupInputComment.value = '';
    }
}