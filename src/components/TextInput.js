import '../assets/css/Login.css';
const TextIput = (props) => {
    return (
        <div>
            <input className='inputStyles'
                id={props.id}
                value={props.Value}
                type={props.text}
                placeholder={props.placeholder}
                onChange={(e) => { props.onChangeHandler(e) }} />
        </div>
    )
}
export default TextIput;