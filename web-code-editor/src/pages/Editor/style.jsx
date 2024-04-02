import styled from '@emotion/styled';

export const Container = styled.div`
	padding: 3rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 1.5rem;
`;

export const MainTitle = styled.div`
  font-weight: 700;
  font-size: 2rem;
`;

export const SelectContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3rem;
`;

export const TextBoxContainer = styled.div`
display: flex;
flex-direction: row;
gap: 3rem;
`;

export const Select = styled.select`
	position: relative;
	display: block;
	width: 100%;
	margin: 0 auto;
	font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
	font-size: 18px;
	color: #60666d;
	
	@media (min-width: 768px) {
	  width: 70%;
	}
	
	@media (min-width: 992px) {
	  width: 50%;
	}
	
	@media (min-width: 1200px) {
	  width: 30%;
	}
	
	&__current {
	  position: relative;
	  box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
	  cursor: pointer;
	  outline: none;
	  
	  &:focus {
		& + .select-box__list {
		  opacity: 1;
  
		  // We have to set "animation-name: none;" to make the list visible (read below how it works)
  
		  animation-name: none;
		  
		  .select-box__option {
			cursor: pointer;
		  }
		}
		
		.select-box__icon {
		  transform: translateY(-50%) rotate(180deg);
		}
	  }
	}
	
	&__icon {
	  position: absolute;
	  top: 50%;
	  right: 15px;
	  transform: translateY(-50%);
	  width: 20px;
	  opacity: 0.3;
	  transition: 0.2s ease;
	}
	
	&__value {
	  display: flex;
	}
	
	&__input {
	  display: none;
	  
	  &:checked + .select-box__input-text {
		display: block;
	  }
	}
	
	&__input-text {
	  display: none;
	  width: 100%;
	  margin: 0;
	  padding: 15px;
	  background-color: #fff;
	}
	
	&__list {
	  position: absolute;
	  width: 100%;
	  padding: 0;
	  list-style: none;
	  opacity: 0;
	  
	  // We need to use animation with delay.
	  // Otherwise the click event will not have time to run on label, because this element disapears immediately when .select-box__current element loses the focus.
	  // This delay will not be noticed because we set "opacity" to "0".
	  // We also use "animation-fill-mode: forwards" to make the list stay hidden.
	  
	  animation-name: HideList;
	  animation-duration: 0.5s;
	  animation-delay: 0.5s;
	  animation-fill-mode: forwards;
	  animation-timing-function: step-start;
	  box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
	}
	
	&__option {
	  display: block;
	  padding: 15px;
	  background-color: #fff;
	  
	  &:hover,
	  &:focus {
		color: #546c84;
		background-color: #fbfbfb;
	  }
	}
  }
  
  @keyframes HideList {
	from {
	  transform: scaleY(1);
	}
	to {
	  transform: scaleY(0);
	}
`;

export const Button = styled.button`
	background-color: black;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	outline: 0;
	border: 0; 
	text-transform: uppercase;
	cursor: pointer;
	box-shadow: 0px 2px 2px lightgray;
	transition: ease background-color 250ms;
	&:hover {
		background-color: tomato;
	}
	&:disabled {
		cursor: default;
		opacity: 0.7;
	}
`;
