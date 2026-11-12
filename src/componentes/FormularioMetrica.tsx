import { useState, type FormEvent } from 'react';
import type { Indicator } from '../types/index';

interface FormularioMetricaProps {
  onAgregarMetrica: (nuevaMetrica: Indicator) => void;
}

export const FormularioMetrica = ({ onAgregarMetrica }: FormularioMetricaProps) => {
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [estado, setEstado] = useState('normal');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !valor.trim()) return;

    onAgregarMetrica({
      id: Date.now(),
      titulo: titulo.trim(),
      valor: valor.trim(),
      estado,
      metric: titulo.trim(),
      value: valor.trim(),
      status: estado,
    });

    setTitulo('');
    setValor('');
    setEstado('normal');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '1.2rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'flex-end',
        color: '#f8fafc',
      }}
    >
      <div style={{ flex: '1 1 200px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            color: '#94a3b8',
            marginBottom: '0.4rem',
          }}
        >
          Indicador / Métrica
        </label>
        <input
          type="text"
          placeholder="Ej: Stock Leche Entera"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.55rem 0.8rem',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#f8fafc',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ flex: '1 1 140px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            color: '#94a3b8',
            marginBottom: '0.4rem',
          }}
        >
          Valor
        </label>
        <input
          type="text"
          placeholder="Ej: 4 litros restantes"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.55rem 0.8rem',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#f8fafc',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ flex: '1 1 140px' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            color: '#94a3b8',
            marginBottom: '0.4rem',
          }}
        >
          Estado
        </label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={{
            width: '100%',
            padding: '0.55rem 0.8rem',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#f8fafc',
            boxSizing: 'border-box',
          }}
        >
          <option value="óptimo">Óptimo</option>
          <option value="normal">Normal</option>
          <option value="alerta">Alerta</option>
          <option value="crítico">Crítico</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          background: '#2563eb',
          color: '#ffffff',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        + Agregar Indicador
      </button>
    </form>
  );
};
