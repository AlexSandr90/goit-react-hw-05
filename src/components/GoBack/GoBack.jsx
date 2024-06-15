import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import classes from './GoBack.module.css';

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };
  return (
    <button className={classes.goBack} onClick={handleGoBack}>
      <GoArrowLeft />
      Go Back
    </button>
  );
};

export default GoBack;
