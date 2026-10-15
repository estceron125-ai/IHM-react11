// src/componentes/TarjetaItem.tsx 
import type { MetricaProyecto } from '../types/index';
import styles from './tarjetaItem.module.css';
// El componente recibe las props tipadas mediante la interfaz MetricaProyecto 
export const TarjetaItem = ({ titulo, valor, estado }: MetricaProyecto) => {
    return (
        <div className={styles.cardContainer}>
            <span className={styles.cardTitle}>{titulo}</span>
            <h3 className={styles.cardValue}>{valor}</h3>
            <span className={styles.cardBadge}>{estado}</span>
        </div>
    );
};