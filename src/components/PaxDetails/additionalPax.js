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
        console.log(this.props.totalPax)
       let {quota,usedQuota,maxPerBook} =this.state;
       let val1 = quota-usedQuota,val2,maxQutVal=0;
       var count = this.state.value;
       if(data.pax_type!=='ADULT' || data.pax_type!=='CHILD' || data.pax_type!=='INFANT'){
        if(maxPerBook<data.maximum){
            val2 = maxPerBook;
        }
        else{
            val2 = data.maximum;
        }
        if(val1<val2){
            maxQutVal = val1;
        }
        else{
            maxQutVal = val2;
        }
        if(data.minimum>0 && count===0){
            count =data.minimum;
        }
        else{
            count= count +1;
        }
        if(count>maxQutVal){
            count = maxQutVal
        }
       }else{
        // if(data.minimum>0 && count==0){
        //     count =data.minimum;
        // }
        // else{
            count= count +1;
        // }
       }
       
        var finQuota;
        var FirstVal = this.state.quota - this.state.usedQuota;
        var SecondVal = this.state.maxPerBook; 
            this.setState({
                value:count,
            });
            this.props.myFun(name,data,count);
            // this.props.countValuesIncre();
    }

    handleDecreement = (name,data)  => {    
        this.setState({
            disablebutton:false
        })
        var count = this.state.value;
        count= count -1;
        if(data.minimum>0 && count<data.minimum){
            count =0;
            
        }else{
            if(count<1){
                count = 0
            } 
        }
        
        this.setState({value:count});
        this.props.decrement(name,data,count);
        this.props.countValuesDecre();
    }

    formatThousands =(n, dp) => {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }


    render(props) {
        return (
            <div className={"row " +(this.props.isPaxInvalid? "isPaxInvalid":'')}>
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
