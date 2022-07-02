import {Component , useContext} from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousal";
import ErrorBoundary from "./ErrorBoundry";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";
class Details extends Component {

    // constructor() {
    //     super();
    //     this.state = {loading : true}
    // }
    state = { loading: true , showModal: false};
    async componentDidMount() {
        const response = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
            );
            const json = await response.json();
            this.setState(
             {loading: false , ...json.pets[0]}
            )
    }
    toggelModal = () => this.setState({showModal: !this.state.showModal})
    render() {
        if (this.state.loading){
            return <h2>Loading .......</h2>
        }
        // throw new Error ("lmo you are Crashed")
        const { animal, breed, city, state, description, name , images ,showModal} = this.state;
        return(
            <div className="details" >
             <Carousel images={images}/>
              <h1>{name}</h1>
              <h2>{animal} - {breed} - {city} , {state}</h2>
              <ThemeContext.Consumer>
                {([theme])=>(
                <button onClick={this.toggelModal} style={{backgroundColor: theme}} >Adopt {name}</button>
                )}
              </ThemeContext.Consumer>
              <p>{description}</p>
              {
                showModal ? (
                    <Modal>
                        <h1>will you adopt {name}?</h1>
                        <a href="https://bit.ly/pet-adopt">Yes</a>
                        <button onClick={this.toggelModal}>No</button>
                     </Modal>
                ) : null }
            </div>
        )
    }
}
const WrappedDetails = () => {
    const params = useParams();
    return <ErrorBoundary> <Details params={params}  />;</ErrorBoundary>
  };
  
  export default WrappedDetails;