import Editor from '@monaco-editor/react';
import { Container, MainTitle, SelectContainer, Select, Button, TextBoxContainer } from './style';
import { useRef, useState, useCallback } from 'react';
import { Result } from './Result/index';
import { Input } from './Input/index';
import { postCppCompile, postJavaCompile, postPythonCompile } from '../../api/editor';
import { toast } from 'react-toastify';

export function EditorWrapper() {

	/**
	 * 에디터 핸들러
	 */
	const editorRef = useRef(null);
	function handleEditorDidMount(editor, monaco) {
		editorRef.current = editor;
	};

	/**
	 * 언어 설정
	 */
	const [language, setLanguage] = useState("c");
	const languages = ["c", "cpp", "java", "kotlin", "python", "javascript"];
	const onLanguageChange = (event) => {
		if (event.target.value === "c" || event.target.value === "cpp" || event.target.value === "java" || event.target.value === "python") {
			setSubmitPossible(false);
		} else {
			setSubmitPossible(true);
		}
		setLanguage(event.target.value);
	};

	/*
	 * 에디터 모드 설정
	 */
	const [thema, setThema] = useState("vs");
	const themas = ["vs", "vs-dark"]
	const onThemaChange = (event) => {
		setThema(event.target.value);
	};

	/**
	 * Input
	 */
	const [input, setInput] = useState("");
	const onInputChange = (value) => {
		setInput(value);
	};

	/**
	 * API
	 */
	const [result, setResult] = useState("");
	const [compiling, setCompiling] = useState(false);
	const compileCode = useCallback(() => {
		const newCode = {
			code: btoa(editorRef.current.getValue()),
			input: btoa(input)
		};
		if (language !== "c" && language !== "cpp" && language !== "java" && language !== "python") {
			toast.error('코드를 실행하는데 실패하였습니다.');
		} else {
			setCompiling(true);
			if (language === "c" || language === "cpp") {
				postCppCompile(newCode)
				.then((res) => {
					setResult(res.data.stdout ? res.data.stdout : res.data.stderr);
					res.data.stdout ? toast.success('코드를 성공적으로 실행했습니다.') : toast.error('코드를 실행하는데 실패하였습니다.');
				})
				.catch((e) => {
					setResult("");
					toast.error('코드를 실행하는데 실패하였습니다.');
				})
				.finally(() => {
					setCompiling(false);
				});
			} else if (language === "java") {
				postJavaCompile(newCode)
				.then((res) => {
					setResult(res.data.stdout ? res.data.stdout : res.data.stderr);
					res.data.stdout ? toast.success('코드를 성공적으로 실행했습니다.') : toast.error('코드를 실행하는데 실패하였습니다.');
				})
				.catch((e) => {
					setResult("");
					toast.error('코드를 실행하는데 실패하였습니다.');
				})
				.finally(() => {
					setCompiling(false);
				});
			} else if (language === "python") {
				postPythonCompile(newCode)
				.then((res) => {
					setResult(res.data.stdout ? res.data.stdout : res.data.stderr);
					res.data.stdout ? toast.success('코드를 성공적으로 실행했습니다.') : toast.error('코드를 실행하는데 실패하였습니다.');
				})
				.catch((e) => {
					setResult("");
					toast.error('코드를 실행하는데 실패하였습니다.');
				})
				.finally(() => {
					setCompiling(false);
				});
			} else {
				setCompiling(false);
			}
		}
	}, [
		input,
		language
	]);

	/**
	 * 코드 제출
	 */
	const [submitPossible, setSubmitPossible] = useState(false);
	const onCodeSubmit = () => {
		compileCode();
	}

	return (
		<Container>
			<MainTitle>Randps Editor</MainTitle>
			<SelectContainer>
				<Select onChange={onLanguageChange}>
					{languages.map((lang, index) => {
						return <option key={index}>{lang}</option>;
					})}
				</Select>
				<Select onChange={onThemaChange}>
					{themas.map((tem, index) => {
						return <option key={index}>{tem}</option>;
					})}
				</Select>
			</SelectContainer>
			<Editor 
				height="45vh"
				width="90vh"
				defaultLanguage={language}
				language={language}
				defaultValue="// write your code here"
				theme={thema}
				onMount={handleEditorDidMount}
			/>
			<Button 
				onClick={onCodeSubmit}
				hidden={submitPossible}
				disabled={compiling}
				>Submit</Button>
			<TextBoxContainer>
				<Input value={input} onChange={onInputChange}></Input>
				<Result value={result}></Result>
			</TextBoxContainer>
		</Container>
	);
}

export default EditorWrapper;
