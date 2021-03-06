import React,{Component} from 'react'
import './PaxDetails.css';

class AdditionalData extends Component {
    state = {
        value: this.props.addiValue.qty, 
        disablebutton:false, 
        maxPerBook:this.props.maxPerBook ,
        balance_additional:this.props.balance_additional ,
        usedQuota:this.props.usedQuota,
        quota:this.props.quota
    }
    handleIncreement = (id)  => {   
        var count = this.state.value;
        count= count +1;
        var finQuota;
        var FirstVal = this.state.quota - this.state.usedQuota;
        var SecondVal = this.state.maxPerBook; 
        // this.setState({value:count});       
        // if(FirstVal<SecondVal){
        //     finQuota = FirstVal;
        // }
        // else{
        //     finQuota = SecondVal;
        // }
        finQuota = this.state.balance_additional;

        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if(isSafari) {
            setTimeout(() => {
                if(finQuota<=0){
                    count = 0;
                    this.setState({
                        disablebutton:true
                    })
                }
                if(this.state.value===finQuota - 1){
                    this.setState({
                        disablebutton:true
                    })
                }
               this.setState({value:count});
               this.props.myFun(id.id,count,id.balance_additional);
            },0)
        }
        else{
            if(finQuota<=0){
                count = 0;
                this.setState({
                    disablebutton:true
                })
            }
            if(this.state.value===finQuota - 1){
                this.setState({
                    disablebutton:true
                })
            }
            this.setState({value:count});
            this.props.myFun(id.id,count,id.balance_additional);
        }
    
    }

    handleDecreement = (id)  => {    
        this.setState({
            disablebutton:false
        })
        var count = this.state.value;
        if(count<1){
            count = 0
        } 
        else{
            count= count -1;
        }

        this.setState({value:count});

        this.props.decrement(id.id,count,id.max_per_booking)
    }

    formatThousands =(n, dp) => {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }


    render(props) {
        return (
            // <div className='col-sm-12'>
            <div className='row px-3'>
            <div className='col-sm-3 border p-2'>
            <p style={{ display:"flex" }} className='mt-2'>
            <button id="subs" onClick ={ () => this.handleDecreement(this.props.it)} className="pull-left btnMinus"><i className='fa fa-minus'></i></button>
            <input type="text" name={this.props.it.id} value={this.state.value} className="additoinalTextBox form-control pull-left" id="noOfRoom" readOnly={true}/>&nbsp;
            <button type="button" onClick={()=>this.handleIncreement(this.props.it)} id="adds" disabled ={this.state.disablebutton} className="btnPlus" ><i className='fa fa-plus'></i></button>
            </p>
            </div>
            <div className='col-sm-9 border p-2'>
                <h5 className='addProductRightHead'>{this.props.it.description} <span className='productAmt'> ({this.props.currency} {this.formatThousands(this.props.it.amount)}) </span></h5>
                <p className='Remark' >Remark:{this.props.it.remark} </p>
                <p className="paxCountClass">(Maximum Per Booking = {this.props.it.balance_additional})</p>
            </div>
            </div>
            // </div>
        )
    }
}

export default AdditionalData

