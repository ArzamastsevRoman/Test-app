export default class Api {
    constructor (url) {
        this._url = url;

        this.getImage = this.getImage.bind(this);
        this.getImagePopup = this.getImagePopup.bind(this);
        this.addComments = this.addComments.bind(this);
        this.getComments = this.getComments.bind(this);
    }

    getImage () {
        return fetch(`${this._url}`, {
            method: 'GET'
        })
        .then(res => {

			if(res.ok) {
                return res.json();
            } else {
                alert(`${err}: ${err.status}`);
            }
            return Promise.reject(res);
        })
    }

    getImagePopup (id) {
        this._id = id;
        return fetch(`${this._url}/${this._id}`, {
            method: 'GET'
        })
        .then(res => {
			if(res.ok) {
                return res.json();
            } else {
                alert(`${err}: ${err.status}`);
            }
            return Promise.reject(res);
        })
    }

    addComments (name, id, comments) {
        this._name = name;
        this._id = id;
        this._comments = comments;
        return fetch(`${this._url}/${this._id}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                name: `${this._name}`,
                comments: `${this._comments}`
            })
        })
        .then(res => {
			if(res.ok) {
                return res.json();
            } else {
                alert(`${err}: ${err.status}`);
            }
            return Promise.reject(res);
        })
    }

    getComments (id, comments) {
        this._id = id;
        this._comments = comments;
        return fetch(`${this._url}/${this._id}/comments`, {
            method: 'GET'
        })
        .then(res => {
			if(res.ok) {
                return res.json();
            } else {
                alert(`${err}: ${err.status}`);
            }
            return Promise.reject(res);
        })
    }
}