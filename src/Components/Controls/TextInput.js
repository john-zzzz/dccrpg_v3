import { FloatingLabel, Form } from 'react-bootstrap';

const TextInput = (props) => {
	let { label } = props;

	return (
		<>
			<FloatingLabel label={label}>
				<Form.Control className='labeled-form-control' {...props}></Form.Control>
			</FloatingLabel>
		</>
	);
};

export default TextInput;
