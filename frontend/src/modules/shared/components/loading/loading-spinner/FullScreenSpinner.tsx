import './FullScreenSpinner.scss';
import {ReactElement} from 'react';
import {Spinner} from 'react-bootstrap';
import {useLoading} from '../LoadingUtils.tsx';

export default function FullScreenSpinner(): ReactElement {
  const loadingContext = useLoading();
  const loading = loadingContext?.loading;

  if (!loading) return <>{null}</>;
  return (
    <div className="fullscreen-spinner">
      <Spinner animation="border" role="status" className="spinner">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
}
