import { FloatingLabel, Form } from 'react-bootstrap';
import Select from 'react-select';

const SelectInput = (props) => {
	let { label, value, options, onChange } = props;

	if (Array.isArray(value)) {
		value = value.map((v) => {
			let option = options && options.find((o) => o.value === v);
			return { value: v, label: option ? option.label : '' };
		});
	} else {
		let option = options && options.find((o) => o.value === value);
		value = { value: value, label: option ? option.label : '' };
	}

	const handleChange = (e) => {
		if (Array.isArray(e)) {
			onChange && onChange(e.map((v) => v.value));
		} else {
			onChange && onChange(e.value);
		}
	};

	return (
		<>
			<div className={label ? 'labeled-form-control p-0' : ''}>
				{label && <label style={{ transform: 'scale(.85) translateY(-.15rem) translateX(.3rem)', color: 'rgba(var(--bs-body-color-rgb),.65)' }}>{label}</label>}
				<Select
					{...props}
					value={value}
					options={options}
					styles={
						label
							? {
									control: (provided) => ({
										...provided,
										borderWidth: '0px',
										boxShadow: 'none'
									}),
									menu: (provided) => ({
										...provided,
										zIndex: 4
									})
							  }
							: { control: (provided) => ({ ...provided, borderColor: 'black' }) }
					}
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</>
	);
};

export default SelectInput;
