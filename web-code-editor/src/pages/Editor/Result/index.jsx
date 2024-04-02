import { Container, Text } from "./style";

export function Result(value) {
	return (
		<Container>
			<Text readOnly placeholder="result" value={value.value}>
			</Text>
		</Container>
	);
}

export default Result;