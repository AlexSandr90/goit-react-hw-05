import { useNavigate, useLocation } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import classes from './GoBack.module.css';

const GoBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
      console.log('second', '/movies');
    }
  };

  return (
    <button className={classes.goBack} onClick={handleGoBack}>
      <GoArrowLeft />
      Go Back
    </button>
  );
};

export default GoBack;
