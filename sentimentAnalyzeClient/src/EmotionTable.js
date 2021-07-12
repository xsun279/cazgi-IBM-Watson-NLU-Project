import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        const emotions = this.props.emotions
        const mappedEmotions = Object.keys(emotions).map(ems =>
            {
                console.log(ems)
                return(
                    <>
                    <tr>
                    <td>{ems}</td>
                    <td>{emotions[ems]}</td>
                    </tr>
                    </>
                )
            })
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {mappedEmotions}
            </tbody>
          </table>
          </div>
          );
        }
}
export default EmotionTable;
