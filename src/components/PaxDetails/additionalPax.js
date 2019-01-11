import React,{Component} from 'react'
import './PaxDetails.css';

class AdditionalPax extends Component {
    state = {
        value: 0, 
        disablebutton:false, 
        maxPerBook:this.props.maxPerBook ,
        usedQuota:this.props.usedQuota,
        quota:this.props.quota,
        maxQuota:this.props.balance_pax,
        min:this.props.min,
        max:this.props.max
    }
    handleIncreement = (name,data)  => { 
        // console.log(data);
       if(!this.state.disablebutton){
       let {quota,usedQuota,maxPerBook} =this.state;
       let val1 = quota-usedQuota,val2,maxQutVal=0;
       var count = this.state.value;
       if(data.pax_type!=='ADULT' || data.pax_type!=='CHILD' || data.pax_type!=='INFANT'){
        // if(maxPerBook<data.maximum){
        //     val2 = maxPerBook;
        // }
        // else{
        //     val2 = data.maximum;
        // }
        // if(val1<val2){
        //     maxQutVal = val1;
        // }
        // else{
        //     maxQutVal = val2;
        // }
        maxQutVal = this.props.balance_pax;
        var maxPackage = this.props.balance_package;
        if(data.minimum>0 && count===0){
            count =data.minimum;
            // console.log('if1('+data.minimum>0 +'&&'+ count===0+')');
        }
        else{
            count = count + 1;
            // console.log(count = count + 1);
            // console.log(count );
        }
        if(count>maxPackage){
            count = maxPackage;
            // console.log('if(2'+count+'>'+maxPackage+')')
        }
       }else{
        // if(data.minimum>0 && count==0){
        //     count =data.minimum;
        // }
        // else{
            count= count + 1;
        //    console.log('else2 count = count+1: '+count);
        // }
       }
       
        var finQuota;
        var FirstVal = this.state.quota - this.state.usedQuota;
        var SecondVal = this.state.maxPerBook; 
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if(isSafari) {
            setTimeout(() => {
                this.setState({
                    value:count
                });
                this.props.myFun(name,data,count);
                console.log("Safari Count=>> "+count);
            },0)
        }else{
            this.setState({
                value:count
            });
            this.props.myFun(name,data,count);
            // console.log("Chrome Count=>> "+count);
        }
        
    }else{
        console.log("Disabled");
    }
            // this.props.countValuesIncre();
    }

    handleDecreement = (name,data)  => {  
        console.log("Decrement Called");  
        this.setState({
            disablebutton:false
        })
        var count = this.state.value;
        count= count -1;
        if(data.minimum>0 && count<data.minimum){
            count = 0;
            
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
            <div className={"row mx-0 " +(this.props.isPaxInvalid? "isPaxInvalid":'')}>
            <div className={'col-sm-3 border '+(this.props.it.pax_type==='ADULT' || this.props.it.pax_type==='CHILD' || this.props.it.pax_type==='INFANT'?'':'p-2')}>
            <label style={{ display:"flex" }} className='mt-2'>
            <button id="subs" onClick ={ () => this.handleDecreement(this.props.it.pax_type,this.props.it)} className="pull-left btnMinus"><i className='fa fa-minus'></i></button>
            <input type="text" name={this.props.it.pax_type} value={this.state.value} className="additoinalTextBox form-control pull-left" id="noOfRoom" readOnly={true}/>&nbsp;
            <button type="button" onClick={()=>this.handleIncreement(this.props.it.pax_type,this.props.it)} id="adds" disabled ={this.props.standardPaxDisable} className="btnPlus" ><i className='fa fa-plus'></i></button>
            </label>
            </div>
            <div className='col-sm-9 border p-2'>
                <h5 className='addProductRightHead'>{this.props.it.pax_type} <span className='productAmt'> ({this.props.currency} {this.formatThousands(this.props.it.amount)}) </span></h5>
                <p className='Remark'>Age {this.props.it.age_from}-{this.props.it.age_to}</p>
                {this.props.it.pax_type==='ADULT' || this.props.it.pax_type==='CHILD' || this.props.it.pax_type==='INFANT'?'':<p className='paxCountClass'>Minimum Pax {this.props.it.minimum}</p>}
            </div>
            </div>
        )
    }
}

export default AdditionalPax;

