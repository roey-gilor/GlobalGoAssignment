import React, { Component } from 'react'
import $ from 'jquery';
import ImageGallery from 'react-image-gallery';

export class Comp extends Component {
    constructor(props) {
        super(props)
        this.refImg = React.createRef(null);
        this.state = { repository: '', results: [], repositoryName: '', repositoryDetails: [] }
    }

    getRepositories = async () => {
        let result;
        try {
            result = await $.ajax({
                type: "GET",
                url: `https://api.github.com/search/repositories?q=${this.state.repository}`,
                contentType: 'application/json'
            })
            this.setState({ results: result.items })
            this.setState({ repositoryName: result.items[0].full_name })
            let details = JSON.stringify({
                id: result.items[0].id,
                name: result.items[0].name,
                full_name: result.items[0].full_name,
                owner_name: result.items[0].owner.login
            })
            this.setState({ repositoryDetails: details })
        } catch (error) {
            console.log(error);
        }
    }

    imageChanged = () => {
        let index = this.refImg.current.getCurrentIndex();
        this.setState({ repositoryName: this.state.results[index].full_name })
        let details = JSON.stringify({
            id: this.state.results[index].id,
            name: this.state.results[index].name,
            full_name: this.state.results[index].full_name,
            owner_name: this.state.results[index].owner.login
        })
        this.setState({ repositoryDetails: details })
    }


    render() {

        let images = []
        if (this.state.results.length !== 0) {
            this.state.results.map((item) => {
                images.push({
                    original: item.owner.avatar_url,
                    thumbnail: item.owner.avatar_url
                })
            })
        }

        return (
            <div>
                <h1>API Part</h1>
                <input placeholder='Enter repository name' type='text'
                    onChange={((e) => this.setState({ repository: e.target.value }))} /> <br /> <br />
                <input type='button' value='Search' onClick={() => { this.getRepositories() }} /> <br /> <br />
                {this.state.repositoryName !== '' && this.state.repositoryName} {' '}
                {this.state.repositoryName !== '' && <input type='button' value='bookmark' />} {' '}
                {this.state.repositoryName !== '' && <input type='button' value='send email' />}  <br /> <br />
                {images.length !== 0 && <ImageGallery ref={this.refImg}
                    onSlide={() => { this.imageChanged() }} items={images} />}
            </div>
        )
    }
}

export default Comp