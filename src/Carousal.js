import {Component} from 'react';
class Carousel extends Component {
    state = {
        active : 0
    }
    static DefaultProps ={
        images : [
            "http://pets-images.dev-apis.com/pets/non.jpg"
        ]
    };
    handleIndexClick = (event) => {
      this.setState({
        active: +event.target.dataset.index
      })
    }
    render() {
        const {active} = this.state;
        const {images} = this.props;

        return ( 
            <div className='carousel'>  
              <img src={images[active]} alt="animals"/>
              <div className='carousel-smaller'>
                {images.map((photo , index) => (
                 <img
                    onClick={this.handleIndexClick}
                    key = {photo}
                    src ={photo} 
                    data-index = {index}
                    className={index === active ? "active" : ""}
                    alt="img  Thumbnail"
                    />
                ))}
              </div>
            </div>
        )
    }
}
export default Carousel;