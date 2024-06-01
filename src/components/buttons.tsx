import './buttons.css';

type ButtonProps = {
  id: string;
  children: string | React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Button = ({ id, children, onClick }: ButtonProps) => {
    return (
        <button type='button' id={id} onClick={onClick}>{children}</button>
    )
}

export default Button;