import ModelTextIput from "../components/ModelTextInput";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
const EditDialog = ({ onClose, name, email, age, skills, onChangeHandler, Validation, validateEmailId, onSubmitHandler, openModel }) => {
    return (
        <>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openModel}
                onClose={onClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        minWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <h3>
                        Update User
                    </h3>
                    <hr />
                    <h3 className="modalTextStyles">UserName <span>*</span></h3>
                    <ModelTextIput
                        text="text"
                        id="name"
                        Value={name}
                        onChangeHandler={onChangeHandler}
                    />
                    <h3 className="modalTextStyles">Email <span>*</span></h3>
                    <ModelTextIput
                        text="text"
                        id="email"
                        Value={email}
                        onChangeHandler={onChangeHandler}
                    />
                    <h3 className="modalTextStyles">Age <span>*</span></h3>
                    <ModelTextIput
                        text="number"
                        id="age"
                        Value={age}
                        onChangeHandler={onChangeHandler}
                    />
                    <h3 className="modalTextStyles">PrimarySkills <span>*</span></h3>
                    <ModelTextIput
                        text="text"
                        id="skills"
                        Value={skills}
                        onChangeHandler={onChangeHandler}
                    />
                    {Validation && <p className='validationTextStyles'>Please Enter the Mandatory Fields and Valid Email-id </p>}
                    <button className="modelbuttonStyles" onClick={onSubmitHandler}>Update</button>
                </Sheet>
            </Modal>
        </>
    )
}
export default EditDialog;