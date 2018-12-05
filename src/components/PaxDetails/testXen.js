import React, { Component } from 'react'
import axios from 'axios';
// import './payment.css';
import Xendit from 'xendit-js-node';
import Modal from 'react-responsive-modal';
const EX_API_KEY = 'xnd_public_development_NImDfL511rH6wMJgKrcdT2PFZdWnpIR8xXOx+Rxg+mHV8LegCQR0hQ==';
export default class componentName extends Component {
    state ={
        amount: '75000',
        card_number: '4000000000000002',
        card_exp_month: '12',
        card_exp_year: '2019',
        card_cvn: '123',
        is_multiple_use: false,
        should_authenticate: true,
        should_use_meta: false,
        meta_json: '{}',
        isLoading: false,
        source: '',
        showModal:false,
        msg: '',
        dsWebView: false,
        redirectedUrl:null,
        creditCardToken: ''

    }
    componentWillMount(){
        Xendit.setPublishableKey(EX_API_KEY);

        // Request a token from Xendit:
        var tokenData = this.getTokenData();
        var fraudData = this.getFraudData();

        // if (this.state.should_use_meta) {
        //     Xendit.card.createToken(tokenData, fraudData, this.xenditResponseHandler.bind(this));
        // } else {
            Xendit.card.createToken(tokenData, this.xenditResponseHandler.bind(this));
        // }
    }
    getTokenData () {
        return {
            amount: this.state.amount,
            card_number: this.state.card_number,
            card_exp_month: this.state.card_exp_month,
            card_exp_year: this.state.card_exp_year,
            card_cvn: this.state.card_cvn,
            is_multiple_use: this.state.is_multiple_use,
            should_authenticate: this.state.should_authenticate
        };
    }

    getFraudData () {
        return JSON.parse(this.state.meta_json);
    }

    xenditResponseHandler (err, creditCardToken) {
        if (err) {
            this.setState({ isLoading: false });
            return this.displayError(err);
        }
        this.setState({ creditCardToken: creditCardToken })

        if (creditCardToken.status === 'APPROVED' || creditCardToken.status === 'VERIFIED') {
            this.displaySuccess(creditCardToken);
        } else if (creditCardToken.status === 'IN_REVIEW') {
            this.setState({ source: creditCardToken.payer_authentication_url })
            this.setState({ 
                redirectedUrl: creditCardToken.payer_authentication_url,
                showModal:true
             })
        } else if (creditCardToken.status === 'FRAUD') {
            this.displayError(creditCardToken);
        } else if (creditCardToken.status === 'FAILED') {
            this.displayError(creditCardToken);
        }

        this.setState({ isLoading: false });
        this.setState({ dsWebView: true });
    }

    displayError (err) {
        var requestData = Object.assign({}, this.getTokenData(), this.getFraudData());

        if (this.state.should_use_meta) {
            requestData["meta_enabled"] = true;
        } else {
            requestData["meta_enabled"] = false;
        }

        alert(
            'Error: \n' +
            JSON.stringify(err, null, 4) +
            '\n\n' +
            'Request Data: \n' +
            JSON.stringify(requestData, null, 4)
        );
    };

    displaySuccess (creditCardToken) {
        var requestData = Object.assign({}, this.getTokenData(), this.getFraudData());

        if (this.state.should_use_meta) {
            requestData["meta_enabled"] = true;
        } else {
            requestData["meta_enabled"] = false;
        }

        alert(
            'RESPONSE: \n' +
            JSON.stringify(creditCardToken, null, 4) +
            '\n\n' +
            'Request Data: \n' +
            JSON.stringify(requestData, null, 4)
        );
    }

    render() {
        var src = this.state.source;
        // if(src!==''){
        //     var srcc = (
        //         <iframe width='450px' height='500px' src={this.state.source}></iframe>  
        //     )
        // }
        return(
            <Modal 
            open={this.state.showModal} 
            closeOnEsc={false} 
            showCloseIcon={true} 
            closeOnOverlayClick={false} 
            onClose={this.onCloseModal} 
            blockScroll={true}
            center>
                <iframe title='payment-confirmation' className='iframeProps' src={this.state.redirectedUrl}/>
         </Modal>
            
        )
    }
}
