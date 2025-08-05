const Button = ({ type, name, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
