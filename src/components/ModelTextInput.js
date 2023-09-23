import '../assets/css/Home.css';
const ModelTextIput = (props) => {
    return (
        <div>
            <input className='modalTextInputStyles'
                id={props.id}
                value={props.Value}
                type={props.text}
                onChange={(e) => { props.onChangeHandler(e) }} />
        </div>
    )
}
export default ModelTextIput;