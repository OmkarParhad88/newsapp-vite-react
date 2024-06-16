

const NewsItem = ( { title, description, imageUrl, newsUrl,date,source} ) => {
  
    return (
      <>
        <div className="my-3">
          <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>

            <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/09/21/1600x900/WhatsApp_Image_2021-09-18_at_094218_1663718673100_1663718673298_1663718673298.jpeg" : imageUrl} className="card-img-top" alt="imageUrl " />
            <div className="card-body">
              <h5 className="card-title">{title} ...</h5>
              <p className="card-text">{description} ...</p>
              <p className="card-text"><small className="text-muted">Date {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  }


export default NewsItem
