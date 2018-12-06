import React, { Component } from 'react'
import Xendit from 'xendit-js-node';
import Modal from 'react-responsive-modal';

const EX_API_KEY = 'xnd_public_development_O4GJfL8k3eT7ncU6KBPHTWXYYf189YqwnGxRxnWXQ7CpCQZxjg';
export default class componentName extends Component {
    state = {
        showModal:false,
    }
    componentWillMount(){
        Xendit.setPublishableKey(EX_API_KEY);
        var tokenData = this.getTokenData();
        Xendit.card.createToken(tokenData, this.xenditResponseHandler.bind(this));
    }
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
    
    getFraudData () {
        return JSON.parse(this.state.meta_json);
    }

    getTokenData () {
        return {        
            "amount": "75000",        
            "card_number": "4000000000000002",
            "card_exp_month": "12",        
            "card_exp_year": "2018",
            "card_cvn": "123",
            "is_multiple_use": false,
            "should_authenticate": true,
        };
    }
    

    xenditResponseHandler (err, creditCardToken) {
        
        if (err) {
            return this.displayError(err);
        }
        if (creditCardToken.status === 'APPROVED' || creditCardToken.status === 'VERIFIED') {
            this.displaySuccess(creditCardToken);
            console.log("VERIFIED",creditCardToken.status);
            
        } 
        else if (creditCardToken.status === 'IN_REVIEW') {
            this.setState({ 
                redirectedUrl: creditCardToken.payer_authentication_url,
                showModal:true
             })
             window.open(creditCardToken.payer_authentication_url, 'sample-inline-frame');
        }
         else if (creditCardToken.status === 'FAILED') {
           this.displayError(creditCardToken)
        }
    }

    onCloseModal = () => {
        this.setState({ showModal: false });
      };
  render() {
    return (
      <div>
         <Modal 
            open={this.state.showModal} 
            closeOnEsc={false} 
            showCloseIcon={true} 
            closeOnOverlayClick={false} 
            onClose={this.onCloseModal} 
            blockScroll={true}
            center>
                <iframe title="Of" height="450" width="550" id="sample-inline-frame" name="sample-inline-frame"> </iframe>
         </Modal>
      </div>
    )
  }
}
