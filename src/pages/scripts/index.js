import '../index.css'

import '../../block/body/body.css'
import '../../block/main/main.css'
import '../../block/header/header.css'
import '../../block/footer/footer.css'
import '../../block/result/result.css'
import '../../block/popup/popup.css'

import Api from './api/api'
import CardList from './cardList/cardList'

export {apiImages}

const urlImage = 'https://boiling-refuge-66454.herokuapp.com/images';
const apiImages = new Api (urlImage);

const resultContent = document.querySelector('.result');

apiImages.getImage()
    .then((data) => {
        const startCardList = new CardList (resultContent, data);
        startCardList.render();
    })
	.catch(err => { 
        alert(`${err}: ${err.status}`);
		console.log(`catch err: ${err}: ${err.status}`); 
    });



