import './containers.css';
import '../App.css';

type ContainerProps = {
  children: React.ReactNode | string;
  id: string;
  className: string;
};




const Container = ({ children, className, id }: ContainerProps) => {
    return (
        <div className={className} id={id}>{children}</div>
    )
}

export default Container;

