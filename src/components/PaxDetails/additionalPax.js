import React,{Component} from 'react'
import './PaxDetails.css';

class AdditionalPax extends Component {;
    state = {
        value: 0, 
        disablebutton:false, 
        maxPerBook:this.props.maxPerBook ,
        usedQuota:this.props.usedQuota,
        maxQuota:this.props.maxQuota,
        min:this.props.min,
        max:this.props.max
    }
    handleIncreement = (name,data)  => { 
        console.log(this.props.min);  
        var count = this.state.value;
        count= count +1;
        var finQuota;
        var FirstVal = this.state.quota - this.state.usedQuota;
        var SecondVal = this.state.maxPerBook; 
            this.setState({
                value:count,
            });
            this.props.countValuesIncre();

        this.props.myFun(name,data,count);
    
    }

    handleDecreement = (name,data)  => {    
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
        this.props.countValuesDecre();
        this.setState({value:count});
        this.props.decrement(name,data,count);
    }

    formatThousands =(n, dp) => {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }


    render(props) {
        return (
            <div className='row'>
            <div className='col-sm-3'>
            <label style={{ display:"flex" }} className='mt-2'>
            <button id="subs" onClick ={ () => this.handleDecreement(this.props.it.pax_type,this.props.it)} className="pull-left btnMinus"><i className='fa fa-minus'></i></button>
            <input type="text" name={this.props.it.pax_type} value={this.state.value} className="additoinalTextBox form-control pull-left" id="noOfRoom" />&nbsp;
            <button type="button" onClick={()=>this.handleIncreement(this.props.it.pax_type,this.props.it)} id="adds" disabled ={this.props.standardPaxDisable} className="btnPlus" ><i className='fa fa-plus'></i></button>
            </label>
            </div>
            <div className='col-sm-6'>
                <h5 className='addProductRightHead'>{this.props.it.pax_type} <span className='productAmt'> ({this.props.currency} {this.formatThousands(this.props.it.amount)}) </span></h5>
                <p className='Remark'>Age {this.props.it.age_from}-{this.props.it.age_to}</p>
                {this.props.it.pax_type==='ADULT' || this.props.it.pax_type==='CHILD' || this.props.it.pax_type==='INFANT'?'':<p className='paxCountClass mb-2'>Minimum Pax {this.props.it.minimum}</p>}
            </div>
            </div>
        )
    }
}

export default AdditionalPax;

