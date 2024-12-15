import { OutletSubscriber } from '../hooks/error-publishing';
import styles from './outlet.module.css'; // Import CSS Module

export function ErrorOutlet() {
  const outletSubscriber = OutletSubscriber.getInstance();
  const { errors } = outletSubscriber.useOutlet();

  if (!errors || Object.keys(errors).length === 0) {
    return <div></div>;
  }

  return (
    <div className={styles.errorAlert}>
      <span className={styles.icon}>!</span>
      <div>
        <h4 className={styles.title}>Form submission failed</h4>
        {Object.keys(errors).map(function (key) {
          return (
            <div key={key}>
              <span>Error in field: </span>
              <span style={{ fontWeight: 500 }}>{key}</span> - <span>{errors[key]?.join(' ')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
