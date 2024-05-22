import styles from './AppHeader.module.scss';
import {ReactElement} from 'react';

export default function AppHeader(): ReactElement {
  return (
    <div>
      <div className={styles.appHeader}>App Header works!</div>
    </div>
  );
}
