import styles from './CenterStage.module.css';

export interface CenterStageProps {
  children: React.ReactNode
}

export default function CenterStage({children}: CenterStageProps) {
  return <div className={`${styles.fullscreen}`}>
    <div className={`${styles.center}`}>
      {children}
    </div>
  </div>
}