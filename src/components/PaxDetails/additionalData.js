import React,{Component} from 'react'
import './PaxDetails.css';
class AdditionalData extends Component {
    state = {value: this.props.addiValue.value }
    handleIncreement = (id)  => {     
        var count = this.state.value;
        count= count +1;
        this.setState({value:count});
    }
    handleDecreement = (id)  => {     
        var count = this.state.value;
        count= count -1;
        this.setState({value:count});
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
            <label style={{ display:"flex" }}>
            <button id="subs" onClick ={ () => this.handleDecreement(this.props.it)} className="pull-left btnMinus"><i className='fa fa-minus'></i></button>
            <input type="text" name={this.props.it.description} value={this.state.value} className="additoinalTextBox form-control pull-left" id="noOfRoom" />&nbsp;
            <button type="button" onClick={()=>this.handleIncreement(this.props.it)} id="adds" className="btnPlus" ><i className='fa fa-plus'></i></button>
            </label>
            </div>
            <div className='col-sm-6'>
                <h5 className='addProductRightHead'>{this.props.it.description} <span className='productAmt'> ({this.props.currency} {this.formatThousands(this.props.it.amount)}) </span></h5>
                <p className='Remark'>Remark:{this.props.it.remark} </p>
            </div>
            </div>
        )
    }
}

export default AdditionalData


// let additonalData = (      
//     a.map((item,i) => (
//         <div className='col-sm-12' key = {i}>
//         <h5 className='Meals mt-4'>{item.name}</h5>
//         <hr/>
//         {
//             item.details.map((it,i) => (
//                <div className='row' key={i}>
//                 <div className='col-sm-3'>
//                 <label style={{ display:"flex" }}>
//                 <button id="subs" className="pull-left btnMinus"><i className='fa fa-minus'></i></button>
//                 <input type="text" name={it.description} value={this.props.addiValue.counters[0].value} className="additoinalTextBox form-control pull-left" id="noOfRoom" />&nbsp;
//                 <button type="button" onClick={()=>this.handleIncreement(it)} id="adds" className="btnPlus" ><i className='fa fa-plus'></i></button>
//                 </label>
//                 </div>
//                 <div className='col-sm-6'>
//                     <h5 className='addProductRightHead'>{it.description} <span className='productAmt'> ({this.props.currency} {this.formatThousands(it.amount)}) </span></h5>
//                     <p className='Remark'>Remark:{it.remark} </p>
//                 </div>
//                 </div>
//             ))
//         }
//             </div>         
//         )) 
//     )
//     return (
//         {additonalData}
//     )
// }
// }
