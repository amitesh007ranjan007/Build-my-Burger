import React, {Component} from 'react';
import Auxilliary from '../Auxilliary';
import  Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error:error});
            });
        }

        modalClosedHandler = () => {
            this.setState({error: null});
        }
        render() {
            return (
                <Auxilliary>
                    <Modal show={this.state.error} modalClosed={this.modalClosedHandler}>
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxilliary>
                
            )

        }
    }

}

export default withErrorHandler;