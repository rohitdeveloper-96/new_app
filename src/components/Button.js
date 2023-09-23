import '../assets/css/Login.css';
const Button = (props) => {
    return (
        <div>
            <button
                className='buttonStyles'
                onClick={props.onSubmitHandler}>{props.buttonText}
            </button>
        </div>
    )
}
export default Button;