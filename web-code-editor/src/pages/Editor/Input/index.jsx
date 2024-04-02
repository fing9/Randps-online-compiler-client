import { Container, Text } from "./style";

export function Input({ value, onChange }) {
	const handleInputChange = (e) => {
		onChange(e.target.value);
	  };

	return (
		<Container>
			<Text placeholder="write your input" value={value} onChange={handleInputChange}>

			</Text>
		</Container>
	);
}

export default Input;