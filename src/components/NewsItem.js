import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>


                <div className="card" >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '89%', zIndex:1}}>
                        {source}
                        </span>
                    <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2023/06/16/1600x900/Breaking-News-Live-Blog-pic_1627344775185_1683936134442_1686959400757.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
